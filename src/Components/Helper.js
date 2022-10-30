export const getCartFromStorage = () => { 
    window.cart = JSON.parse(localStorage.getItem('cart')); 
    window.itemCount = JSON.parse(localStorage.getItem('itemCount')); 

    if (!window.cart) window.cart = {}; 
    if (!window.itemCount) window.itemCount = 0;
    return {"cart": window.cart, "itemCount": window.itemCount};
}

export const addToCart = (itemJSON) => { 
    let name = itemJSON["name"]["name-USen"];
    if (name in window.cart) { 
        window.cart[name]["amount"] += 1;
    } else { 
        window.cart[name] = {...itemJSON}; 
        window.cart[name]["amount"] = 1; 
    }

    window.itemCount += 1;
    localStorage.setItem('cart', JSON.stringify(window.cart));
    localStorage.setItem('itemCount', JSON.stringify(window.itemCount));
    updateCartCountDisplay();
    updateAmountDisplay(itemJSON["name"]["name-USen"]);
}

export const removeFromCart = (itemName) => { 
    if (!(itemName in window.cart)) return; // do nothing if item isn't in cart

    window.cart[itemName]["amount"] -= 1;
    // remove item from cart
    if (window.cart[itemName]["amount"] === 0)
        delete window.cart[itemName];

    window.itemCount -= 1;
    localStorage.setItem('cart', JSON.stringify(window.cart));
    localStorage.setItem('itemCount', JSON.stringify(window.itemCount));
    updateCartCountDisplay();
    updateAmountDisplay(itemName);
}

export const updateCartCountDisplay = () => { 
    let count = document.getElementById("cart"); 
    count.text = `Cart(${window.itemCount})`;
} 

export const updateAmountDisplay = (itemName) => { 
    let itemCount = 0;
    if (itemName in window.cart) itemCount = window.cart[itemName]["amount"];
    
    let inCartLabel = document.getElementById(itemName); 
    if (!document.body.contains(inCartLabel)) return;
    inCartLabel.innerText = `In Cart: ${itemCount}`;
    console.log(inCartLabel.innerText);
}

export const processItemName = (itemName) => { 
    // uppercase and remove underscores in the api
    let processed = itemName.charAt(0).toUpperCase();
    let character;
    for (let i = 1; i < itemName.length; i++) {         
        character = itemName[i] === "_" ? " " : itemName[i];
        processed += character;
    }
    return processed;
}

