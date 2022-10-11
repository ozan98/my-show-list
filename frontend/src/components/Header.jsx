import {Link, useNavigate } from 'react-router-dom'
import {FaSignInAlt, FaSignOutAlt, FaUser} from 'react-icons/fa'
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
            <div className="logo">
                <Link to="/"> My Show List</Link>
            </div>

            <nav>
                <ul className="nav-links">
                    <li>
                        <Link to="/mylist">My List</Link>
                    </li>
                    <li>
                        <Link to="/discover">Discover</Link>
                    </li>
                </ul>
            </nav>
            <div className="user-in-out">
            {user ? (
                        <>
                            <button className="logout-button" onClick={onLogout}>
                                <FaSignOutAlt />Logout
                            </button>
                        </>
                    ) :
                    (
                        <>
                            <Link to="/login">
                                <FaSignInAlt /> Login
                            </Link>

                            <Link to="/register">
                                <FaUser /> Register
                            </Link>
                        </>
                    )}
            </div>
        </header>
    )
}

export default Header