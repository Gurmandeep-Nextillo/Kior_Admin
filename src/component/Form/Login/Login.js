import React, { useEffect, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../../redux/loginSlice';


const Login = () => {

    const navigation = useNavigate();
    const dispatch = useDispatch();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isValid, setIsValid] = useState(false);

    const loginSuccess = useSelector((state) => state.loginReducer.data);

    const handleEmailChange = (e) => {
        const newEmail = e.target.value;
        setEmail(newEmail);
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{3,4}$/;
        const isValidEmail = emailRegex.test(newEmail);
        setIsValid(isValidEmail);
    };

    const onLoginClick = () => {
        if (email.length == 0) {
            alert("Please enter email!");
        } else if (password.length == 0) {
            alert("Please enter password");
        } else {
            const payload = {
                email: email,
                password: password,
            };
            dispatch(loginUser(payload));
        }
    };

    useEffect(() => {
        if (loginSuccess != null && loginSuccess.status == 1) {
            localStorage.clear();
            console.log("Token Login ===> ", loginSuccess.token)
            localStorage.setItem("token", loginSuccess.token);
            navigation("/dashboard");
        } else if (loginSuccess != null) {
            alert(loginSuccess.message);
        }
    }, [loginSuccess]);


    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            onLoginClick();
        }
    };

    //loader
    // const [loading, setLoading] = useState(false);
    // const handleLoaderClick = () => {
    //     setLoading(true);
    //     setTimeout(() => {
    //         setLoading(false);
    //     }, 4000);
    // };


    return (
        <>
            <div className='login'>
                <div className='coustom_container'>
                    <Form className="mt-4" onKeyPress={handleKeyPress}>
                        <h2 className="mt-5">Login</h2>
                        <Form.Group className='form_group'>
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Email"
                                required
                                value={email}
                                onChange={(e) => {
                                    handleEmailChange(e);
                                }}
                            />
                        </Form.Group>

                        <Form.Group className='form_group'>
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                required
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                }}
                            />
                        </Form.Group>

                        <Button type="button" style={{ cursor: 'pointer' }} onClick={() => onLoginClick()}>
                            Login
                        </Button>
                    </Form>
                </div>
            </div>
        </>
    )
}

export default Login;