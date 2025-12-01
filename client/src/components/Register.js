import { Container, Row, Col, FormGroup, Label, Button } from "reactstrap";
import { UserRegisterSchemaValidation } from "../validations/UserRegisterSchemaValidation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { addUser } from "../features/UserSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [uname, setuname] = useState("");
  const [pic, setPic] = useState("");

  const dispatch = useDispatch();
  const { message, isLoading } = useSelector((state) => state.users);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit: submitForm,
    formState: { errors },
  } = useForm({ resolver: yupResolver(UserRegisterSchemaValidation) });

  const validate = async () => {
    const data = { uname, email, password, profilepic: pic };
    const result = await dispatch(addUser(data));

    if (addUser.fulfilled.match(result) && result.payload === "Success") {
      navigate("/");
    }
  };

  return (
      <Container
        fluid
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh", position: "relative", zIndex: 2 }}
      >
        <Row>
          <Col md="12">
            <form
              className="p-5"
              style={{
                width: "600px",
                margin: "auto",
                borderRadius: "15px",
                backgroundColor: "rgba(0,0,0,0.55)",
                backdropFilter: "blur(6px)",
                border: "1px solid rgba(255,255,255,0.25)",
                boxShadow: "0 8px 30px rgba(0,0,0,0.7)",
              }}
            >
              <h3 className="text-center text-white mb-4">Create Account</h3>


              <FormGroup className="mb-4">
                <Label className="text-white">User Name</Label>
                <input
                  {...register("uname", {
                    value: uname,
                    onChange: (e) => setuname(e.target.value),
                  })}
                  placeholder="Enter your username"
                  type="text"
                  className="form-control"
                />
                <p style={{ color: "red" }}>{errors.uname?.message}</p>
              </FormGroup>


              <FormGroup className="mb-4">
                <Label className="text-white">Profile Picture (URL)</Label>
                <input
                  {...register("pic", {
                    value: pic,
                    onChange: (e) => setPic(e.target.value),
                  })}
                  placeholder="Enter image URL"
                  type="text"
                  className="form-control"
                />
                <p style={{ color: "red" }}>{errors.pic?.message}</p>
              </FormGroup>

       
              <FormGroup className="mb-4">
                <Label className="text-white">Email</Label>
                <input
                  {...register("email", {
                    value: email,
                    onChange: (e) => setEmail(e.target.value),
                  })}
                  placeholder="Enter your email"
                  type="email"
                  className="form-control"
                />
                <p style={{ color: "red" }}>{errors.email?.message}</p>
              </FormGroup>

   
              <FormGroup className="mb-5">
                <Label className="text-white">Password</Label>
                <input
                  {...register("password", {
                    value: password,
                    onChange: (e) => setPassword(e.target.value),
                  })}
                  placeholder="Enter your password"
                  type="password"
                  className="form-control"
                />
                <p style={{ color: "red" }}>{errors.password?.message}</p>
              </FormGroup>

       
              <FormGroup className="mb-4">
                <Button
                  onClick={submitForm(validate)}
                  className="form-control bg-primary text-white"
                  disabled={isLoading}
                  style={{ borderRadius: "8px" }}
                >
                  {isLoading ? "Please wait..." : "Register"}
                </Button>
              </FormGroup>

              <FormGroup className='text-center text-white'>
                <Label>Have an account? <Link to='/'>Login</Link></Label>
              </FormGroup>

      
              <FormGroup className="text-center">
                <p
                  style={{
                    color: message === "Success" ? "lightgreen" : "red",
                    fontWeight: "bold",
                  }}
                >
                  {message}
                </p>
              </FormGroup>
            </form>
          </Col>
        </Row>
      </Container>
  );
};

export default Register;
