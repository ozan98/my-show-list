import {toast} from 'react-toastify'
import {FaUser} from 'react-icons/fa'
import {useNavigate} from 'react-router-dom'
import {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {register, reset} from '../features/auth/authSlice'

function Register() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: '',
    })

    const {name, email, password, password2} = formData

    const navigate = useNavigate()
    const dispatch = useDispatch()

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

        if(password !== password2) {
            toast.error('Password do not match')
        }else {
            const userData = {
                name,
                email,
                password,
            }
            dispatch(register(userData))
        }
    }

    return (
        <>
            <div className="container">
                <section className="heading">
                    <h1><FaUser />Register</h1>
                    <p>Please create an account</p>
                </section>

                <section className="form">
                    <form onSubmit={onSubmit}>
                        <div className="form-group">
                            <input 
                                type="text"
                                id="name"
                                name="name"
                                value={name}
                                placeholder="Enter name"
                                onChange={onChange}
                            />
                        </div>

                        <div className="form-group">
                            <input 
                                type="email"
                                id="email"
                                name="email"
                                value={email}
                                placeholder="Enter email"
                                onChange={onChange}
                            />
                        </div>

                        <div className="form-group">
                            <input 
                                type="password"
                                id="password"
                                name="password"
                                value={password}
                                placeholder="Enter password"
                                onChange={onChange}
                            />
                        </div>

                        <div className="form-group">
                            <input 
                                type="password"
                                id="password2"
                                name="password2"
                                value={password2}
                                placeholder="Enter password"
                                onChange={onChange}
                            />
                        </div>
                        
                        <div className="form-group">
                            <button type="submit">Submit</button>
                        </div>
                    </form>
                </section>
            </div>
        </>
    )
}

export default Register