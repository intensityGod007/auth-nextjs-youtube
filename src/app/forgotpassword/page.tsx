"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";

export default function ForgotPasswordPage() {

    const [email, setEmail] = useState("");
    const [isEmailValid, setIsEmailValid] = useState(true);

    const handleForgotPassword = async () => {
        if (email.length > 0) {
            await axios.post('/api/users/forgotpassword', { email });
            setIsEmailValid(true);
        } else {
            setIsEmailValid(false);
        }
    }

    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="flex flex-col items-center py-6 px-8 rounded-lg border border-gray-300">
                <h1 className="text-2xl font-bold">Forgot Your Password?</h1>
                <br />
                <p>Enter your email address and we will send you instructions to reset your password.</p>
                <br />
                {!isEmailValid && (
                    <p className="text-red-500">Please enter a valid email address.</p>
                )}
                <br />
                <label htmlFor="email" className='text-lg'>Email</label>
                <input
                    type="email"
                    id="email"
                    placeholder='Enter your email'
                    className="border border-gray-300 rounded p-2 mb-4 w-64"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <button
                    onClick={handleForgotPassword}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-200 cursor-pointer"
                >Continue</button>
                <br />
                <Link href='/login'>Back to login</Link>
            </div>
        </div>
    )
}