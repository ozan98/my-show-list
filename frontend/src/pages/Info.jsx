import util from '../util/util'
import ShowCard from '../components/ShowCard'
import {useNavigate} from 'react-router-dom'
import {useSelector} from 'react-redux'

import {useEffect} from 'react'


function Info() {
    const navigate = useNavigate()

    const {currentChecking} = useSelector((state) => state.tmdb)
    const {id, title, name, poster_path, vote_average, release_date,overview} = currentChecking

    useEffect(() => {
        if(Object.keys(currentChecking).length === 0){
            navigate('/discover')
        }
    },[])
    return (
        <>
            info
            <ShowCard 
                key={id}
                id={id}
                name={title || name}
                image={util.getImage(poster_path)}
                score={vote_average}
                releaseDate={release_date}
                overView={overview}
            />
        </>
    )
}

export default Info