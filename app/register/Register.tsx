"use client"
import React, { useState } from 'react'
import Link from 'next/link'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons"
import { redirect } from "next/navigation";
const Register = () => {
    const [username, Setusername] = useState("");
    const [password, Setpassword] = useState("");
    const [email, Setemail] = useState("");
    const [error, Seterror] = useState("");
    const [showpassword, SetShowpassword] = useState(false)

    const handlerUser = (e: React.ChangeEvent<HTMLInputElement>) => {
        Setusername(e.target.value);
    }
    const handleremail = (e: React.ChangeEvent<HTMLInputElement>) => {
        Setemail(e.target.value);
    }
    const handlerPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        Setpassword(e.target.value);
    }
    const handlerShow = () => {
        SetShowpassword(!showpassword)
    }
    const isValidEmail = (email : string) => {
    const regex =
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/;

    return regex.test(email);
    }
    const handlerSubmit = () => {
          if (!isValidEmail(email) || username === "" || password === "") {
            Seterror("Co loi xay ra vui long nhap lai")
        return;
    }
    }

    return (
        <div className="w-screen h-screen overflow-hidden flex items-center justify-around" >
            <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute top-0 left-0 w-full h-full object-cover  -z-20"
            >
                <source src="/videos/bg.mp4" type="video/mp4" />
            </video>
            <div className='flex max-w-200 bg-[rgba(0,0,0,0.7)] rounded-lg  text-white  flex-col gap-8 px-9 py-10 w-100 aspect-square relative'>
           <div className="absolute inset-0 -z-10 rounded-xl bg-linear-to-r from-purple-500 to-blue-500 blur-lg opacity-50 "></div>
            <div>
                <h1 className='text-[clamp(1.5rem,2vw,2rem)] text-center font-extrabold'>Register</h1>
            </div>
            <div className='flex flex-col gap-5 '>
                <div className='flex flex-col gap-8'>
                    <input value={username ?? ""} onChange={handlerUser} type="text" placeholder='Username' className=' border border-[rgba(255,255,255,0.5)] rounded-4xl focus:outline-none focus:ring-2 focus:ring-[rgba(255,255,255,0.8)] py-2 px-3 placeholder-white' />
                    <div className='relative' >
                        <input value={password ?? ""} onChange={handlerPassword} type={showpassword ? "text" : "password"} placeholder='Password' className='border  border-[rgba(255,255,255,0.5)] rounded-4xl focus:outline-none focus:ring-2 focus:ring-[rgba(255,255,255,0.8)] py-2 px-3 placeholder-white w-full' />
                        <button type="button" onClick={handlerShow} className='absolute top-2 left-[85%] lg:left-[90%]'>
                            <FontAwesomeIcon icon={showpassword ? faEye : faEyeSlash} />
                        </button>
                    </div>
                    <input value={email ?? ""} onChange={handleremail} placeholder='Email'className=' border border-[rgba(255,255,255,0.5)] rounded-4xl focus:outline-none focus:ring-2 focus:ring-[rgba(255,255,255,0.8)] py-2 px-3 placeholder-white'></input>
                </div>
                {error != "" ? <p className='text-center text-red-600 font-semibold'>{error}</p> : null}
                <button onClick={handlerSubmit} className='bg-white text-black rounded-4xl py-3  cursor-pointer' >Register</button>
                <div className='flex justify-center'>
                    <p>Da co tai khoan?</p>
                    <Link className='font-semibold hover:underline' href={"/login"}>Login</Link>
                </div>
                <Link className='font-semibold hover:underline mx-auto' href={"/home"}>Trang chu</Link>
            </div>
        </div>
            
        </div>
    )
}

export default Register