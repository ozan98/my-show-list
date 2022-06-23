import util from '../util/util'
import ShowCard from '../components/ShowCard'
import SearchForm from '../components/SearchForm'
import {useNavigate} from 'react-router-dom'
import {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {
    getTrendingMovies, 
    getTrendingTvs, 
    setCheckingMedia, 
    reset} from '../features/tmdb/tmdbSlice'

function Discover() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const {trendingMovies, trendingTvs, isLoading, isError, message} = useSelector((state) => state.tmdb) 

    useEffect(() => {
        if(isError) {
            console.log(message)
        }

        dispatch(getTrendingMovies())
        dispatch(getTrendingTvs())
    }, [])

    const selectMedia = (id) => {
        const [mediaMovie] = trendingMovies.filter((media) => media.id === id)
        const [mediaTv] = trendingTvs.filter((media) => media.id === id)

        if(mediaMovie.length === 0){
            dispatch(setCheckingMedia(mediaTv))
            navigate('/info')
        } else {
            dispatch(setCheckingMedia(mediaMovie))
            navigate('/info')
        }
    }
    
    // Getting component list of trending movies
    const getTrendingMovie = () => {
        return trendingMovies.map((movie) => {
            return <ShowCard
                        key={movie.id}
                        id={movie.id}
                        name={movie.title}
                        image={util.getImage(movie.poster_path)}
                        score={movie.vote_average}
                        releaseDate={movie.release_date}
                        overView={movie.overview}
                        checkMedia={selectMedia}
                    />
        })
    }

    // Getting component list of trending tv
    const getTrendingTv = () => {
        return trendingTvs.map((tv) => {
            return <ShowCard
                        key={tv.id}
                        id={tv.id}
                        name={tv.name}
                        image={util.getImage(tv.poster_path)}
                        score={tv.vote_average}
                        releaseDate={tv.release_date}
                        overView={tv.overview}
                        checkMedia={selectMedia}
                    />
        })
    }

    const getTrendingMedia = (list) => {
        return list.map((tv) => {
            return <ShowCard
                        key={tv.id}
                        id={tv.id}
                        name={tv.name || tv.title}
                        image={util.getImage(tv.poster_path)}
                        score={tv.vote_average}
                        releaseDate={tv.release_date}
                        overView={tv.overview}
                        checkMedia={selectMedia}
                    />
        })
    }

    return (
        <>
            Discover
            <section className="search-section">
                <SearchForm />
            </section>

            <section className="trending-section">
                <div className="trending-movie-continer">
                    {getTrendingMedia(trendingMovies)}
                </div>

                <div className="trending-tv-continer">
                    {getTrendingMedia(trendingTvs)}
                </div>
            </section>
        </>
    )
}

export default Discover