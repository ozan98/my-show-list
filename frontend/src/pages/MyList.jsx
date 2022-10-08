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
        let filteredList = []
        let nameFilteredList
        let statusFilteredList

        nameFilteredList = medias.filter((media) => {
            return media.title.toLowerCase().includes(mediaTitleFilter.toLowerCase())
        })

        if(typeFilter === 'tv' || typeFilter === 'movie'){
            statusFilteredList = nameFilteredList.filter((media) =>{
                return ((media.status === mediaStatusFilter) && (media.mediaType === typeFilter))
                        || (media.mediaType === typeFilter)
            })
        }else {
            statusFilteredList = nameFilteredList.filter((media) =>{
                return  (mediaStatusFilter === 'all') || (media.status === mediaStatusFilter)
            })
        }
        console.log(mediaStatusFilter)
        console.log(nameFilteredList)

        for(let i = 0; i < statusFilteredList.length; i++){
            for(let j = 0; j < nameFilteredList.length; j++) {
                if(statusFilteredList[i].title === nameFilteredList[j].title){
                    filteredList.push(statusFilteredList[i])
                }
            }
        }
        console.log(filteredList)
        
        return statusFilteredList

        

        // return removeDuplicate(statusFilteredList, nameFilteredList)
    }

    const removeDuplicate = (arr1, arr2) => {
        // console.log(arr1Map)
        const list = arr1.concat(arr2)
        const filteredList = []
        const map = {}

        console.log(arr1)
        console.log('arr1')
        console.log(arr2)
        console.log('arr2')
        console.log(list)
        console.log('list')

        for(let i = 0; i < list.length; i++) {
            if(!map[list[i].title]) {
                filteredList.push(list[i])
            }
            map[list[i].title] = i
        }
        // console.log(list)
        // console.log('list')
        // console.log(filteredList)
        // console.log('filtered')
        // console.log(map)
        

         return filteredList
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
            {renderMedias(medias)}
        </>
    )
}

export default MyList