import React from 'react'

function ShowCard({id, title, image, score, releaseDate, overView, checkMedia}) {
    return(
        <>
            <div className="card-container">
                <div className="img-container">
                    <img src={image} alt="" onClick={() => checkMedia(id)}/>
                </div>
                <div className="card-info">
                    <p>{`${score} / 10`}</p>
                    <p>{title}</p>
                    <p>{releaseDate}</p>
                </div>
            </div>
        </>
    )
}

export default ShowCard