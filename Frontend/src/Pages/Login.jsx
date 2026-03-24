import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Login.module.css';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { adminCredentials } from '../adminConfig';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const userEmail = userCredential.user.email;

            if (email === adminCredentials.email && password === adminCredentials.password) {
                alert("Admin logged in");
                navigate('/home');

            } else {
                alert("User logged in");
                navigate('/home');
            }
        } catch (error) {
            console.error("Login failed:", error.message);
            alert("Invalid credentials. Try again.");
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.box}>
                <h1>Login</h1>
                <form onSubmit={handleLogin}>
                    <div className={styles.inputbox}>
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className={styles.inputbox}>
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className={styles.checkforgot}>
                        <label>
                            <input type="checkbox" /> Remember me
                        </label>
                        <Link to="/forgot">Forgot password?</Link>
                    </div>
                    <button type="submit" className={styles.btnn}>Login</button>
                    <div className={styles.reg}>
                        <p>Don't have an account? <Link to="/signup">Register</Link></p>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;
