import {useEffect} from 'react'
import {useSelector} from 'react-redux'
import { useNavigate } from 'react-router'

function MyList() {
    const navigate = useNavigate()
    const {user} = useSelector((state) => state.auth)
    
    useEffect(() => {
        if(!user) {
            navigate('/login')
        }
    },[user])

    return (
        <div>My List</div>
    )
}

export default MyList