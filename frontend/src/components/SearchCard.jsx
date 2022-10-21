
function SearchCard({id, name, image, score, releaseDate, overView, checkMedia}) {
    
    return (
        <div className="search-card">
            <div className="img-container" onClick={()=> checkMedia(id)}>
                <img src={image}/>
            </div>
            <div className="media-info">
                <div className="name-overview">
                    <p>{name}</p>
                    <p>{overView}</p>
                </div>
                <div className="score-release">
                    <p>{Math.floor(score)} / 10</p>
                    <p>{releaseDate}</p>
                </div>
            </div>
        </div>
    )
}

export default SearchCard