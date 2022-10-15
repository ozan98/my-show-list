import util from '../util/util'
import UserMediaCard from '../components/UserMediaCard'
import {FaSearch} from 'react-icons/fa'
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
                        title={media.title}
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
        <div className="mylist-container">
            <div className="button-mobile-container mobile-container-active">
                <div className="type-button">
                    <div onClick={() => setTypeFilter('all')}>All Media</div>
                    <div onClick={() => setTypeFilter('tv')}>Tv Shows</div>
                    <div onClick={() => setTypeFilter('movie')}>Movies</div>
                </div>
                <div className="status-button">
                    <div className="is-active" onClick={()=> setMediaStatusFilter('all')}>All</div>
                    <div onClick={() => setMediaStatusFilter('currently watching')}>Currently Watching</div>
                    <div onClick={() => setMediaStatusFilter('completed')}>Completed</div>
                    <div onClick={() => setMediaStatusFilter('on hold')}>On Hold</div>
                    <div onClick={() => setMediaStatusFilter('dropped')}>Dropped</div>
                    <div onClick={() => setMediaStatusFilter('plan to watch')}>Plan To Watch</div>
                </div>
                    <input 
                    className="search-bar"
                    type="mediaTitleFilter" 
                    name="mediaTypeFilter" 
                    id="mediaTitleFilter"
                    placeholder="Search media"
                    onChange={(e) => {setMediaTitleFilter(e.target.value)}} 
                    />
                    <FaSearch className="search-icon"/>
                
            </div>

            
    
            <div className="cards">
                {(medias) ? (renderMedias(medias)) : null}
            </div>
            
        </div>
    )
}

export default MyList