import { useSelector, useDispatch } from 'react-redux';
import { Col, Row, Container, Input, Button, FormGroup, Label } from 'reactstrap';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { updateProfile } from '../features/UserSlice';

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.users.user);

  // Safe destructuring with defaults
  const { uname = "", email = "", profilepic = "", phoneNumber = "" } = user || {};

  const [newName, setNewName] = useState(uname);
  const [newPhone, setNewPhone] = useState(phoneNumber);
  const [newPic, setNewPic] = useState(profilepic);
  const [successMsg, setSuccessMsg] = useState("");

  
  useEffect(() => {
    // Removed the navigation on error to keep user on login page and show error
  }, [user, navigate]);

  // Update state when user changes (e.g. after refresh or update)
  useEffect(() => {
    setNewName(uname);
    setNewPhone(phoneNumber);
    setNewPic(profilepic);
  }, [uname, phoneNumber, profilepic]);

  const handleUpdate = async () => {
    const res = await dispatch(updateProfile({
      email,
      uname: newName,
      phoneNumber: newPhone,
      profilepic: newPic
    }));
    if (res?.payload?.user) setSuccessMsg("Profile updated!");
  };

  // Don't render if user is not logged in
  if (!user) return null;

  return (
    <Container
      fluid
      className="d-flex justify-content-center align-items-center"
      style={{ height: "100vh", position: "relative", zIndex: 2 }}
    >
      <Row>
        <Col md="12">
          <form
            className="div-form p-5"
            style={{
              width: "600px",
              margin: "auto",
              borderRadius: "15px",
              backgroundColor: "rgba(0,0,0,0.55)",
              backdropFilter: "blur(6px)",
              border: "1px solid rgba(255,255,255,0.25)",
              boxShadow: "0 8px 30px rgba(0,0,0,0.8)"
            }}
          >
            <div className="text-center mb-4">
              <img
                alt='profile pic'
                src={profilepic}
                className='profilepic'
                style={{ width: "120px", borderRadius: "50%", border: "3px solid white" }}
              />
              <h2 className="text-white mt-3" style={{ fontWeight: "bold" }}>{uname}</h2>
            </div>

            <h3 className="text-center text-white mb-4">Update Profile</h3>

            <FormGroup className="mb-3">
              <Label className="text-white">Profile Picture URL</Label>
              <Input
                type="text"
                value={newPic}
                onChange={(e) => setNewPic(e.target.value)}
                placeholder="Profile Picture URL"
                className='form-control'
              />
            </FormGroup>

            <FormGroup className="mb-3">
              <Label className="text-white">Name</Label>
              <Input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="Enter new name"
                className='form-control'
              />
            </FormGroup>

            <FormGroup className="mb-4">
              <Label className="text-white">Phone Number</Label>
              <Input
                type="text"
                value={newPhone}
                onChange={(e) => setNewPhone(e.target.value)}
                placeholder="Enter new phone number"
                className='form-control'
              />
            </FormGroup>

            <FormGroup className="mb-3">
              <Button
                onClick={handleUpdate}
                className='form-control bg-primary text-white'
                style={{ borderRadius: "8px" }}
              >
                Update Profile
              </Button>
            </FormGroup>

            {successMsg && (
              <div className="text-center">
                <p style={{ color: "lightgreen", fontWeight: "bold" }}>{successMsg}</p>
              </div>
            )}
          </form>
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;
