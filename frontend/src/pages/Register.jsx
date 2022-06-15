import React from 'react'
import {useState, useEffect} from 'react'

function Register() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: '',
    })

    const {name, email, password, password2} = formData

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
                <h1>Register</h1>
                <p>Please add all fields to register</p>
            </section>

            <section>
                <form>
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