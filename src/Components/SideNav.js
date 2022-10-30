function SideNav() { 
    return( 
        <div className="column is-one-fourth" id="shop-side-bar">
            <a id="fish" className="side-link" href="../fish">Fish</a>
            <a id="bugs" className="side-link" href="../bugs">Bugs</a>
            <a id="songs" className="side-link" href="../songs">Songs</a>
            <a id="housewares" className="side-link" href="../houseware">House Wares</a>
            <a id="clothes" className="side-link" href="../clothes">Clothes</a>
            <a id="cart" className="side-link" href="../cart">{`Cart(${window.itemCount})`}</a>
        </div>
    )
}

export default SideNav;