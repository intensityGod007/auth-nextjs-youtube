"use client";

import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function VerifyEmailPage() {
    const [token, setToken] = useState("");
    const [verified, setVerified] = useState(false);
    const [error, setError] = useState(false);

    const verifyEmail = async () => {
        try {
            axios.post("/api/users/verifyEmail", { token });
            setVerified(true);
        } catch (error: any) {
            setError(true);
            console.error("Error verifying email:", error.response.data);
        }
    }

    useEffect(() => {
        const urlToken = window.location.search.split("=")[1];
        setToken(urlToken || "");
    }, []);

    useEffect(() => {
        if(token.length > 0) {
            verifyEmail();
        }
    }, [token]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-2xl font-bold mb-4">Verify Your Email</h1>
            {verified ? (
                <div className="text-green-500">
                    <p>Your email has been successfully verified!</p>
                    <Link href="/" className="text-blue-500 underline">Go to Home</Link>
                </div>
            ) : error ? (
                <div className="text-red-500">
                    <p>There was an error verifying your email. Please try again.</p>
                </div>
            ) : (
                <button 
                    onClick={verifyEmail} 
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                    Verify Email
                </button>
            )}
        </div>
    )
}

