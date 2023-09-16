import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { IconButton } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import Typewriter from 'typewriter-effect';
import APIRequests from '../../api';
import VerifyEmailForm from "./verifyOtp";
import Logo from '../../assets/Organ_logo.png';
import { useNavigate } from 'react-router-dom';
import './login.css';


const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    // const [loginStat, setLoginStat] = useState(false)
    const [otp, setOtp] = useState(false)

    useEffect(() => {
        if (localStorage.getItem("isIn") === 'true') {
            // window.location.href = "/";
        }
    }, []);

    function timeout(delay) {
        return new Promise(res => setTimeout(res, delay));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userDetails = {
            email: email,
            password: password,
        };
        if (!email || !password) {
            toast.error('Please fill in all fields!');
            return;
        }
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
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    
    return (
        <div className='w-full h-screen flex items-start justify-start'>
            <VerifyEmailForm open={otp} handleClose={() => setOtp(false)} email={email} />
            <div className='w-3/5 h-full bg-pink p-4 flex flex-col items-start justify-start gap-56'>
                <div className='flex items-center justify-start gap-2 w-full'>
                    <div>
                        <img
                            src={Logo}
                            alt=""
                            width="100"
                        />
                    </div>
                    <div className='flex flex-col items-start justify-start gap-1'>
                        <div className='text-maroon text-5xl font-bold'>
                        ORGANizer
                        </div>
                        <div className='text-maroon text-sm font-semibold'>
                        Don't take your organs to heaven; heaven knows we need them here!
                        </div>
                    </div>
                </div>
                <div className='text-maroon text-3xl font-bold'>
                    <Typewriter
                        options={{
                            strings: ['Give the gift of life. Be an organ donor and leave behind the legacy of saving lives.', 
                            'The power to save a life lies within you. Be an organ donor and be a hero.', 
                            "Be someone's hero. Register as an organ donor today.",
                            "You have the power to make a difference even after you're gone. ",
                        ],
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
                            className='p-2.5 w-24 bg-red text-white rounded-xl cursor-pointer hover:bg-sub-dark'
                            type="submit"
                            value="Login"
                        />
                    </form>
                </div>
                <div>
                    Not a member? <a className='underline decoration-solid text-sub cursor-pointer' 
                    onClick={() => {
                        navigate('/register')
                    }}>Sign up</a>
                </div>
                <div className=''>
                    Terms and Conditions
                </div>
            </div>
        </div>
    )
}

export default Login