import { useSelector, useDispatch } from 'react-redux';
import { Col, Row, Container, Input, Button } from 'reactstrap';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { updateProfile } from '../features/UserSlice';

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.users.user);

  // Safe destructuring with defaults
  const { uname = "", email = "", profilepic = "" } = user || {};

  const [newName, setNewName] = useState(uname);
  const [successMsg, setSuccessMsg] = useState("");

  // Redirect if not logged in
  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  // Update newName when uname changes
  useEffect(() => {
    setNewName(uname);
  }, [uname]);

  const handleUpdate = async () => {
    if (!newName.trim()) return;
    const res = await dispatch(updateProfile({ email, uname: newName }));
    if (res?.payload?.user) setSuccessMsg("Profile updated!");
  };

  // Don't render if user is not logged in
  if (!user) return null;

  return (
    <Container fluid>
      <Row>
        <Col md="12" style={{ textAlign: "center", marginTop: "6rem", marginBottom: "20rem" }}>
          {/* Use profilepic directly; backend ensures default */}
          <img
            alt='profile pic'
            src={profilepic}
            className='profilepic'
            style={{ width: "150px", borderRadius: "50%" }}
          />
          <h1 style={{ color: "white", paddingTop: "1.5rem" }}>{uname}</h1>

          {/* Update username */}
          <Input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder="Enter new name"
            style={{ width: "300px", margin: "1rem auto" }}
          />
          <Button color="light" onClick={handleUpdate} style={{ marginBottom: "1rem" }}>
            Update Name
          </Button>

          {successMsg && <p style={{ color: "lightgreen" }}>{successMsg}</p>}
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;
