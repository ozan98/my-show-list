import {Link, useNavigate } from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import {logout, reset} from '../features/auth/authSlice'
import {resetMedia} from '../features/media/mediaSlice'


function Header() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    
    const {user} = useSelector((state) => state.auth)

    const onLogout = () => {
        dispatch(logout())
        dispatch(reset())
        dispatch(resetMedia())
        navigate('/')
    }

    return (
        <header className="header">
            <div>
                <Link to="/">My Show List</Link>
            </div>

            <div>
                <Link to="/mylist">My List</Link>
            </div>

            <div>
                <Link to="/discover">Discover</Link>
            </div>

            {!user ? 
            (
                <>
                <div>
                    <Link to="/login">Login</Link>
                </div>

                <div>
                    <Link to="/register">Register</Link>
                </div>
                </>
            ) 
            : 
            (
                <div>
                    <button onClick={onLogout}>Logout</button>
                </div>
            )
            }
        </header>
    )
}

export default Header