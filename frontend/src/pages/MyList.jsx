import util from '../util/util'
import UserMediaCard from '../components/UserMediaCard'
import {useEffect} from 'react'
import {useSelector} from 'react-redux'
import { useNavigate } from 'react-router'

function MyList() {
    const navigate = useNavigate()
    const {user} = useSelector((state) => state.auth)
    const {medias} = useSelector((state) => state.media)
    
    const getmedias = () => {
        return medias.map((media) => {
            return <UserMediaCard
                        key={media.id}
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