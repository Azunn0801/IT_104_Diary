import React, { useState, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { validEmail } from '../../components/RegEx';
import { loginUser } from '../../services/authService';

// 1. Import component Toasts (giống Register.tsx)
import Toasts from '../../components/Toasts';

// Import các file ảnh
import loginBg from '../../assets/images/login-bg.png';
import facebookIcon from '../../assets/icons/facebook-f-brands.svg';
import linkedinIcon from '../../assets/icons/linkedin-in-brands.svg';
import twitterIcon from '../../assets/icons/twitter-brands.svg';
import googleIcon from '../../assets/icons/google-brands.svg';

import './Login.css';

const AUTH_KEY = 'loggedInUser';

const LoginPage: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const navigate = useNavigate();

    // 2. Thêm state cho Toasts (giống Register.tsx)
    const [toastStatus, setToastStatus] = useState<"success" | "error">("error");
    const [toastMessage, setToastMessage] = useState<string>("");
    const [showToast, setShowToast] = useState<boolean>(false);

    // 3. Hàm helper để hiển thị toast (giống Register.tsx)
    const displayToast = (status: "success" | "error", message: string) => {
        setToastStatus(status);
        setToastMessage(message);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000); // Tự ẩn sau 3 giây
    };

    const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        // 4. Sửa logic validation để dùng state toast
        if (!validEmail.test(email)) {
            displayToast("error", "Email is invalid");
            return;
        }
        if (email.length < 1) {
            displayToast("error", "Email must not be empty");
            return;
        }
        if (password.length < 1) {
            displayToast("error", "Password must not be empty");
            return;
        }

        setIsLoading(true);
        try {
            const user = await loginUser(email, password);

            localStorage.setItem(AUTH_KEY, JSON.stringify(user));
            displayToast("success", "Login successful!");

            // 5. Sửa lỗi logic: Dùng user.isAdmin (khớp với db.json)
            if (user.isAdmin) {
                navigate('/admin/user-manager');
            } else {
                navigate('/');
            }
        } catch (err: any) {
            displayToast("error", err.message || "Login failed.");
            setIsLoading(false);
        }
    };

    return (
        <>
            <div className="split">
                <img src={loginBg} alt="" />
                <div className="login-form">
                    <p>Sign in with</p>
                    <div className="icon-deck">
                        <a href="https://www.facebook.com/"><img src={facebookIcon} alt="" /></a>
                        <a href="https://www.linkedin.com/"><img src={linkedinIcon} alt="" /></a>
                        <a href="https://x.com/"><img src={twitterIcon} alt="" /></a>
                    </div>
                    <p className="or"><b>Or</b></p>

                    <form onSubmit={handleLogin}>
                        <div className="mb-3">
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                placeholder="Enter a valid email address"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <label htmlFor="email" className="form-label">Email address</label>
                        </div>
                        <div className="mb-3">
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                placeholder="Enter password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <label htmlFor="password" className="form-label">Password</label>
                        </div>
                        <button
                            type="submit"
                            className="btn btn-primary"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Logging in...' : 'Login'}
                        </button>
                    </form>

                    <div className="modal fade" id="errorModal" tabIndex={-1} aria-labelledby="errorModalLabel" aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="errorModalLabel">Lỗi</h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body" id="errorMessage"></div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <b>Don't have an account?</b>
                    <Link to="/register"> Register</Link>
                </div>
            </div>

            <footer>
                <p>Copyright &copy; 2025. All rights reserved</p>
                <nav className="icon-deck">
                    <a href="https://www.facebook.com/"><img src={facebookIcon} alt="" /></a>
                    <a href="https://www.google.com/"><img src={googleIcon} alt="" /></a>
                    <a href="https://www.linkedin.com/"><img src={linkedinIcon} alt="" /></a>
                    <a href="https://x.com/"><img src={twitterIcon} alt="" /></a>
                </nav>
            </footer>

            {/* 6. Thêm component Toasts (giống Register.tsx) */}
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
        </>
    );
};

export default LoginPage;