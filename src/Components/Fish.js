import React, { useState, useEffect} from 'react'; 
import '../App.css';
import FishListing from './FishListing';
import PageNavForm from './PageNavForm';
import SideNav  from './SideNav';
import { addToCart, getCartFromStorage, removeFromCart, processItemName} from './Helper';
import { useSearchParams } from "react-router-dom"; 

function Fish() { 
    const LAST_PAGE = 8; 
    const FIRST_PAGE = 1; 

    const [fishListings, setFishListings] = useState({}); 
    const [params] = useSearchParams();
    
    function getStart() { 
        let pageNumber = params.get('pageNumber'); 
        console.log(`page number: ${pageNumber}`);
        if (!pageNumber) return FIRST_PAGE;
        if (parseInt(pageNumber) === 0) return FIRST_PAGE; 

        if (parseInt(pageNumber) <= 8) 
            return parseInt(pageNumber) * 10 - 9;
        return LAST_PAGE * 10 - 9; 
    }

    function getEnd() { 
        return getStart() + 9;
    }

    useEffect(() => { 
        getData();
        window.cart = getCartFromStorage()["cart"];
        window.itemCount = getCartFromStorage()["itemCount"];
    }, [])

    const getData = async() => { 
        let url; 
        let data;
        let fishHash = {};

        for (let fish = getStart(); fish <= getEnd(); fish++) { 
            url = await fetch(`http://acnhapi.com/v1/fish/${fish}`);
            data = await url.json();
            // check for price, set to 1000 for default 
            if (!("price" in data)) data["price"] = 1000;
            fishHash[fish] = data;
            
        }

        await setFishListings(fishHash);
        await console.log(fishHash);
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

            <PageNavForm category="fish" /> 
        </div>
        
    )
}

export default Fish;