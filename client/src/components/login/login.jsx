import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { IconButton } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import Typewriter from 'typewriter-effect';
import axios from 'axios';
import APIRequests from '../../api';
import VerifyEmailForm from "./verifyOtp"
import './login.css'


const Login = () => {
    const [modal, setModal] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loginStat, setLoginStat] = useState(false)
    const [otp, setOtp] = useState(false)

    useEffect(() => {
        if (localStorage.getItem("isIn") === 'true') {
            // window.location.href = "/";
        }
    }, []);

    function timeout(delay) {
        return new Promise(res => setTimeout(res, delay));
    }

    const handleChange = (e) => {
        setUserDetails((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (userDetails.email === "" || userDetails.password === "") {
                toast.error('Please fill all the fields!');
                return;
            }
            const response = await APIRequests.signIn(userDetails);
            // console.log("login response", response);
            if (response.status === 200) {
                // show pop up to enter otp
                setOtp(true);
            }

            // setLoginStat(true);
            // window.location.href = "/";
        } catch (error) {
            // setLoginStat(false);
            // localStorage.setItem("isIn", 'false');
            toast.error('Login Failed!');
            console.log(error);
        }
    }

    function myFunction() {
        var x = document.getElementById("myInput");
        if (x.type === "password") {
            document.getElementById("togglePassword").className = "far fa-eye-slash";
            x.type = "text";
        } else {
            document.getElementById("togglePassword").className = "far fa-eye";
            x.type = "password";
        }
    }

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleSubmit(event);
        }
    }
    
    return (
        <div className='w-full h-screen flex items-center justify-center'>
            <VerifyEmailForm open={otp} handleClose={() => setOtp(false)} email={userDetails.email} />
            <div className='w-3/5 h-full bg-log p-4 flex flex-col items-start justify-start gap-56'>
                <div className='flex items-center justify-start gap-2'>
                    <div className='text-logo text-3xl font-bold'>
                        empsing
                    </div>
                    <div>
                        <img
                            src=""
                            alt=""
                            width="30"
                        />
                    </div>
                </div>
                <div className='text-logo text-3xl font-bold'>
                    <Typewriter
                        options={{
                            strings: ['Welcome to empsing!', 'Your one stop solution for all your needs!', 'Get started now!'],
                            delay: 50,
                            autoStart: true,
                            loop: true,
                        }}

                    />
                </div>
            </div>
            <div className='w-2/5 h-full bg-white flex flex-col items-center justify-center gap-4'>
                <div className='text-3xl font-bold'>
                    Get Started
                </div>
                <div className='flex items-center justify-center w-full'>
                    <form className='flex flex-col items-center justify-center gap-4 w-3/4' onSubmit={handleSubmit}>
                        <input
                            className='w-full border h-12 p-2.5 rounded-md'
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <div className='relative w-full'>
                            <input
                                className='w-full border h-12 p-2.5 rounded-md pr-10'
                                type={showPassword ? "text" : "password"}
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <IconButton
                                sx={{
                                    position: "absolute",
                                    top: "5px",
                                    right: "5px",
                                }}
                                onClick={togglePasswordVisibility}
                            >
                                {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                            </IconButton>
                        </div>
                        <input
                            className='p-2.5 w-24 bg-sub text-white rounded-xl cursor-pointer hover:bg-sub-dark'
                            type="submit"
                            value="Login"
                        />
                    </form>
                </div>
                <div>
                    Not a member? <a className='underline decoration-solid text-sub' href="">Sign up</a>
                </div>
                <div className=''>
                    Terms and Conditions
                </div>
            </div>
        </div>
    )
}

export default Login