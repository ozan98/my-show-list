import React from 'react'

function ShowCard({id, name, image, score, releaseDate, overView, checkMedia}) {
    return(
        <>
            <div className="card-container">
                <img src={image} alt="" onClick={() => checkMedia(id)}/>
                <p>{name || null}</p>
                <p>{score}</p>
                <p>{releaseDate || null}</p>
                <p>{overView || null}</p>
            </div>
        </>
    )
}

export default ShowCard