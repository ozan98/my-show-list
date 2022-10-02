import util from '../util/util'
import ShowCard from '../components/ShowCard'
import SearchForm from '../components/SearchForm'
import {useNavigate} from 'react-router-dom'
import {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {
    getTrendingMovies, 
    getTrendingTvs, 
    setCurrentChecking, 
    reset} from '../features/tmdb/tmdbSlice'

function Discover() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const {trendingMovies, trendingTvs, isLoading, isError, message} = useSelector((state) => state.tmdb) 
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
        return list.map((tv) => {
            return <ShowCard
                        key={tv.id}
                        id={tv.id}
                        image={util.getImage(tv.poster_path)}
                        score={tv.vote_average}
                        checkMedia={selectMedia}
                    />
        })
    }

    return (
        <>
            <section className="search-section">
                <SearchForm />
            </section>

            <section className="trending-section">
                <div className="trending-movie-continer">
                    {getTrendingMedia(trendingMovies.slice(0, 6))}
                </div>

                <div className="trending-tv-continer">
                    {getTrendingMedia(trendingTvs.slice(0, 6))}
                </div>
            </section>
        </>
    )
}

export default Discover