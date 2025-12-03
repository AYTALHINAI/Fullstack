import { useState, useEffect } from "react";
import { Container, Row, Col, Button, Card, CardBody, CardImg, CardTitle, CardText } from "reactstrap";
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { fetchProducts } from "../features/ProductSlice";
import { addToCart } from "../features/CartSlice";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Home = () => {
  const email = useSelector((state) => state.users.user?.email);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { items: products, isLoading, isError, message } = useSelector((state) => state.products);
  const [selectedCategory, setSelectedCategory] = useState(null);

  console.log("Home Render:", { products, selectedCategory, isLoading, isError, message });

  useEffect(() => {
    if (email) {
      dispatch(fetchProducts()); // fetch products on load
    }
  }, [email, dispatch]);

  // Redirect if not logged in
  useEffect(() => {
    if (!email) {
      navigate("/");
    }
  }, [email, navigate]);

  const toggleCategory = (cat) => {
    if (selectedCategory === cat) setSelectedCategory(null);
    else setSelectedCategory(cat);
  };

  const handleAddToCart = (item) => {
    dispatch(addToCart({ email, item }));
    toast.success('Added to Cart!', {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  if (!email) return null; // Don't render anything if not logged in
  if (isLoading) return <div style={{ color: "white", textAlign: "center", marginTop: "5rem" }}>Loading products...</div>;
  if (isError) return <div style={{ color: "red", textAlign: "center", marginTop: "5rem" }}>Error: {message}</div>;

  return (
    <Container fluid style={{ paddingTop: "6rem", paddingBottom: "4rem", position: "relative", zIndex: 2 }}>
      <ToastContainer />
      <Row className="justify-content-center text-center mb-5">
        <Col md="10">
          <h1 style={{ color: "white", fontSize: "48px", fontWeight: "bold", textShadow: "0 2px 6px rgba(0,0,0,0.7)" }}>
            Welcome to Freshly Baked Delights
          </h1>
          <p style={{ color: "#ddd", fontSize: "18px", marginTop: "1rem", lineHeight: "1.6", marginBottom: "5rem" }}>
            From birthday celebrations to weddings, every cake is handcrafted with love and the finest ingredients.
            Experience flavors that delight the senses and designs that wow the eyes.
          </p>
        </Col>
      </Row>

      {/* CATEGORIES */}
      <Row className="text-center mb-5" style={{ maxWidth: "90rem", margin: "0 auto" }}>
        <h2 style={{ color: "white", marginBottom: "2rem" }}>Our Categories</h2>
        {["Birthday Cakes", "Wedding Cakes", "Cupcakes", "Desserts"].map((cat, i) => (
          <Col md="3" sm="6" xs="12" className="mb-4" key={i}>
            <div
              style={{
                backgroundColor: "rgba(255,255,255,0.1)",
                padding: "2rem",
                borderRadius: "15px",
                backdropFilter: "blur(6px)",
                color: "white",
                border: selectedCategory === cat ? "2px solid #fff" : "1px solid rgba(255,255,255,0.2)",
                transition: "0.3s",
                cursor: "pointer",
                marginBottom: "2rem"
              }}
              onClick={() => toggleCategory(cat)}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
              <h4>{cat}</h4>
            </div>
          </Col>
        ))}
      </Row>

      {/* PRODUCT CARDS */}
      {selectedCategory && products[selectedCategory] && (
        <Row className="justify-content-center mb-5" style={{ maxWidth: "1000px", margin: "0 auto", }}>
          <h2 style={{ color: "white", textAlign: "center", marginBottom: "2rem" }}>{selectedCategory}</h2>

          {products[selectedCategory].map((item, index) => (
            <Col md="4" sm="6" xs="12" className="mb-4" key={index}>
              <Card style={{ backgroundColor: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)", backdropFilter: "blur(6px)", color: "white", borderRadius: "15px" }}>
                <CardImg top width="100%" height="220px" src={item.img} alt={item.name} />
                <CardBody>
                  <CardTitle tag="h5">{item.name}</CardTitle>
                  <CardText style={{ marginBottom: "0.5rem" }}>
                    Price: <strong>{item.price} OMR</strong>
                  </CardText>
                  <Button
                    color="light"
                    style={{ borderRadius: "25px", fontWeight: 600 }}
                    onClick={() => handleAddToCart({
                      id: `${selectedCategory}-${index}`,
                      name: item.name,
                      price: item.price,
                      img: item.img,
                      category: selectedCategory
                    })}
                  >
                    Add to Cart
                  </Button>
                </CardBody>
              </Card>
            </Col>
          ))}
        </Row>
      )}

      {/* ========================= ABOUT PREVIEW ========================= */}
      <Row className="text-center mb-5">
        <Col md="12">
          <h2 style={{ color: "white", marginTop: "3rem" }}>About Freshly Baked Delights</h2>
          <p style={{ color: "#eee", marginTop: "1rem", lineHeight: "1.7" }}>
            Freshly Baked Delights is dedicated to creating handcrafted cakes made with passion,
            creativity, and the highest quality ingredients.
          </p>
          <Button
            color="light"
            style={{ marginTop: "1rem", borderRadius: "25px", marginBottom: "5rem" }}
            onClick={() => navigate("/about")} // navigate to About page
          >
            Learn More
          </Button>
        </Col>
      </Row>


      {/* ========================= TESTIMONIALS ========================= */}
      <Row className="text-center mb-5" style={{ maxWidth: "90rem", margin: "0 auto" }}>
        <h2 style={{ color: "white", marginBottom: "2rem" }}>What Our Customers Say</h2>

        {[
          { name: "Aisha", review: "The cakes are always fresh, soft, and beautifully decorated." },
          { name: "Moosa", review: "Best bakery in town! The taste and presentation are always perfect." },
          { name: "Fatima", review: "Amazing service and delicious cakes. They made my birthday unforgettable!" }
        ].map((t, i) => (
          <Col md="4" sm="6" xs="12" className="mb-4" key={i}>
            <div
              style={{
                backgroundColor: "rgba(255,255,255,0.1)",
                padding: "2rem",
                borderRadius: "15px",
                border: "1px solid rgba(255,255,255,0.2)",
                backdropFilter: "blur(6px)",
                color: "white",
                marginBottom: "5rem"
              }}
            >
              <h5 style={{ marginBottom: "1rem" }}>{t.name}</h5>
              <p style={{ fontStyle: "italic" }}>"{t.review}"</p>
            </div>
          </Col>
        ))}
      </Row>

      {/* ========================= CONTACT SECTION ========================= */}
      <Row className="text-center mt-5">
        <h2 style={{ color: "white", marginBottom: "1.5rem" }}>Contact & Opening Hours</h2>
        <p style={{ color: "#ddd" }}>📍 Muscat, Oman</p>
        <p style={{ color: "#ddd" }}>📞 +968 9000 0000</p>
        <p style={{ color: "#ddd" }}>🕒 10 AM – 10 PM (Everyday)</p>
      </Row>

    </Container>
  );
};

export default Home;
