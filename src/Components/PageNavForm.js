import React, { useState } from 'react'; 
function PageNavForm(props) { 
    const [pageNumber, setPageNumber] = useState(0); 

    const handlePageNumber = (e) => { 
        setPageNumber(e.target.value);
    } 

    return( 
        <div> 
            <p id="pageNumber">Page Number: </p>
            <input id="pageNumber" type="number" onChange={handlePageNumber}/>
            <a href={`/${props.category}?pageNumber=${pageNumber}`}>Go</a>
        </div>
    )
}

export default PageNavForm;