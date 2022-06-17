import React from 'react'

function ShowCard({name, image, score, releaseDate, overView, checkMedia}) {
    return(
        <>
            <div className="card-container">
                <img src={image} alt="" onClick={checkMedia}/>
                <p>{name}</p>
                <p>{score}</p>
                <p>{releaseDate}</p>
                <p>{overView}</p>
            </div>
        </>
    )
}

export default ShowCard