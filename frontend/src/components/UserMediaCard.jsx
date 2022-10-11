import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import {useState} from 'react'
import EditMediaForm from './EditMediaForm'
import {useDispatch} from 'react-redux'
import {deleteMedia, editMedia} from '../features/media/mediaSlice'

function UserMediaCard({id, title, imagePath, mediaType, score, status, selectToEdit}) {

    const dispatch = useDispatch()

    const [isSelected, setIsSelected] = useState(false) 
    

    const cancelEdit = () => {
        setIsSelected(false)
    }
    
    const removeMedia = (id) => {
        setIsSelected(false)
        dispatch(deleteMedia(id))
    }

    const edit = (media) => {
        setIsSelected(false)
        dispatch(editMedia(media))
    }

    const renderEditButton = () => {
        return (
            <button onClick={() => setIsSelected(true)}>Edit</button>
        )
    }

    const renderEditForm = () => {
        return (
            <EditMediaForm
                        id={id}
                        title={title}
                        imagePath={imagePath}
                        mediaType={mediaType}
                        cancelEdit={cancelEdit}
                        removeMedia={removeMedia}
                        edit={edit}
            />
        )
    }
    
    return (
        <div className="user-media-card">
            <img src={imagePath}/>
            <p>{title}</p>
            <p>{mediaType}</p>
            <p>{score}</p>
            <p>{status}</p>
            {(isSelected) ? (renderEditForm()) : (renderEditButton())}
            <ToastContainer/>
        </div>
    )
}

export default UserMediaCard