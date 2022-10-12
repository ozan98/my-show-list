import {Link, useNavigate } from 'react-router-dom'
import {FaSignInAlt, FaSignOutAlt, FaUser} from 'react-icons/fa'
import {useSelector, useDispatch} from 'react-redux'
import {logout, reset} from '../features/auth/authSlice'
import {resetMedia} from '../features/media/mediaSlice'


function NavBar() {
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
            <>
            <nav>
            <div className="navbar-container">
                <div>
                    <Link className="logo" to="/"> My Show List</Link>
                </div>

                <div className="menu">
                    <Link className="link" to="/mylist">My List</Link>
                    <Link className="link"  to="/discover">Discover</Link>
                    {user ? (
                        <>
                            <div className="link" onClick={onLogout}>
                                <FaSignOutAlt />Logout
                            </div>
                        </>
                    ) :
                    (
                        <>
                            <Link className="link"  to="/login">
                                <FaSignInAlt /> Login
                            </Link>

                            <Link className="link"  to="/register">
                                <FaUser /> Register
                            </Link>
                        </>
                    )}
                </div>
    

            <div className="hamburger">
                <span></span>
                <span></span>
                <span></span>
            </div>
            
            </div>
            </nav>
            
            </>
    )
}

export default NavBar