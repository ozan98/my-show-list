import {toast} from 'react-toastify'
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

    const {user, isLoading, isError, isSuccess, message} = useSelector((state) => state.auth)

    useEffect(() => {
        if(isError) {
            toast.error(message)
        }

        if(isSuccess || user) {
            navigate('/mylist')
        }

        dispatch(reset())

    },[user, isError, isSuccess, message, navigate, dispatch])

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
            <section className="heading">
                <h1>Register</h1>
                <p>Please add all fields to register</p>
            </section>

            <section>
                <form onSubmit={onSubmit}>
                    <div className="form-group">
                    <div>
                        <input 
                            type="text"
                            id="name"
                            name="name"
                            value={name}
                            placeholder="Enter name"
                            onChange={onChange}
                        />
                    </div>

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
                        <input 
                            type="password"
                            id="password2"
                            name="password2"
                            value={password2}
                            placeholder="Enter password"
                            onChange={onChange}
                        />
                    </div>
                    </div>

                    <div className="form-group">
                        <button type="submit">Submit</button>
                    </div>
                </form>
            </section>
        </>
    )
}

export default Register