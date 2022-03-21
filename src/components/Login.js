import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";

const host = "http://localhost:5000";

const Login = (props) => {
    let history = useNavigate();
    const [cardential, setcardential] = useState({ email: "", password: "" })
    const handlesubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`${host}/api/auth/login`, {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({ "email": cardential.email[0], "password": cardential.password[0] })

        });


        const json = await response.json();
        if (json.sucess) {
            //save the auth token
            localStorage.setItem('token', json.AuthToken);
            history('/')
            props.showAlert("login sucessfully", 'success');

        } else {
            props.showAlert("please enter correct cardential", 'danger');
        }
    }
    const OnChange = e => {
        setcardential({ ...cardential, [e.target.name]: [e.target.value] });
    };
    return (
        <><form onSubmit={handlesubmit}>
            <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                <input type="email" className="form-control" id="email" name="email" value={cardential.email} aria-describedby="emailHelp" onChange={OnChange} />
                <div id="emailHelp" className="form-text">We'll never share your Details with anyone else.</div>
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                <input type="password" className="form-control" id="password" name="password" value={cardential.password} onChange={OnChange} />
            </div>

            <button type="submit" className="btn btn-primary" >Login</button>
        </form></>
    )
}

export default Login