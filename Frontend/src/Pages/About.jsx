import React from "react";
import "./About.css";

const About = () => {
    return (
        <div className="about-container">
            <img src="logo.png" style={{ marginTop: "100px" }} alt="LostFoundry Logo" />
            <div className="about-content">
                <h1>About LostFoundry</h1>
                <br />
                <p>
                    Welcome to Lost & Found, your go-to platform for reporting and finding lost items.
                    We aim to connect people who have lost or found belongings in a simple and efficient way✨.
                </p>

                <br></br>
                <div className="mission-section">
                    <h2>💡 Our Mission</h2>
                    <p>
                        We believe in bringing people together through honesty and goodwill. Whether it's a lost wallet,
                        a misplaced phone, or a forgotten bag, we aim to reduce stress and reunite people with their lost items.
                    </p>
                    <p className="highlight-text">✨ Join us in making a difference!</p>
                </div>

                <br></br>
                <div className="info-section">
                    <div className="info-card">
                        <h2>How It Works</h2>
                        <p>
                            If you've found an item, upload its details to help the rightful owner claim it.
                            If you've lost something, search our database and contact the person who found it.
                        </p>
                    </div>
                    <br></br>
                    <div className="info-card">
                        <h2>Why Choose Us?</h2>
                        <p>
                            Our platform ensures privacy, quick communication, and a secure way to retrieve lost belongings.
                            We facilitate a way to connect those who lost items with those who found it.
                        </p>
                    </div>
                </div>


            </div>
        </div>
    );
};

export default About;
