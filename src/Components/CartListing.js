function CartListing(props) { 
    
    return(
        <div className="ItemListing image-shadow column is-one-third"> 
            <img src={props.image} alt={props.image} />
            <p>{props.processItemName(props.name)}</p>
            <p>In Cart: {props.amount}</p>
            <p id="price">Price: {props.price}</p>
            <button onClick={() => props.removeOne(props.name, props.price)}>Remove One</button>
        </div>
    )
}

export default CartListing;