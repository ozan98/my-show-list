import util from '../util/util'
import CastCard from '../components/CastCard'
import AddMediaForm from '../components/AddMediaForm'
import {useNavigate} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import {addMedia} from '../features/media/mediaSlice'
import {useState} from 'react'

import {useEffect} from 'react'


function Info() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const {currentChecking} = useSelector((state) => state.tmdb)
    const {user} = useSelector((state) => state.auth)

    const [selectAdd, setSelectAdd] = useState(false)

    const {id, 
        title,
        name,
        poster_path, 
        vote_average, 
        release_date, 
        overview,
        popularity,
        genres, 
        creditData,
        media_type,
        first_air_date,
        } = currentChecking
    
    useEffect(() => {
        if(!user) {
            navigate('/login')
        }
    },[user])

    const renderAddForm = () => {
        return <AddMediaForm title={title || name} poster_path={poster_path} media_type={media_type} toggleSelect={setSelectAdd}/>

    }

    const renderAddButton = () => {
        return <button onClick={() => setSelectAdd(true)}>Add Media</button>
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

                <div className="media-img-container">
                    <img src={util.getImage(poster_path)} alt="movieInfo" />

                    <div className="media-score-container">
                        <p>Score</p>
                        <p>{Math.floor(vote_average)} / 10</p>
                        <p>Popularity</p>
                        <p>{popularity}</p>
                        <p>Media Type</p>
                        <p>{media_type}</p>

                        {(selectAdd)? renderAddForm() : renderAddButton()}
                    </div>
                </div>

                <div className="media-title-container">
                    <div className="media-description-container">
                        <h1>{title || name}</h1>
                        <p className="release-date">{release_date || first_air_date}</p>
                        <div className="genres">
                            {(genres) ? (getGenres(genres.mediaGenreList)) : null}
                        </div>
                    </div>
        
                    <div className="media-overview-container">
                        <p>{overview}</p>
                    </div>
                    <p className="label">Top paid actors:</p>
                    <div className="media-cast-container">
                        {creditData ? getCast(creditData.cast.slice(0,10)) : null}
                    </div>
                </div>

            </div>
        </>
    )
}

export default Info