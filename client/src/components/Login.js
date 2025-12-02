import { Container, Row, Col, FormGroup, Label, Input, Button } from 'reactstrap';
import login_background from "../assets/login_background.jpg";
import { UserSchemaValidation } from '../validations/userSchemaValidation';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../features/UserSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Login = () => {

    let [email, setEmail] = useState('');
    let [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const user = useSelector((state) => state.users.user);
    const isSuccess = useSelector((state) => state.users.isSuccess);
    const isError = useSelector((state) => state.users.isError);
    const navigate = useNavigate();

    const {
        register,
        handleSubmit: submitForm,
        formState: { errors }
    } = useForm({ resolver: yupResolver(UserSchemaValidation) });

    const validate = () => {
        const data = {
            email: email,
            password: password,
        }
        dispatch(getUser(data));
    }

    useEffect(() => {
        if (user && isSuccess)
            navigate("/home");
        if (isError)
            navigate("/");
    }, [user, isSuccess, isError]);

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
                        <h1 className="text-center text-white mb-4" style={{
                            fontWeight: "bold",
                            fontSize: "28px",
                            color: "white",
                            letterSpacing: "1px",
                            paddingBottom: "2rem"
                        }}>
                            Freshly Baked Delights
                        </h1>

                        <FormGroup className="mb-4">
                            <Label className='text-white'>Email</Label>
                            <input
                                {...register('email', {
                                    value: email,
                                    onChange: (e) => setEmail(e.target.value)
                                })}
                                placeholder='Enter your Email'
                                type='email'
                                className='form-control'
                            />
                            <p style={{ color: 'red' }}>{errors.email?.message}</p>
                        </FormGroup>

                        <FormGroup className="mb-4">
                            <Label className='text-white'>Password</Label>
                            <input
                                {...register('password', {
                                    value: password,
                                    onChange: (e) => setPassword(e.target.value)
                                })}
                                placeholder='Enter your Password'
                                type='password'
                                className='form-control'
                            />
                            <p style={{ color: 'red' }}>{errors.password?.message}</p>
                        </FormGroup>

                        <FormGroup className="d-flex align-items-center mb-4">
                            <Input type='checkbox' />
                            <Label className="ms-2 text-white">Remember Me</Label>
                        </FormGroup>

                        <FormGroup className="mb-4">
                            <Button
                                onClick={submitForm(validate)}
                                className='form-control bg-primary text-white'
                                style={{ borderRadius: "8px" }}
                            >
                                Sign In
                            </Button>
                        </FormGroup>

                        {/* <FormGroup className='text-center text-white mb-2'>
                                <Label>Forget password</Label>
                            </FormGroup> */}

                        <FormGroup className='text-center text-white'>
                            <Label>No Account? <Link to='/register'>Sign Up Now...</Link></Label>
                        </FormGroup>
                    </form>

                </Col>
            </Row>
        </Container>

    );
}

export default Login;
