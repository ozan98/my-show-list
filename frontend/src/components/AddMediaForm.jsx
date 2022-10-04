import {useState} from 'react'

function AddMediaForm(){
    const [formData, setFormData] = useState({
        name: '',
        score: null,
        status: ''
    })

    return (
        <>
        <form action="">
            <input type="input" name="name" id="name" />
        </form>
        </>
    )
}

export default AddMediaForm