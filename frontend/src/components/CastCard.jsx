
function CastCard({profileImg, name, character}) {

    return (
        <>
            <div className="profile-card-container">
                <img src={profileImg} alt="profile" />
                <p>{name}</p>
                <p>{character}</p>
            </div>
        </>
    )
}

export default CastCard