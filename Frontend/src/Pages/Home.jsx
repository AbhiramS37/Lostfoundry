import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import { useLocation } from 'react-router-dom';
import { getAuth } from "firebase/auth";

const Home = () => {
    const [items, setItems] = useState([]);
    const location = useLocation();
    const [userEmail, setUserEmail] = useState(null);

    useEffect(() => {

        const auth = getAuth();
        const user = auth.currentUser;
        if (user) {
            setUserEmail(user.email);
        }

        const fetchItems = async () => {
            const querySnapshot = await getDocs(collection(db, 'lostItems'));
            const fetchedItems = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setItems(fetchedItems.reverse());
        };

        fetchItems();
    }, []);

    useEffect(() => {
        if (location.state && location.state.newItem) {
            setItems(prevItems => [location.state.newItem, ...prevItems]);
        }
    }, [location.state]);

    const handleClaim = (email) => {
        if (userEmail) {

            const mailtoLink = `mailto:${email}?subject=I would like to claim the lost item&body=Hello, I would like to claim the item you found. Please get in touch.`;
            window.location.href = mailtoLink;
        } else {
            alert("Please sign in to claim an item.");
        }
    };

    return (
        <div style={{
            textAlign: 'center',
            paddingTop: '100px',
            minHeight: '100vh',
            backgroundColor: 'dark grey',
            paddingLeft: '20px',
            paddingRight: '20px',
            overflowY: 'auto'
        }}>
            <br></br>
            <br></br>
            <h1 style={{
                fontSize: '80px',
                fontWeight: 'bold',
                color: "whitesmoke"
            }}>
                LostFoundry
            </h1>
            <br></br>
            <br></br>
            <p style={{
                fontSize: '20px',
                maxWidth: '800px',
                margin: '30px auto',
                color: 'whitesmoke',
                marginTop: "20px"
            }}>
                Welcome to LostFoundry – a platform dedicated to helping people report and recover lost items in your community. Browse recently reported items and help reunite them with their rightful owners.
            </p>

            <div style={{ marginTop: '80px' }}>
                <h2 style={{ fontSize: '32px', marginBottom: '30px', color: 'white' }}>Recently Found Items</h2>
                <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    gap: '20px',
                    maxHeight: '80vh',
                    overflowY: 'auto'
                }}>
                    {items.length > 0 ? (
                        items.map((item) => (
                            <div key={item.id} style={{
                                border: '1px solid #ccc',
                                borderRadius: '10px',
                                padding: '10px',
                                width: '400px',
                                height: 'auto',
                                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                                background: '#fff',
                                textAlign: 'left',
                                display: 'flex',
                                flexDirection: 'column',
                                maxHeight: '500px',
                                overflow: 'hidden'
                            }}>
                                {item.imageUrl ? (
                                    <img
                                        src={item.imageUrl}
                                        alt="Lost Item"
                                        style={{
                                            width: '100%',
                                            height: '200px',
                                            objectFit: 'cover',
                                            borderRadius: '8px',
                                            marginBottom: '10px'
                                        }}
                                    />
                                ) : (
                                    <div style={{
                                        width: '100%',
                                        height: '200px',
                                        backgroundColor: '#f1f1f1',
                                        borderRadius: '8px',
                                        marginBottom: '10px',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }}>
                                        <p style={{
                                            color: '#808080',
                                            fontSize: '16px',
                                        }}>No Image Uploaded</p>
                                    </div>
                                )}

                                <h3 style={{
                                    marginBottom: '6px',
                                    fontSize: '20px',
                                    color: 'black'
                                }}>
                                    {item.name}
                                </h3>
                                <p style={{ color: 'black' }}><strong>Location:</strong> {item.location}</p>


                                <div style={{
                                    color: 'black',
                                    maxHeight: '100px',
                                    overflowY: 'auto',
                                    marginBottom: '10px'
                                }}>
                                    <strong>Description:</strong> {item.description}
                                </div>

                                <p style={{ color: 'black' }}><strong>Found by:</strong> {item.email}</p>


                                <div style={{ marginTop: 'auto' }}>
                                    <button
                                        onClick={() => handleClaim(item.email)}
                                        style={{
                                            backgroundColor: '#4CAF50',
                                            color: 'white',
                                            padding: '8px 16px',
                                            border: 'none',
                                            borderRadius: '5px',
                                            cursor: 'pointer',
                                            fontSize: '14px',
                                            width: 'auto',
                                            display: 'block',
                                            margin: '10px auto'
                                        }}
                                    >
                                        Claim Item
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p style={{ fontSize: '20px', color: 'white' }}>No items reported yet.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Home;
