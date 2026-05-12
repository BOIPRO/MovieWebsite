"use client"
import React, { useState } from 'react'
import { useRouter } from "next/navigation";
import OTPInput from '@/compoments/OTPInput'
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
interface Props {
    email: string
}
const VerifyCard = ({ email}: Props) => {
    const router = useRouter();
    const [otpValue, setOtpValue] = useState("");
    const [error, Seterror] = useState("");
    const handleComplete = (otp: string) => {
        setOtpValue(otp)
    }
     const handleVerification  = async () =>  {
        try {
             const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/verify`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    otp : otpValue
                })
            })
            const data = await res.json();
            console.log(res.status)
            if (!res.ok) {
                Seterror(data.message)
            }
            else {
                router.push('/login');
            }
        }
        catch (error : any)  {
            console.error(error)
        }
    }
      console.log(otpValue)
    const maskEmail = (email: string) => {
        if (!email || !email.includes("@")) return email;
        const [localPart, domain] = email.split("@");
        const maskedLocal = localPart.substring(0, 3) + "xxxx";

        return `${maskedLocal}@${domain}`;
    };
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
                    <button className='w-full mx-auto hover:underline cursor-pointer' >Gửi lại mã</button>
                </form>
            </CardContent>
            <CardFooter className='grid gap-2'>
                <p className='mx-auto'>
                    {error}
                </p>
                <Button onClick ={() =>handleVerification()} type="submit" className="w-full bg-white text-black">
                    Xác thực email
                </Button>
            </CardFooter>
        </Card>
    )
}

export default VerifyCard