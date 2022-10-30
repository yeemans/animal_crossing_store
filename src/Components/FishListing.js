import {useEffect, useState} from "react";
function FishListing(props) { 
    const [amountInCart, setAmountInCart] = useState(0); 
    let fishName = props.fish["name"]["name-USen"]; 

    useEffect(() => { 
        if (fishName in window.cart) 
            setAmountInCart(window.cart[fishName]["amount"]);
    }, [fishName])

    return(
        <div className="FishListing column is-one-third"> 
            <div className="image-shadow"> 
                <img src={props.fish["image_uri"]} alt={props.fish["name"]["name-USen"]} />
            
                <h1>{props.processItemName(fishName)}</h1>
                <p id={props.fish["name"]["name-USen"]}>In Cart: {amountInCart} </p>
                <p>Cost: {props.cost}</p>
                <button onClick={() => props.addToCart(props.fish)}> Add </button>
                <button onClick={() => props.removeFromCart(props.fish["name"]["name-USen"])}> Remove </button>
            </div>
        </div>
    );
}

export default FishListing;