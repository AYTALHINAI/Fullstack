import { Container, Row, Col } from "reactstrap";

const AboutUs = () => {
  return (
    <Container style={{ position: "relative", padding: "8rem", marginTop: "2rem", marginBottom: "3rem" }}>
      <Row className="justify-content-center">
        <Col md="12">
          <div
            style={{
              backgroundColor: "rgba(0,0,0,0.55)",
              borderRadius: "15px",
              padding: "3rem",
              backdropFilter: "blur(6px)",
              border: "1px solid rgba(255,255,255,0.25)",
              boxShadow: "0 8px 30px rgba(0,0,0,0.7)",
              color: "white",
            }}
          >
            <Row>
              
              <Col md="4" className="d-flex align-items-center">
                <h1 style={{ fontSize: "36px", fontWeight: "bold" }}>
                  About Freshly Baked Delights
                </h1>
              </Col>


              <Col md="8">
                <p style={{ fontSize: "18px", lineHeight: "1.8" }}>
                  Welcome to Freshly Baked Delights, your ultimate destination for exquisite cakes and
                  pastries that delight both the eyes and the taste buds. Our passion is to
                  craft beautiful, high-quality baked goods using only the finest ingredients.
                </p>

                <p style={{ fontSize: "18px", lineHeight: "1.8" }}>
                  Whether it's a birthday, wedding, or any special occasion, Freshly Baked Delights
                  brings creativity, flavor, and elegance to every creation. Join us on a
                  sweet journey where art meets taste, and every bite tells a story.
                </p>

                <p style={{ fontSize: "18px", lineHeight: "1.8" }}>
                  Our mission is simple: to create unforgettable experiences through cakes that
                  are as beautiful as they are delicious. We also strive to innovate constantly,
                  introducing new flavors, designs, and seasonal specials to delight our customers.
                </p>

                <p style={{ fontSize: "18px", lineHeight: "1.8" }}>
                  At Freshly Baked Delights, we believe every cake is more than dessert—it's a celebration
                  of life, love, and joy shared with those you care about. Let us make your
                  special moments truly memorable.
                </p>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default AboutUs;
