import React, { useState } from 'react';
import styles from './Signup.module.css';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth, db } from '../firebase';
import { doc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        contact: '',
        agreed: false
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
    };

    const handleSignup = async (e) => {
        e.preventDefault();

        if (!formData.agreed) {
            alert("Please agree to the terms and conditions.");
            return;
        }

        try {
            // Step 1: Create user with Firebase Authentication
            const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
            const user = userCredential.user;

            // Step 2: Set the display name for the Firebase user
            await updateProfile(user, {
                displayName: formData.name,
            });

            // Step 3: Firestore - Save additional user info
            try {
                await setDoc(doc(db, "users", user.uid), {
                    name: formData.name,
                    email: formData.email,
                    contact: formData.contact,
                });
                console.log("User info added to Firestore successfully");
            } catch (firestoreError) {
                console.error("Error writing to Firestore:", firestoreError.message);
                alert("Error saving user info to Firestore.");
                return; // Exit the function early if Firestore fails
            }

            // Signup success
            alert("Signup successful! Redirecting to login...");
            navigate('/'); // ✅ success: redirect to login

        } catch (error) {
            // Firebase Authentication errors
            console.error("Signup error:", error.message);

            if (error.code === "auth/email-already-in-use") {
                alert("This email is already in use. Please use a different one.");
            } else if (error.code === "auth/weak-password") {
                alert("Password should be at least 6 characters.");
            } else {
                alert("Signup failed. Please try again.");
            }
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.box}>
                <h1>Sign-up</h1>
                <form onSubmit={handleSignup}>
                    <div className={styles.bb}>
                        <input
                            type="text"
                            name="name"
                            placeholder="Name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className={styles.bb}>
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className={styles.bb}>
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className={styles.bb}>
                        <input
                            type="tel"
                            name="contact"
                            placeholder="Contact Number"
                            value={formData.contact}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className={styles.checkbox}>
                        <label>
                            <input
                                type="checkbox"
                                name="agreed"
                                checked={formData.agreed}
                                onChange={handleChange}
                                required
                            />
                            Terms and conditions agreement
                        </label>
                    </div>
                    <button type="submit" className={styles.btnn}>Submit</button>
                </form>
            </div>
        </div>
    );
};

export default Signup;
