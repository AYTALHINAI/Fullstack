import { useState, useEffect } from "react";
import { Container, Row, Col, Button, Form, FormGroup, Label, Input, Card, CardBody } from "reactstrap";
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { clearCart } from "../features/CartSlice";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Payment = () => {
    const email = useSelector((state) => state.users.user?.email);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const cartItems = useSelector((state) => state.cart.items);
    const totalPrice = useSelector((state) => state.cart.totalPrice);

    const [formData, setFormData] = useState({
        fullName: "",
        email: email || "",
        phone: "",
        address: "",
        city: "",
        cardNumber: "",
        cardName: "",
        expiryDate: "",
        cvv: "",
        paymentMethod: "card"
    });

    useEffect(() => {
        if (!email) navigate("/");
        if (cartItems.length === 0) navigate("/cart");
    }, [email, cartItems, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Basic validation
        if (!formData.fullName || !formData.phone || !formData.address || !formData.city) {
            toast.error('Please fill in all delivery details!', {
                position: "top-right",
                autoClose: 3000,
            });
            return;
        }

        if (formData.paymentMethod === "card") {
            if (!formData.cardNumber || !formData.cardName || !formData.expiryDate || !formData.cvv) {
                toast.error('Please fill in all card details!', {
                    position: "top-right",
                    autoClose: 3000,
                });
                return;
            }
        }

        // Simulate payment processing
        toast.success('🎉 Payment successful! Your order has been placed!', {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
        });

        // Clear cart and redirect after success
        setTimeout(() => {
            dispatch(clearCart());
            navigate("/home");
        }, 3000);
    };

    return (
        <Container fluid style={{ paddingTop: "6rem", paddingBottom: "4rem", position: "relative", zIndex: 2, minHeight: "80vh" }}>
            <ToastContainer />

            {/* HERO SECTION */}
            <Row className="justify-content-center text-center mb-5">
                <Col md="10">
                    <h1 style={{ color: "white", fontSize: "48px", fontWeight: "bold", textShadow: "0 2px 6px rgba(0,0,0,0.7)" }}>
                        Checkout
                    </h1>
                    <p style={{ color: "#ddd", fontSize: "18px", marginTop: "1rem" }}>
                        Complete your order and enjoy our delicious cakes!
                    </p>
                </Col>
            </Row>

            <Row className="justify-content-center">
                <Col lg="8" md="10">
                    <Form onSubmit={handleSubmit}>
                        {/* CUSTOMER DETAILS */}
                        <Card style={{
                            backgroundColor: "rgba(255,255,255,0.1)",
                            border: "1px solid rgba(255,255,255,0.2)",
                            backdropFilter: "blur(6px)",
                            color: "white",
                            borderRadius: "15px",
                            marginBottom: "2rem"
                        }}>
                            <CardBody>
                                <h4 style={{ marginBottom: "1.5rem", color: "white" }}>Customer Details</h4>
                                <Row>
                                    <Col md="6">
                                        <FormGroup>
                                            <Label for="fullName" style={{ color: "#ddd" }}>Full Name *</Label>
                                            <Input
                                                type="text"
                                                name="fullName"
                                                id="fullName"
                                                placeholder="Enter your full name"
                                                value={formData.fullName}
                                                onChange={handleChange}
                                                required
                                                style={{
                                                    backgroundColor: "rgba(255,255,255,0.15)",
                                                    border: "1px solid rgba(255,255,255,0.3)",
                                                    color: "white",
                                                    borderRadius: "10px"
                                                }}
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col md="6">
                                        <FormGroup>
                                            <Label for="email" style={{ color: "#ddd" }}>Email Address *</Label>
                                            <Input
                                                type="email"
                                                name="email"
                                                id="email"
                                                placeholder="Enter your email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                required
                                                style={{
                                                    backgroundColor: "rgba(255,255,255,0.15)",
                                                    border: "1px solid rgba(255,255,255,0.3)",
                                                    color: "white",
                                                    borderRadius: "10px"
                                                }}
                                            />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md="6">
                                        <FormGroup>
                                            <Label for="phone" style={{ color: "#ddd" }}>Phone Number *</Label>
                                            <Input
                                                type="tel"
                                                name="phone"
                                                id="phone"
                                                placeholder="+968 XXXX XXXX"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                required
                                                style={{
                                                    backgroundColor: "rgba(255,255,255,0.15)",
                                                    border: "1px solid rgba(255,255,255,0.3)",
                                                    color: "white",
                                                    borderRadius: "10px"
                                                }}
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col md="6">
                                        <FormGroup>
                                            <Label for="city" style={{ color: "#ddd" }}>City *</Label>
                                            <Input
                                                type="text"
                                                name="city"
                                                id="city"
                                                placeholder="Enter your city"
                                                value={formData.city}
                                                onChange={handleChange}
                                                required
                                                style={{
                                                    backgroundColor: "rgba(255,255,255,0.15)",
                                                    border: "1px solid rgba(255,255,255,0.3)",
                                                    color: "white",
                                                    borderRadius: "10px"
                                                }}
                                            />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md="12">
                                        <FormGroup>
                                            <Label for="address" style={{ color: "#ddd" }}>Delivery Address *</Label>
                                            <Input
                                                type="textarea"
                                                name="address"
                                                id="address"
                                                placeholder="Enter your complete delivery address"
                                                value={formData.address}
                                                onChange={handleChange}
                                                required
                                                rows="3"
                                                style={{
                                                    backgroundColor: "rgba(255,255,255,0.15)",
                                                    border: "1px solid rgba(255,255,255,0.3)",
                                                    color: "white",
                                                    borderRadius: "10px"
                                                }}
                                            />
                                        </FormGroup>
                                    </Col>
                                </Row>
                            </CardBody>
                        </Card>

                        {/* PAYMENT METHOD */}
                        <Card style={{
                            backgroundColor: "rgba(255,255,255,0.1)",
                            border: "1px solid rgba(255,255,255,0.2)",
                            backdropFilter: "blur(6px)",
                            color: "white",
                            borderRadius: "15px",
                            marginBottom: "2rem"
                        }}>
                            <CardBody>
                                <h4 style={{ marginBottom: "1.5rem", color: "white" }}>Payment Method</h4>
                                <FormGroup>
                                    <div className="d-flex gap-4 mb-3">
                                        <div className="form-check">
                                            <Input
                                                type="radio"
                                                name="paymentMethod"
                                                id="card"
                                                value="card"
                                                checked={formData.paymentMethod === "card"}
                                                onChange={handleChange}
                                                className="form-check-input"
                                            />
                                            <Label className="form-check-label" for="card" style={{ color: "#ddd", marginLeft: "0.5rem" }}>
                                                💳 Credit/Debit Card
                                            </Label>
                                        </div>
                                        <div className="form-check">
                                            <Input
                                                type="radio"
                                                name="paymentMethod"
                                                id="cash"
                                                value="cash"
                                                checked={formData.paymentMethod === "cash"}
                                                onChange={handleChange}
                                                className="form-check-input"
                                            />
                                            <Label className="form-check-label" for="cash" style={{ color: "#ddd", marginLeft: "0.5rem" }}>
                                                💵 Cash on Delivery
                                            </Label>
                                        </div>
                                    </div>
                                </FormGroup>

                                {formData.paymentMethod === "card" && (
                                    <>
                                        <Row>
                                            <Col md="12">
                                                <FormGroup>
                                                    <Label for="cardNumber" style={{ color: "#ddd" }}>Card Number *</Label>
                                                    <Input
                                                        type="text"
                                                        name="cardNumber"
                                                        id="cardNumber"
                                                        placeholder="1234 5678 9012 3456"
                                                        value={formData.cardNumber}
                                                        onChange={handleChange}
                                                        maxLength="19"
                                                        style={{
                                                            backgroundColor: "rgba(255,255,255,0.15)",
                                                            border: "1px solid rgba(255,255,255,0.3)",
                                                            color: "white",
                                                            borderRadius: "10px"
                                                        }}
                                                    />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col md="12">
                                                <FormGroup>
                                                    <Label for="cardName" style={{ color: "#ddd" }}>Cardholder Name *</Label>
                                                    <Input
                                                        type="text"
                                                        name="cardName"
                                                        id="cardName"
                                                        placeholder="Name on card"
                                                        value={formData.cardName}
                                                        onChange={handleChange}
                                                        style={{
                                                            backgroundColor: "rgba(255,255,255,0.15)",
                                                            border: "1px solid rgba(255,255,255,0.3)",
                                                            color: "white",
                                                            borderRadius: "10px"
                                                        }}
                                                    />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col md="6">
                                                <FormGroup>
                                                    <Label for="expiryDate" style={{ color: "#ddd" }}>Expiry Date *</Label>
                                                    <Input
                                                        type="text"
                                                        name="expiryDate"
                                                        id="expiryDate"
                                                        placeholder="MM/YY"
                                                        value={formData.expiryDate}
                                                        onChange={handleChange}
                                                        maxLength="5"
                                                        style={{
                                                            backgroundColor: "rgba(255,255,255,0.15)",
                                                            border: "1px solid rgba(255,255,255,0.3)",
                                                            color: "white",
                                                            borderRadius: "10px"
                                                        }}
                                                    />
                                                </FormGroup>
                                            </Col>
                                            <Col md="6">
                                                <FormGroup>
                                                    <Label for="cvv" style={{ color: "#ddd" }}>CVV *</Label>
                                                    <Input
                                                        type="password"
                                                        name="cvv"
                                                        id="cvv"
                                                        placeholder="123"
                                                        value={formData.cvv}
                                                        onChange={handleChange}
                                                        maxLength="4"
                                                        style={{
                                                            backgroundColor: "rgba(255,255,255,0.15)",
                                                            border: "1px solid rgba(255,255,255,0.3)",
                                                            color: "white",
                                                            borderRadius: "10px"
                                                        }}
                                                    />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                    </>
                                )}
                            </CardBody>
                        </Card>

                        {/* ORDER SUMMARY */}
                        <Card style={{
                            backgroundColor: "rgba(255,255,255,0.1)",
                            border: "1px solid rgba(255,255,255,0.2)",
                            backdropFilter: "blur(6px)",
                            color: "white",
                            borderRadius: "15px",
                            marginBottom: "2rem"
                        }}>
                            <CardBody>
                                <h4 style={{ marginBottom: "1.5rem", color: "white" }}>Order Summary</h4>
                                {cartItems.map((item, index) => (
                                    <Row key={index} className="mb-2" style={{ borderBottom: "1px solid rgba(255,255,255,0.1)", paddingBottom: "0.5rem" }}>
                                        <Col xs="8">
                                            <p style={{ margin: 0, color: "#ddd" }}>{item.name} x {item.quantity}</p>
                                        </Col>
                                        <Col xs="4" className="text-end">
                                            <p style={{ margin: 0, fontWeight: "bold" }}>{(item.price * item.quantity).toFixed(2)} OMR</p>
                                        </Col>
                                    </Row>
                                ))}
                                <Row className="mt-3">
                                    <Col xs="6">
                                        <h5 style={{ fontWeight: "bold" }}>Total Amount:</h5>
                                    </Col>
                                    <Col xs="6" className="text-end">
                                        <h5 style={{ fontWeight: "bold", color: "#ffeb3b" }}>{totalPrice.toFixed(2)} OMR</h5>
                                    </Col>
                                </Row>
                            </CardBody>
                        </Card>

                        {/* SUBMIT BUTTONS */}
                        <Row>
                            <Col xs="12" md="6" className="mb-2 mb-md-0">
                                <Button
                                    color="secondary"
                                    style={{ borderRadius: "25px", fontWeight: 600, width: "100%", padding: "0.75rem" }}
                                    onClick={() => navigate("/cart")}
                                    type="button"
                                >
                                    ← Back to Cart
                                </Button>
                            </Col>
                            <Col xs="12" md="6">
                                <Button
                                    color="success"
                                    style={{ borderRadius: "25px", fontWeight: 600, width: "100%", padding: "0.75rem" }}
                                    type="submit"
                                >
                                    Place Order - {totalPrice.toFixed(2)} OMR
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default Payment;
