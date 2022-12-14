import util from '../util/util'
import {useState} from 'react'
import EditMediaForm from './EditMediaForm'
import {useDispatch} from 'react-redux'
import {deleteMedia, editMedia} from '../features/media/mediaSlice'

function UserMediaCard({id, title, imagePath, mediaType, score, status}) {

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
            <img src={util.getImage(imagePath)}/>
            <div className="movie-info">
                <p>{title}</p>
                <p>{mediaType}</p>
                <p>{score}</p>
                <p>{status}</p>
            </div>
            <div className="edit-btn">
                {(isSelected) ? (renderEditForm()) : (renderEditButton())}
            </div>
            
        </div>
    )
}

export default UserMediaCard