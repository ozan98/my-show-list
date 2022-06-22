import React from 'react'
import ShowCard from '../components/ShowCard'

import {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {getTrendingMovies, getTrendingTvs, getSearchedMedia, reset} from '../features/tmdb/tmdbSlice'




function Discover() {
    const IMAGE_URL = "https://image.tmdb.org/t/p/w500"
    const dispatch = useDispatch()

    const {trendingMovies, trendingTvs, searchedMedia, isLoading, isError, message} = useSelector((state) => state.tmdb) 
    const [searchString, setSearchString] = useState('')

    useEffect(() => {
        if(isError) {
            console.log(message)
        }

        dispatch(getTrendingMovies())
        dispatch(getTrendingTvs())

        return () => {
            dispatch(reset())
        }

    }, [])

    const selectMedia = () => {
        console.log('selected')
    }
    // Get image of a tv or movie
    const getImage = (imagePath) => {
        return `${IMAGE_URL}${imagePath}`
    }
    
    const handleSearch = (e) => {
        setSearchString(e.target.value)
        console.log(searchString)
    }

    const search = (e) => {
        e.preventDefault()
        dispatch(getSearchedMedia(searchString))
        console.log(searchedMedia)

    }

    // Getting component list of trending movies
    const getTrendingMovie = () => {
        return trendingMovies.map((movie) => {
            return <ShowCard
                        key={movie.id}
                        name={movie.title}
                        image={getImage(movie.poster_path)}
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
                        name={tv.name}
                        image={getImage(tv.poster_path)}
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
            <form onSubmit={search}>
                <input 
                    type="text"
                    id="search"
                    name="search"
                    value={searchString}
                    onChange={handleSearch}
                     />
                <button type="submit">Search</button>
            </form>

            <div className="trending-movie-continer">
            {getTrendingMovie()}
            </div>
            <div className="trending-tv-continer">
            {getTrendingTv()}
            </div>
        </>
    )
}

export default Discover