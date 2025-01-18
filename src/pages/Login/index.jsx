import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/Footer";
import request from "../../services/request";

import "./Login.scss";

function Login() {
    const navigate = useNavigate();

    const [name, setName] = useState("yyc");
    const [email, setEmail] = useState("yichunyu66@gmail.com");
    const [error, setError] = useState(null);

    const handleLogin = async () => {
        setError(null);
        if (!name || !email) {
            setError("Please fill in all fields");
        }

        try {
            await request.post("/auth/login", { name, email }, { withCredentials: true });
            navigate("/");
        } catch (err) {
            setError("Login failed. Please check your credentials.");
        }
    };
    return (
        <div className="login">
            <div className="loginContainer">
                <div className="loginBox">
                    <img src="/imgs/dog-icon.png" alt="Fetch Dogs" />
                    <h1>Welcome to Fetch Dogs</h1>
                    
                    <div className="loginForm">
                        <div className="inputItem">
                            <input type="text" placeholder="Username" value={name} onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div className="inputItem">
                            <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <button variant="contained" onClick={handleLogin}>
                            Login
                        </button>
                        {error && <p className="error">{error}</p>}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Login;
