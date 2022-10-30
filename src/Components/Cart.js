import React, { useEffect, useState } from "react";
import { getCartFromStorage, removeFromCart, processItemName } from "./Helper";
import CartListing from "./CartListing"; 
import SideNav from "./SideNav"; 

function Cart() { 
    const [totalCost, setTotalCost] = useState(0);
    const [currentCart, setCurrentCart] = useState({});

    useEffect(() => { 
        window.cart = getCartFromStorage()["cart"];
        window.itemCount = getCartFromStorage()["itemCount"];
        let cost = 0; 
        for (let item of Object.keys(window.cart)) { 
            cost += window.cart[item]["amount"] * window.cart[item]["price"]
        }

        setTotalCost(cost);
        setCurrentCart(window.cart);
    }, [])

    function removeOneFromCart(itemName, itemPrice) { 
        removeFromCart(itemName);
        setCurrentCart(window.cart);
        setTotalCost(totalCost - itemPrice);
    }


    function checkout() { 
        let order = "Your order is: \n"; 
        for (let item of Object.keys(window.cart)) {
            let amount = window.cart[item]["amount"]; 
            let itemName = processItemName(window.cart[item]["name"]["name-USen"]);
            order += `${amount}x ${itemName}\n`;
        }

        alert(`Thank you for buying. \n ${order}`);
        window.cart = {};
        window.itemCount = 0;
        setCurrentCart({}); 
        setTotalCost(0);

        localStorage.setItem('cart', JSON.stringify(window.cart));
        localStorage.setItem('itemCount', JSON.stringify(window.itemCount));
    }

    return(
        <div className="Cart">
            <div className="columns"> 
                <SideNav />
                <div className="columns is-multiline is-three-thirds">  
                    { 
                        Object.keys(currentCart).map((item) => (
                            <CartListing key={currentCart[item]["name"]["name-USen"]}
                                        amount={currentCart[item]["amount"]}
                                        image={currentCart[item]["image_uri"]}
                                        name={currentCart[item]["name"]["name-USen"]}
                                        price={currentCart[item]["price"]}
                                        removeOne={removeOneFromCart}
                                        processItemName={processItemName}> 
                            </CartListing>
                        ))
                    } 
                </div>
            </div>

            <div className="column is-three-fourths"> 
                <h1 id="totalCost">Total Cost: {totalCost}</h1>
                <button onClick={() => checkout()}>Buy</button>
            </div>

        </div>
    )
}

export default Cart;