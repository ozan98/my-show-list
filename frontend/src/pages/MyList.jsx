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
    const [mediaTitleFilter, setMediaTitleFilter] = useState('')


    useEffect(() => {
        if(!user) {
            navigate('/login')
        }
        dispatch(getAllMedia())

    },[user, dispatch, navigate])

    const renderMedias = (list) => {
        const filteredList = filterList(list)

        return filteredList.map((media) =>{
            return <UserMediaCard
                        key={media._id}
                        id={media._id} 
                        name={media.title}
                        imagePath={util.getImage(media.imagePath)}
                        mediaType={media.mediaType}
                        score={media.score}
                        status={media.status}
                        selectToEdit={selectToEdit}
                    />
        })
    }

    const filterList = (list) => {

        let filteredList = []
        
        let nameFilteredList = list.filter((media) => {
            return media.title.toLowerCase().includes(mediaTitleFilter.toLowerCase())
        })
        
        for(let media of nameFilteredList ) {
            if(typeFilter === 'all' && mediaStatusFilter === 'all') {
                filteredList.push(media)
            } 
            if(typeFilter === 'all' && media.status === mediaStatusFilter){
                filteredList.push(media)
            }
            if(media.mediaType === typeFilter && media.status === mediaStatusFilter){
                filteredList.push(media)
            }
            if(media.mediaType === typeFilter && mediaStatusFilter === 'all'){
                filteredList.push(media)
            }
        }

        return filteredList
    }

    const selectToEdit = (id) => {
        console.log(id)
    }


    return (
        <>
            <h1>My List</h1>
            <div className="my-list-buttons">
                <button onClick={() => setTypeFilter('all')}>All Media</button>
                <button onClick={() => setTypeFilter('tv')}>Tv Shows</button>
                <button onClick={() => setTypeFilter('movie')}>Movies</button>
                <input 
                    type="mediaTitleFilter" 
                    name="mediaTypeFilter" 
                    id="mediaTitleFilter"
                    onChange={(e) => {setMediaTitleFilter(e.target.value)}} 
                    />
            </div>
            <div className="my-list-buttons">
                <button onClick={()=> setMediaStatusFilter('all')}>All medias</button>
                <button onClick={() => setMediaStatusFilter('currently watching')}>Currently Watching</button>
                <button onClick={() => setMediaStatusFilter('completed')}>Completed</button>
                <button onClick={() => setMediaStatusFilter('on hold')}>On Hold</button>
                <button onClick={() => setMediaStatusFilter('dropped')}>Dropped</button>
                <button onClick={() => setMediaStatusFilter('plan to watch')}>Plan To Watch</button>
            </div>
            {(medias) ? (renderMedias(medias)) : null}
        </>
    )
}

export default MyList