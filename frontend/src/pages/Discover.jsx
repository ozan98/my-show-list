import React from 'react'
import ShowCard from '../components/ShowCard'
import TMDBservice from '../tmdbService/APIservice'

import {useState, useEffect} from 'react'


function Discover() {
    const [trendingMovieData, setTrendingMovieData] = useState([])
    const [trendingTvData, setTrendingTvData] = useState([])


    useEffect(() => {
        const trendingMovie = async () => {
            try {
                const data = await TMDBservice.getTrendingMovie()
                setTrendingMovieData(data)
                console.log(data)
            } catch (error) {
                console.log('getting trending data failed')
                console.log(error)
            }
        }

        const trendingTv = async () => {
            try {
                const data = await TMDBservice.getTrendingTv()
                setTrendingTvData(data)
                console.log(data)
            } catch (error) {
                console.log('getting trending data failed')
                console.log(error)
            }
        }
        trendingMovie()
        trendingTv()
    },[])

    const selectMedia = () => {
        console.log('selected')
    }
    // Get image of a tv or movie
    const getImage = (imagePath) => {
        const image = TMDBservice.getImage(imagePath)
        return image
    }

    // Getting component list of trending movies
    const getTrendingMovie = () => {
        return trendingMovieData.map((movie) => {
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
        return trendingTvData.map((tv) => {
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