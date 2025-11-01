import React, { useState, FormEvent, ChangeEvent } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import Toasts from '../../components/Toasts';
import './Register.module.css';
import { validEmail } from '../../components/RegEx';
import { Link, useNavigate } from 'react-router-dom';

import { registerUser } from '../../services/authService';
import type { NewUserData } from '../../types/User';

interface SignUpFormData {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
}

const SignUpPage: React.FC = () => {
    const [formData, setFormData] = useState<SignUpFormData>({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const [toastStatus, setToastStatus] = useState<"success" | "error">("error");
    const [toastMessage, setToastMessage] = useState<string>("");
    const [showToast, setShowToast] = useState<boolean>(false);

    const navigate = useNavigate()

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setShowToast(false)
        const { firstName, lastName, email, password, confirmPassword } = formData;
        const errors: string[] = []

        if (!firstName || !lastName || !email || !password || !confirmPassword) {
            errors.push('Please fill out all fields.')
        }

        if (!validEmail.test(email)) {
            errors.push('Email is not valid.')
        }

        if (password.length < 1) {
            errors.push('Password must not be empty.')
        }

        if (password !== confirmPassword) {
            errors.push('Password do not match.')
        }

        if (password.length < 6) {
            errors.push('Password must be at least 6 characters long.')
        }

        if (errors.length > 0) {
            setToastStatus("error")
            setToastMessage(errors.join("\n"))
            setShowToast(true)
            setTimeout(() => setShowToast(false), 2000)
            return
        }

        const newUserData: NewUserData = {
            fullName: `${firstName} ${lastName}`,
            email: email,
            password: password,
            avatarUrl: 'https://i.pravatar.cc/150?img=11',
            isActive: true,
            role: false,
        }

        try {
            await registerUser(newUserData)
            setToastStatus("success")
            setToastMessage("\nAccount created successfully! Redirecting to login page")
            setShowToast(true)

            setTimeout(() => {
                navigate('/login')
            }, 2000)
        }
        catch (err) {
            setToastStatus("error")
            setToastMessage(err.message || "Registration failed")
            setShowToast(true)
            setTimeout(() => {
                setShowToast(false)
            }, 2000)
        }
    };

    return (
        <div className="register-page">
            <Container className="signup-container">
                <div className="content">
                    <h1>Welcome to the website</h1>
                    <p className="subtitle">RIKKEI EDUCATION</p>
                </div>

                <div className="signup-form">
                    <Form noValidate onSubmit={handleSubmit}>
                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3 floating-label-group" controlId="first-name">
                                    <Form.Control
                                        type="text"
                                        name="firstName"
                                        placeholder="First Name"
                                        required
                                        value={formData.firstName}
                                        onChange={handleChange}
                                    />
                                    <Form.Label>First name</Form.Label>
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3 floating-label-group" controlId="last-name">
                                    <Form.Control
                                        type="text"
                                        name="lastName"
                                        placeholder="Last Name"
                                        required
                                        value={formData.lastName}
                                        onChange={handleChange}
                                    />
                                    <Form.Label>Last name</Form.Label>
                                </Form.Group>
                            </Col>
                        </Row>

                        <Form.Group className="mb-3 floating-label-group" controlId="email">
                            <Form.Control
                                type="email"
                                name="email"
                                placeholder="Email address"
                                required
                                value={formData.email}
                                onChange={handleChange}
                            />
                            <Form.Label>Email address</Form.Label>
                        </Form.Group>

                        <Form.Group className="mb-3 floating-label-group" controlId="password">
                            <Form.Control
                                type="password"
                                name="password"
                                placeholder="Password"
                                required
                                value={formData.password}
                                onChange={handleChange}
                            />
                            <Form.Label>Password</Form.Label>
                        </Form.Group>

                        <Form.Group className="mb-3 floating-label-group" controlId="confirm-password">
                            <Form.Control
                                type="password"
                                name="confirmPassword"
                                placeholder="Confirm Password"
                                required
                                value={formData.confirmPassword}
                                onChange={handleChange}
                            />
                            <Form.Label>Confirm Password</Form.Label>
                        </Form.Group>

                        <Button type="submit" variant="primary" className="w-100">
                            Sign up
                        </Button>
                    </Form>
                    <p className="login-link mt-3 text-center">
                        <b>Already have an account?</b> <Link to='/login'>Login</Link>
                    </p>
                </div>
            </Container>

            {showToast && (
                <div style={{
                    position: 'fixed',
                    top: 20,
                    right: 20,
                    zIndex: 9999
                }}>
                    <Toasts
                        state={toastStatus}
                        message={toastMessage}
                        onClose={() => setShowToast(false)}
                    />
                </div>
            )}
        </div>
    );
};

export default SignUpPage;