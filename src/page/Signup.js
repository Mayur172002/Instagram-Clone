import React, { useEffect, useState } from 'react'
import instagramlogo from '../../src/assets/insta-logo.svg'
import facebooklogo from '../../src/assets/facebookicon.svg'
import line from '../../src/assets/line.svg'
import { toast } from 'react-toastify'
import { Link, useNavigate } from 'react-router-dom'

export default function Signup() {
    const redirect = useNavigate()
    // useEffect(() => {
    //     if (localStorage.getItem('userdata')) {
    //         redirect('/')
    //     }
    // }, [])
    const [data, setdata] = useState({
        email: "",
        fullname: "",
        username: "",
        password: "",
        status: "Unblock"
    })
    const [errors, setErrors] = useState({
        email: "",
        fullname: "",
        username: "",
        password: "",
    });

    const FormChangeHandel = (e) => {
        const { name, value } = e.target
        setdata({ ...data, id: new Date().getTime().toString(), [name]: value })
        let errorMessage = '';
        switch (name) {
            case "email":
                if (value.trim() === "") {
                    errorMessage = "Email cannot be empty";
                }
                else if (!value.match(/^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/)) {
                    errorMessage = "Email is invalid";
                }
                break;
            case "fullname":
                if (value.trim() === "") {
                    errorMessage = "Full name cannot be empty";
                } else if (!value.match(/^[a-zA-Z\s]+$/)) {
                    errorMessage = "Please enter a valid name with only alphabetic characters and spaces";
                }
                break;
            case "username":
                if (value.trim() === "") {
                    errorMessage = "Username cannot be empty";
                }
                break;
            case "password":
                if (value.trim() === "") {
                    errorMessage = "Password cannot be empty";
                } else if (value.length > 8) {
                    errorMessage = "Password must be exactly 8 characters long";
                }
                break;
            default:
                break;
        }
        setErrors({ ...errors, [name]: errorMessage })
    }
    const DataSubmit = (e) => {
        e.preventDefault()
        const errorMessage = Object.values(data).some((value) => value === '')
        if (errorMessage) {
            toast.error('Please correct the errors before submitting.')
            return;
        } else {
            const existingUsers = JSON.parse(localStorage.getItem('userdata')) || [];
            const newUser = {
                id: data.id,
                email: data.email,
                fullname: data.fullname,
                username: data.username,
                password: data.password,
                status: data.status = "Unblock",
            }
            existingUsers.push(newUser)
            localStorage.setItem('userdata', JSON.stringify(existingUsers))
            setdata({ email: "", fullname: "", username: "", password: "", })
            redirect('/login')
        }

    }
    return (
        <div>
            <div className='d-flex flex-column justify-content-center align-items-center mt-5 gap-4 '>
                <div className='d-flex flex-column justify-content-center align-items-center'>
                    <img src={instagramlogo} className='img-fluid' />
                    <div className='sign-text mt-3'>Sign up to see photos and videos <br /> from your friends.</div>
                </div>

                <div className='facebook-btn mt-4'>
                    <img src={facebooklogo} className='img-fluid' />
                    <span>Continue with Facebook</span>
                </div>
                <img src={line} className='img-fluid' />
                <div className='login-form mt-4'>
                    <form method='post' onSubmit={DataSubmit} onChange={FormChangeHandel}>
                        <div className="mb-3">
                            <input type="email" className="form-control" id="exampleInputEmail1" value={data.email} name='email' placeholder='mobile number,or email' />
                            {errors.email && <p className="error ms-1 mt-1" style={{ color: "red" }}>{errors.email}</p>}
                        </div>
                        <div className="mb-3">
                            <input type="text" className="form-control" value={data.fullname} name='fullname' id="exampleInputPassword1" placeholder='Full Name' />
                            {errors.fullname && <p className="error ms-1 mt-1" style={{ color: "red" }}>{errors.fullname}</p>}
                        </div>
                        <div className="mb-3">
                            <input type="text" className="form-control" value={data.username} name='username' id="exampleInputPassword1" placeholder='Username' />
                            {errors.username && <p className="error ms-1 mt-1" style={{ color: "red" }}>{errors.username}</p>}
                        </div>
                        <div className="mb-3">
                            <input type="password" className="form-control" value={data.password} name='password' id="exampleInputPassword1" placeholder='password' />
                            {errors.password && <p className="error ms-1 mt-1" style={{ color: "red" }}>{errors.password}</p>}
                        </div>
                        <p className='policy-text'>By signing up, you agree to our <span style={{ color: "#1877F2" }}> Terms, Privacy Policy</span> and Cookies <span style={{ color: "#1877F2" }}> Policy.</span>
                        </p>
                        <button type="submit" className="login-btn" >Sign Up</button>
                    </form>
                </div>
                <p className='sign-btn'>Have an account? <Link to={'/login'} style={{ color: "#1877F2",textDecoration:"none" }}>Log in</Link></p>
                <div className='from-facebook pt-5'>
                    <p>from</p>
                    <h5 className='text-facebook'>Facebook</h5>
                </div>
            </div>
        </div>
    )
}
