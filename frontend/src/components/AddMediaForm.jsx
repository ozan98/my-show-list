import {useState} from 'react'
import {useDispatch} from 'react-redux'
import {addMedia} from '../features/media/mediaSlice'


function AddMediaForm({title, poster_path, media_type}){
    const dispatch = useDispatch()

    const [formData, setFormData] = useState({
        name: '',
        scoreStr: 0,
        status: ''
    })

    const {scoreStr, status} = formData

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
        const score = parseInt(scoreStr)
        const data = {
            title: title,
            imagePath: poster_path,
            mediaType: media_type,
            score: score,
            status: status
        }
        dispatch(addMedia(data))
        console.log(data)
    }



    return (
        <>
        <form onSubmit={onSubmit}>
            
            <input 
                type="number"
                name="scoreStr"
                id="score"
                value={scoreStr}
                placeholder="score of media"
                onChange={onChange}
             />
             <select name="status" id="status" onChange={onChange}>
                 <option>currently watching</option>
                 <option>completed</option>
                 <option>on hold</option>
                 <option>dropped</option>
                 <option>plan to watch</option>
             </select>

             <button type="submit">add media</button>

        </form>
        </>
    )
}

export default AddMediaForm