import util from '../util/util'
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {addMedia, getAllMedia} from '../features/media/mediaSlice'


function AddMediaForm({title, poster_path, media_type, toggleSelect}){
    const dispatch = useDispatch()
    const {medias} = useSelector((state) => state.media)

    const [formData, setFormData] = useState({
        score: 'Select Score',
        status: 'choose status'
    })

    const {score, status} = formData

    useEffect(() => {
        dispatch(getAllMedia)
    },[])

    const onChange = (e) => {
        setFormData((prevData)=> {
            return {
                ...prevData,
                [e.target.name]: e.target.value,
            }
        })
    }

    const onSubmit = (e) => {
        e.preventDefault()

        const data = {
            title: title,
            imagePath: poster_path,
            mediaType: media_type,
            score: score,
            status: status
        }

        const mediaExists = medias.filter((media) => {
            return media.title === data.title
        })

        if(mediaExists.length > 0){
            toast.error(`${data.title} is already in list`, {
                position: 'top-center',
                theme: 'dark',
            })
        }else {
            dispatch(addMedia(data))
            toast.success(`Succesfuly added ${data.title} to list`, {
                position: 'top-center',
                theme: 'dark',
            })
            toggleSelect();

        }
    }



    return (
        <>
        <div className="add-modal-bg">
            <div className="add-modal">
                <p>{title}</p>
                <form onSubmit={onSubmit}>
                    <label>Select Score:</label>
                    <select name="score" id="score" onChange={onChange}>
                        <option>No Score</option>
                        <option>(10) Masterpiece</option>
                        <option>(9) Great</option>
                        <option>(8) Very Good</option>
                        <option>(7) Good</option>
                        <option>(6) Fine</option>
                        <option>(5) Avarage</option>
                        <option>(4) Bad</option>
                        <option>(3) Very Bad</option>
                        <option>(2) Horrible</option>
                        <option>(1) Appalling</option>
                    </select>

                    <label>Choose Status</label>
                    <select name="status" id="status" onChange={onChange}>
                        <option>currently watching</option>
                        <option>completed</option>
                        <option>on hold</option>
                        <option>dropped</option>
                        <option>plan to watch</option>
                    </select>

                    <button className="" type="submit">add media</button>

                </form>
                <button className="" onClick={() => toggleSelect()}>Cancel Add</button>
            </div>
        </div>
        </>
    )
}

export default AddMediaForm