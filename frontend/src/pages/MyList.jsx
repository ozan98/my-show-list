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

    const [mobileSlider, setMobileSlider] = useState(false);


    useEffect(() => {
        if(!user) {
            navigate('/login')
        }
        dispatch(getAllMedia())

        // return () => {
        //     setMobileSlider(false)
        // }

    },[user, dispatch, navigate])

    const toggleMobileSlide = () => {
        if(mobileSlider === false) {
            setMobileSlider(true)
        } else {
            setMobileSlider(false)
        }
    }

    const typeToggle = (type) => {
        if(type === typeFilter){
            return true
        }else {
            return false
        }
    }

    const statusToggle = (status) => {
        if(status === mediaStatusFilter) {
            return true
        } else {
            return false
        }
    }

    const renderMedias = (list) => {
        const filteredList = filterList(list)

        return filteredList.map((media) =>{
            return <UserMediaCard
                        key={media._id}
                        id={media._id} 
                        title={media.title}
                        imagePath={media.imagePath}
                        mediaType={media.mediaType}
                        score={media.score}
                        status={media.status}
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

    const renderEmptyListMessage = () => {
        console.log('hi')
        return (
            <div>
                <p>It looks like your media list is empty</p>
                <p>Head over to discover page and add media to your list</p>
            </div>
        )
    }

    


    return (
        <div className="mylist-container">
            <div className="options">
                <button onClick={toggleMobileSlide}>search</button>
            </div>
            <div className={`button-mobile-container ${(mobileSlider) ? "mobile-container-active" : "" }`}>
                <button className="mobileX-btn" onClick={toggleMobileSlide}>X</button>
                <div className="type-button">
                    <div className={(typeToggle('all'))? "type-active" : ""} onClick={() => setTypeFilter('all')}>All Media</div>
                    <div className={(typeToggle('tv'))? "type-active" : ""} onClick={() => setTypeFilter('tv')}>Tv Shows</div>
                    <div className={(typeToggle('movies'))? "type-active" : ""} onClick={() => setTypeFilter('movie')}>Movies</div>
                </div>
                <div className="status-button">
                    <div className={(statusToggle('all')? "type-active" : "")} onClick={()=> setMediaStatusFilter('all')} >All</div>
                    <div className={(statusToggle('currently watching')? "type-active" : "")} onClick={() => setMediaStatusFilter('currently watching')}>Currently Watching</div>
                    <div className={(statusToggle('completed')? "type-active" : "")} onClick={() => setMediaStatusFilter('completed')}>Completed</div>
                    <div className={(statusToggle('on hold')? "type-active" : "")} onClick={() => setMediaStatusFilter('on hold')}>On Hold</div>
                    <div className={(statusToggle('dropped')? "type-active" : "")} onClick={() => setMediaStatusFilter('dropped')}>Dropped</div>
                    <div className={(statusToggle('plan to watch')? "type-active" : "")} onClick={() => setMediaStatusFilter('plan to watch')}>Plan To Watch</div>
                </div>
                    <input 
                    className="search-bar"
                    type="mediaTitleFilter" 
                    name="mediaTypeFilter" 
                    id="mediaTitleFilter"
                    placeholder="Search media"
                    onChange={(e) => {setMediaTitleFilter(e.target.value)}} 
                    />
                
            </div>

            
    
            <div className="cards">
                {(medias) ? (renderMedias(medias)) : null}
            </div>

            <div className="empty-message">
                {(medias.length < 1) ? (renderEmptyListMessage()) : null}
            </div>
            
        </div>
    )
}

export default MyList