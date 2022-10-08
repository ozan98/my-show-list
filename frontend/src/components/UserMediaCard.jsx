function UserMediaCard({name, image, mediaType, score, status}) {
    
    return (
        <div className="user-media-card">
            <img src={image}/>
            <p>{name}</p>
            <p>{mediaType}</p>
            <p>{score}</p>
            <p>{status}</p>
        </div>
    )
}

export default UserMediaCard