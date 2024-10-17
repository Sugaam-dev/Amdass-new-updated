import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

function Menu() {
    const [menuData, setMenuData] = useState([]);
    const [error, setError] = useState(null);

    // Access JWT token from Redux store
    const token = useSelector((state) => state.auth.token);
console.log(menuData)
    useEffect(() => {
        if (token) {
            axios.get(`http://15.207.113.232:8081/api/menus/menu/Wednesday`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
            .then(response => {
                setMenuData(response.data); // Set the menu data
                setError(null); // Clear any error
            })
            .catch(error => {
                setError('Error fetching menu data');
                console.error(error);
            });
        }
    }, [token]);

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <h1>Wednesday's Menu</h1>
            {menuData.length > 0 ? (
                menuData.map((menu, index) => (
                    <div key={index}>
                        <h2>{menu.isVeg === 1 ? "Vegetarian" : menu.isVeg === 0 ? "Non-Vegetarian" : "Egg-Based"}</h2>
                        <p>{menu.isFullDish ? "Full Dish" : "Side Dish"}</p>
                        <MenuCategory menuItems={menu.menuItems} />
                    </div>
                ))
            ) : (
                <p>No menu available for today.</p>
            )}
        </div>
    );
}

function MenuCategory({ menuItems }) {
    // Check if menuItems exists and is an array
    if (!menuItems || menuItems.length === 0) {
        return <div>No menu items available</div>;
    }

    return (
        <div>
            {menuItems.map((item, index) => (
                <div key={index} style={{ padding: '10px 0' }}>
                    <h3>{item.item.category.categoryName}</h3>
                    <p>Item: {item.item.itemName}</p>
                    <p>Price: {item.item.price > 0 ? `₹${item.item.price}` : "Free"}</p>
                    <p>{item.isFullDish ? "Full Dish" : "Side Dish"}</p>
                    <p>{item.isVeg === 1 ? "Vegetarian" : item.isVeg === 0 ? "Non-Vegetarian" : "Egg-Based"}</p>
                </div>
            ))}
        </div>
    );
}

export default Menu;
