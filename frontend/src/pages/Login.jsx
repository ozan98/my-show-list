import React from 'react'
import {useState} from 'react'

function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })

    const {email, password} = formData

    const onChange = (e) => {
        setFormData((prevState) => {
            return {
                ...prevState,
                [e.target.name]: e.target.value,
            }
        })
    }

    return (
        <>
            <section className="heading">
                <h1>Login</h1>
                <p>Please add all fields to login</p>
            </section>

            <section>
                <form>
                    <div className="form-group">
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
                    </div>

                    <div className="form-group">
                        <button type="submit">Submit</button>
                    </div>
                </form>
            </section>
        </>
    )
}

export default Login