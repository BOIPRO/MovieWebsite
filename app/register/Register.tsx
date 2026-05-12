"use client"
import React, { useState } from 'react'
import Link from 'next/link'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons"
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button"
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import VerifyCard from '@/components/ui/VerifyCard'
const Register = () => {
    const [username, Setusername] = useState("");
    const [password, Setpassword] = useState("");
    const [email, Setemail] = useState("");
    const [error, Seterror] = useState("");
    const [showpassword, SetShowpassword] = useState(false)
    const [isPopup, setIsPopup] = useState(true)
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
    const isValidEmail = (email: string) => {
        const regex =
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/;

        return regex.test(email);
    }
   
    const handlerSubmit = async () => {
        try {
            if (!isValidEmail(email) || username === "" || password === "") {
                Seterror("Co loi xay ra vui long nhap lai")
                return;
            }
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    username: username,
                    password: password
                })
            })
            const data = await res.json();
            console.log(res.status)
            if (!res.ok) {
                Seterror(data.message)
                setIsPopup(false)
            }
            else {
                setIsPopup(true)
                Seterror("")
                Setemail("")
                Setpassword("")
                Setusername("")
            }

        } catch (error: any) {
            console.error("Lỗi đăng ký:", error.message);
        }
    }

    return (
        <div className="w-screen h-screen overflow-hidden flex items-center bg-neutral-950" >
            {isPopup ? 
        <VerifyCard email={"boibrohihi311@gmail.com"} />              
            :   
            
                <Card className="w-full max-w-sm mx-auto bg-neutral-900">
                    <CardHeader className='text-white'>
                        <CardTitle>Register</CardTitle>
                        <CardAction>
                            <Link href={'/login'}>
                                <Button variant="link">Login</Button>
                            </Link>
                        </CardAction>
                    </CardHeader>
                    <CardContent>
                        <form>
                            <div className="flex flex-col gap-6 text-white">
                                <div className="grid gap-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        value={email}
                                        id="email"
                                        type="email"
                                        placeholder="m@example.com"
                                        required
                                        className='text-white border-white/40'
                                        onChange={(e) => handleremail(e)}
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <div className="flex items-center">
                                        <Label htmlFor="username">Username</Label>
                                    </div>
                                    <Input onChange={(e) => handlerUser(e)} value={username} id="username" required className='text-white border-white/40' />
                                </div>
                                <div className="grid gap-2">
                                    <div className="flex items-center">
                                        <Label htmlFor="password">Password</Label>
                                        <a
                                            href="#"
                                            className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                                        >
                                            Forgot your password?
                                        </a>
                                    </div>
                                    <div className="relative">
                                        <Input id="password" value={password} type={showpassword ? "text" : "password"} required className='text-white border-white/40 ' onChange={(e) => handlerPassword(e)} />
                                        <button type="button" onClick={handlerShow} className='absolute top-2 left-[85%] lg:left-[90%]'>
                                            <FontAwesomeIcon icon={showpassword ? faEye : faEyeSlash} />
                                        </button>
                                    </div>

                                </div>

                            </div>
                        </form>
                        <CardDescription className='text-red-500'>
                            {error}
                        </CardDescription>
                    </CardContent>
                    <CardFooter className="flex-col gap-2">
                        <Button onClick={handlerSubmit} type="submit" className="w-full bg-white text-black">
                            Dang ki
                        </Button>
                        <Link href={'/home'} className='w-full'>
                            <Button type="submit" className="w-full border-white/40 border text-white">
                                Quay ve trang chu
                            </Button>
                        </Link>
                    </CardFooter>
                </Card>
            }


        </div>
    )
}

export default Register