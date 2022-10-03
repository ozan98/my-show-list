import util from '../util/util'
import ShowCard from '../components/ShowCard'
import {useNavigate} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import {addMedia} from '../features/media/mediaSlice'

import {useEffect} from 'react'


function Info() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const {currentChecking} = useSelector((state) => state.tmdb)
    const {user} = useSelector((state) => state.auth)

    const {id, title, name, poster_path, vote_average, release_date, overview, genres, creditData} = currentChecking
    
    useEffect(() => {
        if(!user) {
            navigate('/login')
        }
    },[user])

    const addMediaHandler = () => {
        const mediaData = {
            title: title || name,
            imagePath: poster_path,
            mediaType: !title ? 'tv' : 'movie',
            score: 5,
            status: 'started'
        }
        dispatch(addMedia(mediaData))
    }

    const getGenres = (genreList) => {
        console.log(genreList)
        return genreList.map((genre) => {
            return <p key={genre.id}>{genre.name}</p>
        })
    }

    return (
        <>
            
            <div className="media-info-container">
                <div className="media-description-container">
                    <img src={util.getImage(poster_path)} alt="movieInfo" />
                </div>
                <div className="media-overview-container">
                    <h1>{title || name}</h1>
                    <p>{release_date}</p>
                    {(genres) ? (getGenres(genres.mediaGenreList)) : null}

                    <div className="score-info-container">
                        
                    </div>
                </div>
            </div>
            {/* <ShowCard 
                key={id}
                id={id}
                name={title || name}
                image={util.getImage(poster_path)}
                score={vote_average}
                releaseDate={release_date}
                overView={overview}
            />
            {!currentChecking ? (<> </>) : ( <button onClick={addMediaHandler}> add </button> ) } */}
        </>
    )
}

export default Info