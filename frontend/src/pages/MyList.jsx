import util from '../util/util'
import UserMediaCard from '../components/UserMediaCard'
import {useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { useNavigate } from 'react-router'
import {getAllMedia} from '../features/media/mediaSlice'

function MyList() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const {user} = useSelector((state) => state.auth)
    const {medias} = useSelector((state) => state.media)

    useEffect(() => {
        dispatch(getAllMedia())
    },[])
    
    const getmedias = () => {
        return medias.map((media) => {
            return <UserMediaCard
                        key={media._id}
                        id={media._id}
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

    return (
        <>
            My List
            {getmedias()}
        </>
    )
}

export default MyList