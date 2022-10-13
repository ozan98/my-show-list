import {toast} from 'react-toastify'
import {FaSignInAlt} from 'react-icons/fa'
import {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import {login, reset} from '../features/auth/authSlice'

function Login() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })

    const {email, password} = formData

    const {user, isLoadingUser, isErrorUser, isSuccessUser, messageUser} = useSelector((state) => state.auth)

    useEffect(() => {
        if(isErrorUser) {
            toast.error(messageUser)
        }

        if(isSuccessUser || user) {
            navigate('/mylist')
        }

        dispatch(reset())
    },[user, isErrorUser, isSuccessUser, messageUser, navigate, dispatch])

    const onChange = (e) => {
        setFormData((prevState) => {
            return {
                ...prevState,
                [e.target.name]: e.target.value,
            }
        })
    }

    const onSubmit = (e) => {
        e.preventDefault()

        const userData = {
            email,
            password,
        }

        dispatch(login(userData))
    }

    return (
          <div className="loginregister-container">
                <section className="heading">
                    <h1><FaSignInAlt />Login</h1>
                    <p>Welcome Back</p>
                </section>

                <section>
                    <form onSubmit={onSubmit}>
                        <div>
                            <input 
                                type="email"
                                id="email"
                                name="email"
                                value={email}
                                placeholder="Enter email"
                                onChange={onChange}
                            />
                        </div>

                        <div>
                            <input 
                                type="password"
                                id="password"
                                name="password"
                                value={password}
                                placeholder="Enter password"
                                onChange={onChange}
                            />
                        </div>
                        <div>
                            <button type="submit">Submit</button>
                        </div>
                    </form>
                </section>
            </div>
    )
}

export default Login