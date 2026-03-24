import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { getAuth } from "firebase/auth";

const Admin = () => {
    const [items, setItems] = useState([]);
    const [userEmail, setUserEmail] = useState(null);
    const [editingItem, setEditingItem] = useState(null);
    const [updatedName, setUpdatedName] = useState('');
    const [updatedDescription, setUpdatedDescription] = useState('');

    useEffect(() => {
        const auth = getAuth();
        const user = auth.currentUser;
        if (user) {
            setUserEmail(user.email);
        }

        const fetchItems = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'lostItems'));
                const fetchedItems = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setItems(fetchedItems.reverse());
            } catch (error) {
                console.error('Error fetching items:', error);
            }
        };

        fetchItems();
    }, []);

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this item?');
        if (confirmDelete) {
            try {
                await deleteDoc(doc(db, 'lostItems', id));
                setItems(items.filter(item => item.id !== id));
                alert('Item deleted successfully.');
            } catch (error) {
                console.error('Error deleting item:', error);
                alert('Error deleting item.');
            }
        }
    };

    const handleUpdate = async (id) => {
        try {
            const itemRef = doc(db, 'lostItems', id);
            await updateDoc(itemRef, {
                name: updatedName || editingItem.name,
                description: updatedDescription || editingItem.description
            });
            setItems(items.map(item =>
                item.id === id ? { ...item, name: updatedName || item.name, description: updatedDescription || item.description } : item
            ));
            alert('Item updated successfully!');
            setEditingItem(null);
        } catch (error) {
            console.error('Error updating item:', error);
            alert('Error updating item.');
        }
    };

    const handleEdit = (item) => {
        setEditingItem(item);
        setUpdatedName(item.name);
        setUpdatedDescription(item.description);
    };

    return (
        <div style={{
            padding: '40px',
            backgroundColor: '#f4f4f9',
            minHeight: '100vh',
            paddingTop: '100px', // Ensure space for the navbar
        }}>
            <h1 style={{
                fontSize: '48px',
                fontWeight: 'bold',
                color: '#333',
                textAlign: 'center',
                marginBottom: '40px',
                paddingTop: '20px', // Adjust the distance from the top
            }}>
                Admin Dashboard
            </h1>

            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                marginBottom: '40px'
            }}>
                <p style={{
                    fontSize: '18px',
                    color: '#666',
                    marginBottom: '20px',
                    textAlign: 'center',
                    maxWidth: '800px'
                }}>
                    Welcome to the Admin Dashboard. Here you can manage lost items reported by users.
                </p>
            </div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',  // Create responsive grid layout
                gap: '20px',  // Space between cards
                justifyItems: 'center',  // Center items in the grid
            }}>
                {items.length > 0 ? (
                    items.map((item) => (
                        <div key={item.id} style={{
                            border: '1px solid #ccc',
                            borderRadius: '10px',
                            padding: '15px',
                            width: '100%',
                            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                            background: '#fff',
                            textAlign: 'left',
                            display: 'flex',
                            flexDirection: 'column',
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
                                {editingItem && editingItem.id === item.id ? (
                                    <input
                                        type="text"
                                        value={updatedName}
                                        onChange={(e) => setUpdatedName(e.target.value)}
                                        style={{
                                            fontSize: '20px',
                                            color: 'black',
                                            width: '100%',
                                            padding: '5px',
                                            marginBottom: '10px'
                                        }}
                                    />
                                ) : (
                                    item.name
                                )}
                            </h3>
                            <p style={{ color: 'black' }}><strong>Location:</strong> {item.location}</p>

                            <div style={{
                                color: 'black',
                                maxHeight: '100px',
                                overflowY: 'auto',
                                marginBottom: '10px'
                            }}>
                                <strong>Description:</strong>
                                {editingItem && editingItem.id === item.id ? (
                                    <textarea
                                        value={updatedDescription}
                                        onChange={(e) => setUpdatedDescription(e.target.value)}
                                        style={{
                                            fontSize: '16px',
                                            color: 'black',
                                            width: '100%',
                                            padding: '5px',
                                            marginBottom: '10px',
                                            height: '80px',
                                            resize: 'none'
                                        }}
                                    />
                                ) : (
                                    item.description
                                )}
                            </div>

                            <p style={{ color: 'black' }}><strong>Reported by:</strong> {item.email}</p>

                            <div style={{ marginTop: 'auto' }}>
                                {editingItem && editingItem.id === item.id ? (
                                    <button
                                        onClick={() => handleUpdate(item.id)}
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
                                        Update Item
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => handleEdit(item)}
                                        style={{
                                            backgroundColor: '#FFA500',
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
                                        Edit Item
                                    </button>
                                )}
                                <button
                                    onClick={() => handleDelete(item.id)}
                                    style={{
                                        backgroundColor: '#FF6347',
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
                                    Delete Item
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p style={{ fontSize: '20px', color: '#333' }}>No items reported yet.</p>
                )}
            </div>
        </div>
    );
};

export default Admin;
