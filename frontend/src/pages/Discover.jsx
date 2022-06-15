import React from 'react'
import ShowCard from '../components/ShowCard'
import TMDBservice from '../tmdbService/APIservice'

import {useState, useEffect} from 'react'


function Discover() {
    const [trendingData, setTrendingData] = useState([])


    useEffect(() => {
        const trending = async () => {
            try {
                const data = await TMDBservice.getTrending()
                setTrendingData(data)
                console.log(data)
            } catch (error) {
                console.log('getting trending data failed')
                console.log(error)
            }
        }
        trending()
    },[])

    const getTrending = () => {
        return trendingData.map((show) => {
            return <ShowCard
                        key={show.id}
                        name={show.name}
                    />
        })
    }

    return (
        <>
            Discover
            {getTrending()}
        </>
    )
}

export default Discover