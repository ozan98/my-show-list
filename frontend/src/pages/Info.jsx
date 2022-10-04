import util from '../util/util'
import CastCard from '../components/CastCard'
import AddMediaForm from '../components/AddMediaForm'
import {useNavigate} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import {addMedia} from '../features/media/mediaSlice'

import {useEffect} from 'react'


function Info() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const {currentChecking} = useSelector((state) => state.tmdb)
    const {user} = useSelector((state) => state.auth)

    const {id, 
        title,
        name,
        poster_path, 
        vote_average, 
        release_date, 
        overview, 
        genres, 
        creditData,
        media_type,
        } = currentChecking
    
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

    const getCast = (castList) => {
        return castList.map((cast) => {
            return <CastCard
                    key={cast.id}
                    profileImg={util.getImage(cast.profile_path)}
                    name={cast.name}
                    character={cast.character}
                    />
        })
    }

    return (
        <>
            
            <div className="media-info-container">
                <div className="media-description-container">
                    <img src={util.getImage(poster_path)} alt="movieInfo" />
                </div>
                <div className="media-title-container">
                    <h1>{title || name}</h1>
                    <p>{release_date}</p>
                    {(genres) ? (getGenres(genres.mediaGenreList)) : null}

                    <div className="media-score-container">
                        <p>{vote_average}</p>
                        <AddMediaForm title={title || name} poster_path={poster_path} media_type={media_type}/>
                    </div>
                    <div className="media-overview-container">
                        <p>{overview}</p>
                    </div>
                    <div className="media-cast-container">
                        {creditData ? getCast(creditData.cast.slice(0,15)) : null}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Info