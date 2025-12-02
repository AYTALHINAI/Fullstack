import { Container, Row, Col, Button, Card, CardBody, CardImg, CardTitle, CardText } from "reactstrap";
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { removeFromCart, incrementQuantity, decrementQuantity, clearCart } from "../features/CartSlice";
import { useEffect } from "react";

const Cart = () => {
    const email = useSelector((state) => state.users.user?.email);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const cartItems = useSelector((state) => state.cart.items);
    const totalItems = useSelector((state) => state.cart.totalItems);
    const totalPrice = useSelector((state) => state.cart.totalPrice);

    useEffect(() => {
        if (!email) navigate("/");
    }, [email, navigate]);

    const handleRemove = (id) => {
        dispatch(removeFromCart(id));
    };

    const handleIncrement = (id) => {
        dispatch(incrementQuantity(id));
    };

    const handleDecrement = (id) => {
        dispatch(decrementQuantity(id));
    };

    const handleClearCart = () => {
        dispatch(clearCart());
    };

    return (
        <Container fluid style={{ paddingTop: "6rem", paddingBottom: "4rem", position: "relative", zIndex: 2, minHeight: "80vh" }}>

            {/* HERO SECTION */}
            <Row className="justify-content-center text-center mb-5">
                <Col md="10">
                    <h1 style={{ color: "white", fontSize: "48px", fontWeight: "bold", textShadow: "0 2px 6px rgba(0,0,0,0.7)" }}>
                        Your Shopping Cart
                    </h1>
                    <p style={{ color: "#ddd", fontSize: "18px", marginTop: "1rem" }}>
                        Review your items and proceed to checkout
                    </p>
                </Col>
            </Row>

            {/* CART CONTENTS */}
            {cartItems.length === 0 ? (
                // EMPTY CART STATE
                <Row className="justify-content-center text-center">
                    <Col md="6">
                        <div
                            style={{
                                backgroundColor: "rgba(255,255,255,0.1)",
                                padding: "3rem",
                                borderRadius: "15px",
                                backdropFilter: "blur(6px)",
                                border: "1px solid rgba(255,255,255,0.2)",
                                color: "white"
                            }}
                        >
                            <h3 style={{ marginBottom: "1.5rem" }}>Your cart is empty</h3>
                            <p style={{ color: "#ddd", marginBottom: "2rem" }}>
                                Start adding some delicious cakes to your cart!
                            </p>
                            <Button
                                color="light"
                                style={{ borderRadius: "25px", fontWeight: 600, padding: "0.75rem 2rem" }}
                                onClick={() => navigate("/home")}
                            >
                                Continue Shopping
                            </Button>
                        </div>
                    </Col>
                </Row>
            ) : (
                // CART ITEMS
                <Row className="justify-content-center">
                    <Col lg="8" md="10">
                        {/* Cart Items List */}
                        {cartItems.map((item, index) => (
                            <Card
                                key={index}
                                style={{
                                    backgroundColor: "rgba(255,255,255,0.1)",
                                    border: "1px solid rgba(255,255,255,0.2)",
                                    backdropFilter: "blur(6px)",
                                    color: "white",
                                    borderRadius: "15px",
                                    marginBottom: "1.5rem",
                                    overflow: "hidden"
                                }}
                            >
                                <CardBody>
                                    <Row className="align-items-center">
                                        <Col md="3" sm="12" className="mb-3 mb-md-0">
                                            <CardImg
                                                src={item.img}
                                                alt={item.name}
                                                style={{
                                                    borderRadius: "10px",
                                                    width: "100%",
                                                    height: "150px",
                                                    objectFit: "cover"
                                                }}
                                            />
                                        </Col>

                                        <Col md="4" sm="12" className="mb-3 mb-md-0">
                                            <CardTitle tag="h5" style={{ marginBottom: "0.5rem" }}>
                                                {item.name}
                                            </CardTitle>
                                            <CardText style={{ color: "#ddd", fontSize: "0.9rem" }}>
                                                Category: {item.category}
                                            </CardText>
                                            <CardText style={{ fontWeight: "bold", fontSize: "1.1rem" }}>
                                                {item.price} OMR
                                            </CardText>
                                        </Col>

                                        <Col md="3" sm="12" className="mb-3 mb-md-0">
                                            <div className="d-flex align-items-center justify-content-center gap-3">
                                                <Button
                                                    color="light"
                                                    size="sm"
                                                    style={{
                                                        borderRadius: "50%",
                                                        width: "35px",
                                                        height: "35px",
                                                        padding: "0",
                                                        fontWeight: "bold"
                                                    }}
                                                    onClick={() => handleDecrement(item.id)}
                                                    disabled={item.quantity === 1}
                                                >
                                                    -
                                                </Button>
                                                <span style={{ fontSize: "1.2rem", fontWeight: "bold", minWidth: "30px", textAlign: "center" }}>
                                                    {item.quantity}
                                                </span>
                                                <Button
                                                    color="light"
                                                    size="sm"
                                                    style={{
                                                        borderRadius: "50%",
                                                        width: "35px",
                                                        height: "35px",
                                                        padding: "0",
                                                        fontWeight: "bold"
                                                    }}
                                                    onClick={() => handleIncrement(item.id)}
                                                >
                                                    +
                                                </Button>
                                            </div>
                                        </Col>

                                        <Col md="2" sm="12" className="text-center">
                                            <Button
                                                color="danger"
                                                size="sm"
                                                style={{ borderRadius: "20px", fontWeight: 600 }}
                                                onClick={() => handleRemove(item.id)}
                                            >
                                                Remove
                                            </Button>
                                        </Col>
                                    </Row>
                                </CardBody>
                            </Card>
                        ))}

                        {/* Cart Summary */}
                        <div
                            style={{
                                backgroundColor: "rgba(255,255,255,0.1)",
                                padding: "2rem",
                                borderRadius: "15px",
                                backdropFilter: "blur(6px)",
                                border: "1px solid rgba(255,255,255,0.2)",
                                color: "white",
                                marginTop: "2rem"
                            }}
                        >
                            <Row className="mb-3">
                                <Col xs="6">
                                    <h5>Total Items:</h5>
                                </Col>
                                <Col xs="6" className="text-end">
                                    <h5>{totalItems}</h5>
                                </Col>
                            </Row>

                            <Row className="mb-3">
                                <Col xs="6">
                                    <h5>Subtotal:</h5>
                                </Col>
                                <Col xs="6" className="text-end">
                                    <h5>{totalPrice.toFixed(2)} OMR</h5>
                                </Col>
                            </Row>

                            <hr style={{ borderColor: "rgba(255,255,255,0.3)" }} />

                            <Row className="mb-4">
                                <Col xs="6">
                                    <h4 style={{ fontWeight: "bold" }}>Total:</h4>
                                </Col>
                                <Col xs="6" className="text-end">
                                    <h4 style={{ fontWeight: "bold", color: "#ffeb3b" }}>
                                        {totalPrice.toFixed(2)} OMR
                                    </h4>
                                </Col>
                            </Row>

                            <Row>
                                <Col xs="12" className="mb-3">
                                    <Button
                                        color="success"
                                        style={{ borderRadius: "25px", fontWeight: 600, width: "100%", padding: "0.75rem" }}
                                        onClick={() => navigate("/payment")}
                                    >
                                        Proceed to Checkout →
                                    </Button>
                                </Col>
                                <Col xs="12" md="6" className="mb-2 mb-md-0">
                                    <Button
                                        color="secondary"
                                        style={{ borderRadius: "25px", fontWeight: 600, width: "100%" }}
                                        onClick={handleClearCart}
                                    >
                                        Clear Cart
                                    </Button>
                                </Col>
                                <Col xs="12" md="6">
                                    <Button
                                        color="light"
                                        style={{ borderRadius: "25px", fontWeight: 600, width: "100%" }}
                                        onClick={() => navigate("/home")}
                                    >
                                        Continue Shopping
                                    </Button>
                                </Col>
                            </Row>
                        </div>
                    </Col>
                </Row>
            )}
        </Container>
    );
};

export default Cart;
