import React, { useEffect, useState } from 'react'
import instagramlogo from '../../src/assets/insta-logo.svg'
import facebooklogo from '../../src/assets/facebookicon.svg'
import line from '../../src/assets/line.svg'
import { toast } from 'react-toastify'
import { Link, useNavigate } from 'react-router-dom'



export default function Login() {
    const redirect = useNavigate()

    const [data, setdata] = useState({
        email: "",
        password: "",
    })
    const [errors, setErrors] = useState({
        email: "",
        password: "",
    });
    const FormChangeHandel = (e) => {
        const { name, value } = e.target
        setdata({ ...data, [name]: value })
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
            toast.error('Please correct the form value before submitting.')
            return;
        } else {
            const GetuserData = JSON.parse(localStorage.getItem('userdata'))

             GetuserData.map((item, index) => {
                if (item.email === data.email) {
                    if (item.password === data.password) {
                        if (item.status === "Unblock") {
                            toast.success("Login Success !!")
                            const filterID = GetuserData.filter((value) => value.id === item.id);
                            const existingUsers = JSON.parse(localStorage.getItem('instaUser')) || [];
                            const newUser = filterID[0] || []
                            existingUsers.push(newUser)
                            localStorage.setItem('instaUser', JSON.stringify(existingUsers))
                            setTimeout(() => {
                                redirect('/');
                            }, 1000);
                        }
                        else {
                            toast.error("Your Account Blocked Contact Us Instagram !!")
                            setdata({ email: "", password: "" })
                            return false
                        }
                    }
                    else {
                        toast.error("Password does not match !!")
                        return false
                    }
                } else {
                    toast.error("Email does not Exist !!")
                    return false
                }
            })
        }


    }
    return (
        <div>
            <div className='d-flex flex-column justify-content-center align-items-center mt-5 gap-5 '>
                <select class="form-select select-lng" aria-label="Default select example">
                    <option value="1">English</option>
                    <option value="2">Hindi</option>
                    <option value="3">Gujarati</option>
                </select>
                <div className=''>
                    <img src={instagramlogo} className='img-fluid' />
                </div>
                <div className='facebook-btn mt-5'>
                    <img src={facebooklogo} className='img-fluid' />
                    <span>Continue with Facebook</span>
                </div>
                <img src={line} className='img-fluid' />
                <div className='login-form'>
                    <form method='post' onChange={FormChangeHandel} onSubmit={DataSubmit}>
                        <div className="mb-3">
                            <input type="email" className="form-control" value={data.email} name='email' placeholder='phone number,username,or email' />
                            {errors.email && <p className="error ms-1 mt-1" style={{ color: "red" }}>{errors.email}</p>}
                        </div>
                        <div className="mb-3">
                            <input type="password" className="form-control" value={data.password} name='password' placeholder='password' />
                            {errors.password && <p className="error ms-1 mt-1" style={{ color: "red" }}>{errors.password}</p>}
                        </div>
                        <p className='pass-text'>Forget Password?</p>
                        <button type="submit" className="login-btn ">Log In</button>
                    </form>
                </div>
                <p className='sign-btn'>Don’t have an account? <Link to={'/signup'} style={{ color: "#1877F2", textDecoration: "none" }}>sign up</Link></p>
                <div className='from-facebook pt-5'>
                    <p>from</p>
                    <h5 className='text-facebook'>Facebook</h5>
                </div>
            </div>
        </div>
    )
}
