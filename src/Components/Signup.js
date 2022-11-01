import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Signup(props) {

    const [credentials, setCredentials] = useState({ name: "", email: "", password: "" })
    let navigate = useNavigate();

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }



    const submit = async (e) => {
        console.log('submit')
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/createuser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password })
        });
        const json = await response.json()
        console.log(json);
        if (json.success) {
            console.log(json.success)

            // Save the auth token and redirect
            localStorage.setItem('token', json.authtoken);
            console.log('bhai signup ho gaya successfully')
            navigate("/");
            props.showAlert('User Created successfully', 'success')


        }
        else {
            props.showAlert('Invalid credential', 'danger');
        }
    }





    return (
        <div className='container'>
            <form onSubmit={submit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" onChange={onChange} name="name" className="form-control" id="name" aria-describedby="emailHelp" required />

                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" name="email" onChange={onChange} className="form-control" id="email" aria-describedby="emailHelp" required />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" onChange={onChange} name="password" className="form-control" id="password" minLength={5} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" name='cpassword' id="cpassword" minLength={5} required />
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}
