import util from '../util/util'
import {useEffect} from 'react'
import SearchForm from '../components/SearchForm'
import ShowCard from '../components/ShowCard'
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
            return <ShowCard 
                            key={media.id}
                            id={media.id}
                            name={media.title || media.name}
                            image={util.getImage(media.poster_path)}
                            score={media.vote_average}
                            releaseDate={media.release_date}
                            overView={media.overview}
                            checkMedia={selectMedia}
                    />
        })
    }

    return (
        <>  
            <SearchForm />
            search list page
            {getSearchedMedia()}
            
        </>
    )
}

export default SearchListPage