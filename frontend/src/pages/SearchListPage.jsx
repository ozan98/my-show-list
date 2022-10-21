import util from '../util/util'
import {useEffect} from 'react'
import SearchForm from '../components/SearchForm'
import SearchCard from '../components/SearchCard'
import {useNavigate} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import {setCurrentChecking} from '../features/tmdb/tmdbSlice'

function SearchListPage() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const {searchedMedia} = useSelector((state) => state.tmdb)
    const {user} = useSelector((state) => state.auth)

    useEffect(() => {
        if(!user) {
            navigate('/login')
        }
    },[user])

    const selectMedia = (id) => {
        const [media] = searchedMedia.filter((media) => media.id === id)
        dispatch(setCurrentChecking(media))
        navigate('/info')

      
    }

    const getSearchedMedia = () => {
        return searchedMedia.map((media) => {
            return <SearchCard 
                            key={media.id}
                            id={media.id}
                            name={media.title || media.name}
                            image={util.getImage(media.poster_path)}
                            score={media.vote_average}
                            releaseDate={media.release_date || media.first_air_date}
                            overView={media.overview}
                            checkMedia={selectMedia}
                    />
        })
    }

    return (
        <>  
            <div className="searchlist-container">
            <SearchForm />
            {getSearchedMedia()}
            </div>
            
        </>
    )
}

export default SearchListPage