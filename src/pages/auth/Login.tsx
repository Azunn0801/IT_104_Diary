import React, { useState, FormEvent, ChangeEvent } from 'react';
import { Alert, Form, Input, Button } from 'antd';
import { validEmail } from '../../components/RegEx';
import Toasts from '../../components/Toasts';

import loginBg from '../../assets/draw2.webp.png';
import facebookIcon from '../../assets/facebook-f-brands.svg';
import linkedinIcon from '../../assets/linkedin-in-brands.svg';
import twitterIcon from '../../assets/twitter-brands.svg';
import Footer from '../../layouts/Footer';
import './Login.css';

const LoginPage: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [toastStatus, setToastStatus] = useState<"success" | "error">("error");
    const [toastMessage, setToastMessage] = useState<string>("");
    const [showToast, setShowToast] = useState<boolean>(false);

    const handleLogin = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const errors: string[] = []

        if (!validEmail.test(email)) {
            <Alert
                message="Error"
                description="Email is invalid"
                type="error"
            />
            return;
        }

        if (email.length < 1) {
            <Alert
                message="Error"
                description="Email must not be empty"
                type="error"
            />
            return;
        }

        if (password.length < 1) {
            <Alert
                message="Error"
                description="Password must not be empty"
                type="error"
            />
            return;
        }

        console.log('Logging in with:', { email, password });
    };

    return (
        <div className="login-page">
            <div className="split">
                <img src={loginBg} alt="Background" />
                <div className="login-form">
                    <p>Sign in with</p>
                    <div className="icon-deck">
                        <a href="https://www.facebook.com/"><img src={facebookIcon} alt="Facebook" /></a>
                        <a href="https://www.linkedin.com/"><img src={linkedinIcon} alt="LinkedIn" /></a>
                        <a href="https://x.com/"><img src={twitterIcon} alt="Twitter" /></a>
                    </div>
                    <p className="or"><b>Or</b></p>

                    <Form onFinish={handleLogin}>
                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[{ required: true, message: 'Please input your email!' }]}
                        >
                            <Input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Form.Item>

                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[{ required: true, message: 'Please input your password!' }]}
                        >
                            <Input.Password
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="w-100">
                                Login
                            </Button>
                        </Form.Item>
                    </Form>

                    <div className="mt-3 text-center">
                        <b>Don't have an account?</b>
                        <a href="../pages/user/register.html"> Register</a>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default LoginPage;