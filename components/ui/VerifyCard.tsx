"use client"
import React, { useState } from 'react'
import { useRouter } from "next/navigation";
import OTPInput from '@/components/common/OTPInput'
import { Button } from "@/components/ui/button"
import { notFound } from "next/navigation"
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
interface Props {
    email: string
}
const VerifyCard = ({ email }: Props) => {
    console.log(email)
    const router = useRouter();
    const [otpValue, setOtpValue] = useState("");
    const [error, Seterror] = useState("");
    const [disabled, setDisabled] = useState(false)
    const handleComplete = (otp: string) => {
        setOtpValue(otp)
    }
    const handleResendCode = async () => {
        setDisabled(true)

        setTimeout(() => {
            setDisabled(false)
        }, 30000) // 30s
    const res = await fetch(`/api/bemovie/auth/resend`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: email,
        })
    })
    const data = await res.json()
    if (!res.ok) {
        Seterror(data.message)
    }
    else {
        alert("Da gui lai ma vui long xac thuc lai email")
    }
}
const handleVerification = async () => {
    try {
        const res = await fetch(`api/bemovie/auth/verify`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                otp: otpValue
            })
        })
        const data = await res.json();
        if (!res.ok) {
            Seterror(data.message)
        }
        else {
            router.push('/login');
        }
    }
    catch (error: any) {
        console.error(error)
    }
}
const maskEmail = (email: string) => {
    if (!email || !email.includes("@")) return email;
    const [localPart, domain] = email.split("@");
    const maskedLocal = localPart.substring(0, 3) + "xxxx";

    return `${maskedLocal}@${domain}`;
};
if (email) {
    return (
        <Card className="w-full max-w-sm mx-auto bg-neutral-900 text-white px-2">
            <CardTitle className='mx-auto'>
                <Label>
                    Xác thực email
                </Label>
            </CardTitle>
            <CardDescription >
                Chúng tôi vừa gửi mã xác thực qua email:{maskEmail(email)}.Vui lòng kiểm tra email và xác thực vào ô bên dưới.
            </CardDescription>

            <CardContent>
                <form className='grid gap-2 '>
                    <OTPInput onComplete={handleComplete} />
                    <button disabled={disabled} onClick={handleResendCode} className={`${disabled ?'text-neutral-600 hover:cursor-none' : 'hover:underline cursor-pointer'}w-full mx-auto `} >Gửi lại mã</button>
                </form>
            </CardContent>
            <CardFooter className='grid gap-2'>
                <p className='mx-auto'>
                    {error}
                </p>
                <Button onClick={() => handleVerification()} type="submit" className="w-full bg-white text-black">
                    Xác thực email
                </Button>
            </CardFooter>
        </Card>
    )
}
return (
    notFound()
)
   
}

export default VerifyCard