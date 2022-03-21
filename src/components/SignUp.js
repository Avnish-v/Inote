import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
const host = "http://localhost:5000";

const SignUp = (props) => {
    let history = useNavigate();
    const [id, setid] = useState({ name: "", email: "", password: "" });

    const Onchange = e => {
        setid({ ...id, [e.target.name]: [e.target.value] });
    };
    const Handlesubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`${host}/api/auth//create-user`, {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({ "name": id.name[0], "email": id.email[0], "password": id.password[0] })

        });
        let json = await response.json();
        console.log("this is the response", json.AuthToken)
        if (json.sucess) {
            // localStorage.setItem("token", json.AuthToken);

            history("/login")
            props.showAlert("user created sucessfully", 'success');

        } else {
            props.showAlert("User Already Exists ", 'danger');

        }

    }
    return (
        <>
            <form onSubmit={Handlesubmit}>

                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Name</label>
                    <input type="text" className="form-control" value={id.name} id="name" name="name" aria-describedby="emailHelp" onChange={Onchange} required />

                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" value={id.email} name="email" aria-describedby="emailHelp" onChange={Onchange} required />

                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" name='password' value={id.password} id="password" onChange={Onchange} required min={5} />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Confirm-Password</label>
                    <input type="password" className="form-control" name='cpassword' id="cpassword" onChange={Onchange} required />
                </div>

                <button type="submit" className="btn btn-primary">SignUP</button>
            </form>

        </>
    )
}

export default SignUp;