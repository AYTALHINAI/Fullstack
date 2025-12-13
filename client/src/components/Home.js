import { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Card,
  CardBody,
  CardImg,
  CardTitle,
  CardText
} from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchProducts } from "../features/ProductSlice";
import { addToCart } from "../features/CartSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

/* ======================= CONSTANT DATA ======================= */

const CATEGORIES = [
  "Birthday Cakes",
  "Wedding Cakes",
  "Cupcakes",
  "Desserts"
];

const TESTIMONIALS = [
  { name: "Aisha", review: "The cakes are always fresh, soft, and beautifully decorated." },
  { name: "Moosa", review: "Best bakery in town! The taste and presentation are always perfect." },
  { name: "Fatima", review: "Amazing service and delicious cakes. They made my birthday unforgettable!" }
];

/* ======================= STYLES ======================= */

const styles = {
  container: {
    paddingTop: "6rem",
    paddingBottom: "4rem",
    position: "relative",
    zIndex: 2
  },
  heading: {
    color: "white",
    fontSize: "48px",
    fontWeight: "bold",
    textShadow: "0 2px 6px rgba(0,0,0,0.7)"
  },
  paragraph: {
    color: "#ddd",
    fontSize: "18px",
    lineHeight: "1.6"
  },
  glassBox: (active = false) => ({
    backgroundColor: "rgba(255,255,255,0.1)",
    padding: "2rem",
    borderRadius: "15px",
    backdropFilter: "blur(6px)",
    color: "white",
    border: active ? "2px solid #fff" : "1px solid rgba(255,255,255,0.2)",
    cursor: "pointer",
    transition: "0.3s"
  }),
  card: {
    backgroundColor: "rgba(255,255,255,0.1)",
    border: "1px solid rgba(255,255,255,0.2)",
    backdropFilter: "blur(6px)",
    color: "white",
    borderRadius: "15px"
  }
};

/* ======================= COMPONENT ======================= */

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const email = useSelector((state) => state.users.user?.email);
  const { items: products, isLoading, isError, message } =
    useSelector((state) => state.products);

  const [selectedCategory, setSelectedCategory] = useState(null);

  /* ======================= EFFECTS ======================= */

  useEffect(() => {
    if (email) dispatch(fetchProducts());
    else navigate("/");
  }, [email, dispatch, navigate]);

  /* ======================= HANDLERS ======================= */

  const toggleCategory = (category) => {
    setSelectedCategory((prev) => (prev === category ? null : category));
  };

  const handleAddToCart = (item) => {
    dispatch(addToCart({ email, item }));
    toast.success("Added to Cart!", { autoClose: 2000 });
  };

  /* ======================= GUARDS ======================= */

  if (!email) return null;
  if (isLoading) return <p className="text-center text-light mt-5">Loading products...</p>;
  if (isError) return <p className="text-center text-danger mt-5">{message}</p>;

  /* ======================= RENDER ======================= */

  return (
    <Container fluid style={styles.container}>
      <ToastContainer />

      {/* ================= HERO ================= */}
      <Row className="text-center mb-5">
        <Col md="10" className="mx-auto">
          <h1 style={styles.heading}>Welcome to Freshly Baked Delights</h1>
          <p style={{ ...styles.paragraph, marginTop: "1rem", marginBottom: "5rem" }}>
            From birthday celebrations to weddings, every cake is handcrafted with love
            using the finest ingredients to deliver unforgettable flavors.
          </p>
        </Col>
      </Row>

      {/* ================= CATEGORIES ================= */}
      <Row className="text-center mb-5" style={{ maxWidth: "90rem", margin: "0 auto" }}>
        <h2 className="text-white mb-4">Our Categories</h2>

        {CATEGORIES.map((cat) => (
          <Col md="3" sm="6" xs="12" key={cat} className="mb-4">
            <div
              style={styles.glassBox(selectedCategory === cat)}
              onClick={() => toggleCategory(cat)}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
              <h4>{cat}</h4>
            </div>
          </Col>
        ))}
      </Row>

      {/* ================= PRODUCTS ================= */}
      {selectedCategory && products[selectedCategory] && (
        <Row className="justify-content-center mb-5" style={{ maxWidth: "1000px", margin: "0 auto" }}>
          <h2 className="text-white text-center mb-4">{selectedCategory}</h2>

          {products[selectedCategory].map((item, index) => (
            <Col md="4" sm="6" xs="12" key={index} className="mb-4">
              <Card style={styles.card}>
                <CardImg top src={item.img} alt={item.name} height="220" />
                <CardBody>
                  <CardTitle tag="h5">{item.name}</CardTitle>
                  <CardText>
                    Price: <strong>{item.price} OMR</strong>
                  </CardText>
                  <Button
                    color="light"
                    style={{ borderRadius: "25px", fontWeight: 600 }}
                    onClick={() =>
                      handleAddToCart({
                        id: `${selectedCategory}-${index}`,
                        name: item.name,
                        price: item.price,
                        img: item.img,
                        category: selectedCategory
                      })
                    }
                  >
                    Add to Cart
                  </Button>
                </CardBody>
              </Card>
            </Col>
          ))}
        </Row>
      )}

      {/* ================= ABOUT ================= */}
      <Row className="text-center mb-5">
        <Col>
          <h2 className="text-white">About Freshly Baked Delights</h2>
          <p className="text-light mt-3">
            We specialize in handcrafted cakes created with passion, creativity,
            and premium ingredients for every occasion.
          </p>
          <Button
            color="light"
            style={{ borderRadius: "25px" }}
            onClick={() => navigate("/about")}
          >
            Learn More
          </Button>
        </Col>
      </Row>

      {/* ================= TESTIMONIALS ================= */}
      <Row className="text-center mb-5" style={{ maxWidth: "90rem", margin: "0 auto" }}>
        <h2 className="text-white mb-4">What Our Customers Say</h2>

        {TESTIMONIALS.map((t) => (
          <Col md="4" sm="6" xs="12" key={t.name} className="mb-4">
            <div style={styles.glassBox()}>
              <h5>{t.name}</h5>
              <p className="fst-italic">"{t.review}"</p>
            </div>
          </Col>
        ))}
      </Row>

      {/* ================= CONTACT ================= */}
      <Row className="text-center mt-5">
        <h2 className="text-white mb-3">Contact & Opening Hours</h2>
        <p className="text-light">📍 Muscat, Oman</p>
        <p className="text-light">📞 +968 9000 0000</p>
        <p className="text-light">🕒 10 AM – 10 PM (Everyday)</p>
      </Row>
    </Container>
  );
};

export default Home;
