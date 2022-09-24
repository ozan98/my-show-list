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

    const [userListMedia, setUserListMedia] = useState([])

    useEffect(() => {
        dispatch(getAllMedia())
    },[])
    
    // const getmedias = () => {
    //     return medias.map((media) => {
    //         return <UserMediaCard
    //                     key={media._id}
    //                     id={media._id}
    //                     name={media.title}
    //                     image={util.getImage(media.imagePath)}
    //                     mediaType={media.mediaType}
    //                     score={media.score}
    //                     status={media.status}
    //                 />
    //     })
    // }

    const renderMedias = () => {
        return userListMedia.map((media) =>{
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



    useEffect(() => {
        if(!user) {
            navigate('/login')
        }
    },[user])

    const setMedia = (status)=> {
        const list = medias.filter((media) =>{
            return media.status === status
        })
        setUserListMedia(list)
    }

    const getMediaStatusList = (status) => {
        switch(status) {
            case 'currently watching':
                setMedia('currently watching')
                break;
            case 'completed':
                setMedia('completed')
                break;
            case 'on hold':
                setMedia('on hold')
                break;
            case 'dropped':
                setMedia('dropped')
                break;
            case 'plan to watch':
                setMedia('plan to watch')
                break;
            case 'all medias':
                setUserListMedia(medias)
            default:
                setUserListMedia(medias)

        }
    }

    return (
        <>
            <h1>My List</h1>
            <div className="my-list-buttons">
                <button onClick={()=> getMediaStatusList('all medias')}>All medias</button>
                <button onClick={() => getMediaStatusList('started')}>Currently watching</button>
                <button onClick={() => getMediaStatusList('started')}>Completed</button>
                <button onClick={() => getMediaStatusList('started')}>On hold</button>
                <button onClick={() => getMediaStatusList('started')}>Dropped</button>
                <button onClick={() => getMediaStatusList('started')}>Plan to watch</button>
            </div>
            {renderMedias()}
        </>
    )
}

export default MyList