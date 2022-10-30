import React, { useState, useEffect} from 'react'; 
import '../App.css';
import FishListing from './FishListing';
import PageNavForm from './PageNavForm';
import SideNav  from './SideNav';
import { addToCart, getCartFromStorage, removeFromCart, processItemName} from './Helper';
import { useSearchParams } from "react-router-dom"; 


// component that renders a shop for a category of item, fish is the default example
function CategoryShop(props) { 
    const LAST_PAGE = props.last; 
    const FIRST_PAGE = 1; 

    const [fishListings, setFishListings] = useState({}); 
    const [params] = useSearchParams();
    
    function getStart() { 
        let pageNumber = params.get('pageNumber'); 
        if (!pageNumber) return FIRST_PAGE;
        if (parseInt(pageNumber) === 0) return FIRST_PAGE; 

        if (parseInt(pageNumber) <= LAST_PAGE) 
            return parseInt(pageNumber) * 10 - 9;
        return LAST_PAGE * 10 - 9; 
    }

    function getEnd() { 
        let SONG_LIMIT = 95;
        if (props.category === "songs") { 
            if (getStart() + 9 < 95) return getStart() + 9; 
            return SONG_LIMIT;
        }
        return getStart() + 9;
    }

    useEffect(() => { 
        getData();
        window.cart = getCartFromStorage()["cart"];
        window.itemCount = getCartFromStorage()["itemCount"];
    }, [])

    const getDataNotHouseWares = async() => { 
        let fishHash = {};
        for (let fish = getStart(); fish <= getEnd(); fish++) { 
            let url = await fetch(`http://acnhapi.com/v1/${props.category}/${fish}`);
            let data = await url.json();
            if (!("price" in data)) data["price"] = 1000;
            fishHash[fish] = data;
        }
        return fishHash;
    }

    const getHouseWares = async() => { 
        let url = await fetch('http://acnhapi.com/v1/houseware'); 
        let json = await url.json(); 
        let houseWares = {}
        
        for (let i = getStart(); i < getEnd(); i++) {
            // get the first variant of the houseware
            houseWares[i] = json[Object.keys(json)[i]][0];
            // set the price for houseWares with no ["price"] key
            houseWares[i]["price"] = json[Object.keys(json)[i]][0]["sell-price"];
        }
        return houseWares;
    }

    const getData = async() => { 
        let fishHash = {};

        if (props.category !== "houseware") { 
            fishHash = await getDataNotHouseWares();
        } else { 
            fishHash = await getHouseWares();
        }

        await setFishListings(fishHash);
        await console.log([params.get("pageNumber"), props.last, getStart(), getEnd()]);
    }

    return( 
        <div className="Fish"> 
            <div className="columns"> 
                <SideNav />

                <div className="columns is-multiline is-three-thirds"> 
                    { 
                        Object.entries(fishListings).map(([index, fish]) => (
                            <FishListing key={index}
                                         fish={fish}
                                         id={index}
                                         cost={fish["price"]}
                                         addToCart={addToCart}
                                         removeFromCart={removeFromCart}
                                         processItemName={processItemName}>
                            </FishListing>
                        ))
                    }
                </div>
            </div>

            <PageNavForm category={props.category} /> 
        </div>
        
    )
}

export default CategoryShop;