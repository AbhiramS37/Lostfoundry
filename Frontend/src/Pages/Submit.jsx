import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "./Submit.css";

const Submit = () => {
    const [formData, setFormData] = useState({
        name: "",
        location: "",
        description: "",
        image: null,
    });

    const [user, setUser] = useState(null);
    const [authChecked, setAuthChecked] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const navigate = useNavigate();
    const auth = getAuth();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                setUser(currentUser);
            } else {
                setUser(null);
            }
            setAuthChecked(true);
        });

        return () => unsubscribe();
    }, []);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "image") {
            setFormData({ ...formData, image: files[0] });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!authChecked) {
            alert("Authentication not ready yet. Please wait.");
            return;
        }

        if (!user) {
            alert("You must be logged in to submit a report.");
            return;
        }

        const newItem = {
            name: formData.name,
            location: formData.location,
            description: formData.description,
            email: user.email,
            createdAt: new Date(),
            imageUrl: "",
        };

        try {
            setIsUploading(true);

            if (formData.image) {
                const formDataToUpload = new FormData();
                formDataToUpload.append("file", formData.image);
                formDataToUpload.append("upload_preset", "lostandfound");

                const response = await fetch("https://api.cloudinary.com/v1_1/dj82z7cqr/image/upload", {
                    method: "POST",
                    body: formDataToUpload,
                });

                const data = await response.json();
                newItem.imageUrl = data.secure_url;
            }

            await addDoc(collection(db, "lostItems"), newItem);
            alert("Found item reported successfully!");
            setIsUploading(false);
            navigate("/home");
        } catch (error) {
            console.error("Error submitting item:", error);
            alert("Error submitting the item. Please try again later.");
            setIsUploading(false);
        }
    };

    return (
        <div className="report-container">
            <div className="report-box">
                <h2>Report Found Item</h2>
                <form onSubmit={handleSubmit}>
                    <label>
                        Name:
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </label>

                    <label>
                        Location:
                        <input
                            type="text"
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            required
                        />
                    </label>

                    <label>
                        Description:
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Short description about the item..."
                            required
                        ></textarea>
                    </label>

                    <label>
                        Upload Image:
                        <input
                            type="file"
                            name="image"
                            accept="image/*"
                            onChange={handleChange}
                        />
                    </label>

                    <button type="submit" disabled={isUploading}>
                        {isUploading ? "Uploading..." : "Submit Report"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Submit;
