"use client"
import React, { useState } from 'react'
import Link from 'next/link'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons"
import { Button } from "@/components/ui/button"
import '@/app/globals.css'; // Global styles của bạn
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
import { useRouter } from 'next/navigation'
const Login = () => {
    const [username, Setusername] = useState("")
    const [password, Setpassword] = useState("")
    const [error, Seterror] = useState("")
    const [showpassword, SetShowpassword] = useState(false)
    const router = useRouter();
    const handlerUser = (e: React.ChangeEvent<HTMLInputElement>) => {
        Setusername(e.target.value);
    }
    const handlerPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        Setpassword(e.target.value);
    }
    const handlerShow = () => {
        SetShowpassword(!showpassword)
    }
    const handlerSubmit = async () => {
        try {
            const res = await fetch(`/api/bemovie/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
                credentials: 'include'
            });
            if (res.ok) 
                router.push('/');
            else {
                const data = await res.json();
                Seterror(data.message || "Dang nhap that bai");
            }
        } catch (error) {
            console.log(error)
            Seterror("Co loi xay ra, vui long thu lai")
        }

    }

    return (
        <div className="w-screen h-screen overflow-hidden flex items-center justify-around bg-neutral-950" >
            <Card className="w-full max-w-sm mx-auto bg-neutral-900">
                <CardHeader className='text-white'>
                    <CardTitle>Đăng nhập</CardTitle>
                    <CardAction>
                        <a href="register" className='hover:underline text-[16px]'>
                            Đăng kí
                        </a>
                    </CardAction>
                </CardHeader>
                <CardContent>
                    <form>
                        <div className="flex flex-col gap-6 text-white">
                            <div className="grid gap-2">
                                <div className="flex items-center">
                                    <Label htmlFor="username">Tên đăng nhập</Label>
                                </div>
                                <Input onChange={(e) => handlerUser(e)} value={username} id="username" required className='text-white border-white/40' />
                            </div>
                            <div className="grid gap-2">
                                <div className="flex items-center">
                                    <Label htmlFor="password">Mật khẩu</Label>
                                    <a
                                        href="#"
                                        className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                                    >
                                        Quên mật khẩu?
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
                        Đăng nhập
                    </Button>
                    <Link href={'/'} className='w-full'>
                        <Button type="submit" className="w-full border-white/40 border text-white">
                            Quay về trang chủ
                        </Button>
                    </Link>
                </CardFooter>
            </Card>
        </div>

    )
}

export default Login