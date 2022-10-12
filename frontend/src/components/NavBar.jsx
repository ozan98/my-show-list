import {Link, useNavigate } from 'react-router-dom'
import {FaSignInAlt, FaSignOutAlt, FaUser} from 'react-icons/fa'
import {useSelector, useDispatch} from 'react-redux'
import {logout, reset} from '../features/auth/authSlice'
import {resetMedia} from '../features/media/mediaSlice'
import {useState, useEffect} from 'react'


function NavBar() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    
    const {user} = useSelector((state) => state.auth)
    const [mobileMenuToggle, setMobileToggle] = useState(true)

    useEffect(() => {
        return () => {
            setMobileToggle(false)
        }
    },[])

    const onLogout = () => {
        dispatch(logout())
        dispatch(reset())
        dispatch(resetMedia())
        navigate('/')
    }

    const toggleMenu = () => {
        if(mobileMenuToggle === false) {
            setMobileToggle(true)
        } else {
            setMobileToggle(false)
        }
    }

    return (
            <>
            <nav className="navbar">
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
    

            <div className="hamburger" onClick={toggleMenu}>
                <span></span>
                <span></span>
                <span></span>
            </div>
            
            </div>
            </nav>




            <nav className={`mobile-nav ${mobileMenuToggle === true ? "mobile-nav-active" : ""}`}>
                    <Link className="mobile-link" onClick={() => setMobileToggle(false)} to="/mylist">My List</Link>
                    <Link className="mobile-link" onClick={() => setMobileToggle(false)} to="/discover">Discover</Link>
                    {user ? (
                        <>
                            <div className="mobile-link" onClick={() => setMobileToggle(false)} onClick={onLogout}>
                                <FaSignOutAlt />Logout
                            </div>
                        </>
                    ) :
                    (
                        <>
                            <Link className="mobile-link" onClick={() => setMobileToggle(false)} to="/login">
                                <FaSignInAlt /> Login
                            </Link>

                            <Link className="mobile-link" onClick={() => setMobileToggle(false)} to="/register">
                                <FaUser /> Register
                            </Link>
                        </>
                    )}
            </nav>
            
            </>
    )
}

export default NavBar