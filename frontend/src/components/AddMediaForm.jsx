import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import {useState} from 'react'
import {useDispatch} from 'react-redux'
import {addMedia} from '../features/media/mediaSlice'


function AddMediaForm({title, poster_path, media_type}){
    const dispatch = useDispatch()

    const [formData, setFormData] = useState({
        score: 'Select Score',
        status: 'choose status'
    })

    const {score, status} = formData

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
        
        // Check valid status input
        if(formData.status === 'choose status') {
            toast.error('Please select a status', {
                position: toast.POSITION.TOP_CENTER,
            })
        }

        // Check valid score input
        if(formData.score === 'Select Score'){
            toast.error('Please select a score', {
                position: 'top-center'
            })
        }
        
        const data = {
            title: title,
            imagePath: poster_path,
            mediaType: media_type,
            score: score,
            status: status
        }
        dispatch(addMedia(data))
    }



    return (
        <>
        <form onSubmit={onSubmit}>
             <select name="score" id="score" onChange={onChange}>
                 <option>Select Score</option>
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

             <select name="status" id="status" onChange={onChange}>
                 <option>choose status</option>
                 <option>currently watching</option>
                 <option>completed</option>
                 <option>on hold</option>
                 <option>dropped</option>
                 <option>plan to watch</option>
             </select>

             <button type="submit">add media</button>

        </form>
        <ToastContainer />
        </>
    )
}

export default AddMediaForm