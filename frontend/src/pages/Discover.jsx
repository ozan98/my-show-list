import React from 'react'
import ShowCard from '../components/ShowCard'

import {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {getTrendingMovies, getTrendingTvs, reset} from '../features/tmdb/tmdbSlice'




function Discover() {
    const IMAGE_URL = "https://image.tmdb.org/t/p/w500"
    const dispatch = useDispatch()

    const {trendingMovies, trendingTvs, isLoading, isError, message} = useSelector((state) => state.tmdb) 
    
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