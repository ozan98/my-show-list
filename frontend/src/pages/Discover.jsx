import util from '../util/util'
import ShowCard from '../components/ShowCard'
import SearchForm from '../components/SearchForm'
import {useNavigate} from 'react-router-dom'
import {useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {
    getTrendingMovies, 
    getTrendingTvs, 
    setCurrentChecking,
    } from '../features/tmdb/tmdbSlice'

function Discover() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const {trendingMovies, trendingTvs, isError, message} = useSelector((state) => state.tmdb) 
    const {user} = useSelector((state) => state.auth)

    useEffect(() => {
        if(isError) {
            console.log(message)
        }

        if(!user) {
            navigate('/login')
        }else {
            dispatch(getTrendingMovies())
            dispatch(getTrendingTvs())
        }

    }, [user])

    const selectMedia = (id) => {
        const [mediaMovie] = trendingMovies.filter((media) => media.id === id)
        const [mediaTv] = trendingTvs.filter((media) => media.id === id)

        if(!mediaMovie){
            dispatch(setCurrentChecking(mediaTv))
            navigate('/info')
        } else {
            dispatch(setCurrentChecking(mediaMovie))
            navigate('/info')
        }
    }
    

    const getTrendingMedia = (list) => {
        return list.map((media) => {
            return <ShowCard
                        key={media.id}
                        id={media.id}
                        title={media.name || media.title}
                        image={util.getImage(media.poster_path)}
                        score={media.vote_average}
                        releaseDate={media.release_date}
                        checkMedia={selectMedia}
                    />
        })
    }

    return (
        <div className="discover-container">
            <section className="search-section">
                <SearchForm />
            </section>
                <h1 className="tag">Trending movies:</h1>
                <div className="trending-movie-container">
                    {getTrendingMedia(trendingMovies)}
                </div>

                <h1 className="tag">Trending Tv shows:</h1>
                <div className="trending-tv-container">
                    {getTrendingMedia(trendingTvs)}
                </div>
        </div>
    )
}

export default Discover