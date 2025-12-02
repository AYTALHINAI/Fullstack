import './App.css';
import Login from './components/Login.js';
import Register from './components/Register.js';
import Home from './components/Home.js';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container, Row } from 'reactstrap';
import Header from './components/Header.js';
import { useSelector } from 'react-redux';
import Footer from './components/Footer.js';
import AboutUs from './components/AboutUs.js';
import login_background from "./assets/login_background.jpg";
import Profile from './components/Profile.js';
import Cart from './components/Cart.js';
import Payment from './components/Payment.js';


function App() {

  const email = useSelector((state) => state.users.user?.email);

  return (
    <div
      style={{
        backgroundImage: `url(${login_background})`,
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
        width: "100%",
        position: "relative"
      }}
    >
      {/* Dark overlay */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.8)",
          pointerEvents: "none",
          zIndex: 1
        }}
      />
      {/* Main content */}
      <div style={{ position: "relative", zIndex: 2 }}>
        <Container fluid>
          <Router>
            <Row>
              {email ? <Header /> : null}
            </Row>
            <Row>
              <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/home" element={<Home />} />
                <Route path="/about" element={<AboutUs />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/payment" element={<Payment />} />
                <Route path="/profile" element={<Profile />} />
              </Routes>
            </Row>
            <Row>
              <Footer />
            </Row>
          </Router>
        </Container>
      </div>
    </div>
  );
}

export default App;
