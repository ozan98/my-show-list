import React from 'react'

function ShowCard({name, image}) {
    return(
        <>
            <div className="card-container">
            <p>{name}</p>
            <img src={image} alt="" />
            </div>
        </>
    )
}

export default ShowCard