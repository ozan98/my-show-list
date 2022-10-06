import util from '../util/util'
import UserMediaCard from '../components/UserMediaCard'
import {useEffect, useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { useNavigate } from 'react-router'
import {getAllMedia} from '../features/media/mediaSlice'

function MyList() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const {user} = useSelector((state) => state.auth)
    const {medias} = useSelector((state) => state.media)

    const [typeFilter, setTypeFilter] = useState('all')
    const [mediaStatusFilter, setMediaStatusFilter] = useState('all')

    console.log(typeFilter)
    console.log(mediaStatusFilter)

    useEffect(() => {
        if(!user) {
            navigate('/login')
        }
        dispatch(getAllMedia())

    },[user])

    const renderMedias = (list) => {

        const filteredList = filterList(list)

        return filteredList.map((media) =>{
            return <UserMediaCard
                        key={media._id}
                        id={media.id} 
                        name={media.title}
                        image={util.getImage(media.imagePath)}
                        mediaType={media.mediaType}
                        score={media.score}
                        status={media.status}
                    />
        })
    }

    const filterList = (list) => {

        if(typeFilter === 'tv' || typeFilter === 'movie'){
            return medias.filter((media) =>{
                return ((media.status === mediaStatusFilter) && (media.mediaType === typeFilter))
                        || (media.mediaType === typeFilter)
            })
        }else {
            return medias.filter((media) =>{
                return  (mediaStatusFilter === 'all') || (media.status === mediaStatusFilter)
            })
        }


    }


    return (
        <>
            <h1>My List</h1>
            <div className="my-list-buttons">
                <button onClick={() => setTypeFilter('all')}>All Media</button>
                <button onClick={() => setTypeFilter('tv')}>Tv Shows</button>
                <button onClick={() => setTypeFilter('movie')}>Movies</button>
            </div>
            <div className="my-list-buttons">
                <button onClick={()=> setMediaStatusFilter('all')}>All medias</button>
                <button onClick={() => setMediaStatusFilter('currently watching')}>Currently Watching</button>
                <button onClick={() => setMediaStatusFilter('completed')}>Completed</button>
                <button onClick={() => setMediaStatusFilter('on hold')}>On Hold</button>
                <button onClick={() => setMediaStatusFilter('dropped')}>Dropped</button>
                <button onClick={() => setMediaStatusFilter('plan to watch')}>Plan To Watch</button>
            </div>
            {renderMedias(medias)}
        </>
    )
}

export default MyList