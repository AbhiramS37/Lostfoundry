import React, { useEffect, useState } from "react";
import { getAuth, signOut } from "firebase/auth";
import { adminCredentials } from "../adminConfig";
import { useNavigate } from "react-router-dom";  // Import useNavigate for routing
import "./Account.css";

const Account = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate(); // Initialize useNavigate hook

    useEffect(() => {
        const auth = getAuth();
        const currentUser = auth.currentUser;
        if (currentUser) {
            const isAdmin = currentUser.email === 'admin@gmail.com';
            setUser({
                name: isAdmin ? 'Admin' : currentUser.displayName || "Anonymous User",
                email: currentUser.email,
                joined: currentUser.metadata?.creationTime || "N/A",
            });
        }
    }, []);

    const handleLogout = async () => {
        const auth = getAuth();
        try {
            await signOut(auth);
            alert("Logged out successfully!");
            window.location.href = "/";
        } catch (error) {
            console.error("Logout Error:", error);
            alert("Failed to log out.");
        }
    };

    const handleSendEmailToAdmin = () => {
        if (user) {
            const mailtoLink = `mailto:${adminCredentials.email}?subject=User Report&body=Hello Admin, The item I found has been successfully reunited with its rightful owner`;
            window.location.href = mailtoLink;
        } else {
            alert("You must be logged in to contact the admin.");
        }
    };

    const handleGoToAdminDashboard = () => {
        navigate('/admin'); // Navigate to the Admin Dashboard
    };

    return (
        <div className="account-page">
            <div className="account-header">
                <h2>Account</h2>
            </div>
            {user ? (
                <div className="account-body">
                    <div className="user-info">
                        <p><strong>Name:</strong> {user.name}</p>
                        <p><strong>Email:</strong> {user.email}</p>
                        <p><strong>Joined:</strong> {user.joined}</p>
                    </div>

                    <div className="buttons">
                        <button onClick={handleLogout} className="logout-btn">Logout</button>

                        {user.email !== 'admin@gmail.com' && (
                            <button onClick={handleSendEmailToAdmin} className="contact-admin-btn">
                                Mail Admin
                            </button>
                        )}

                        {user.email === 'admin@gmail.com' && (
                            <button onClick={handleGoToAdminDashboard} className="admin-dashboard-btn">
                                Go to Admin Dashboard
                            </button>
                        )}
                    </div>
                </div>
            ) : (
                <p>Loading user info...</p>
            )}
        </div>
    );
};

export default Account;
