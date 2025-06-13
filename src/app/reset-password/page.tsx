"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";


export default function ResetPasswordPage() {
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [token, setToken] = useState("");
    // const [alertMessage1, setAlertMessage1] = useState(true);
    // const [alertMessage2, setAlertMessage2] = useState(true);

    const router = useRouter();

    const handleResetPassword = async () => {
        try {
            if (newPassword.length > 0 && confirmPassword.length > 0) {
                if (newPassword === confirmPassword) {
                    await axios.post('/api/users/reset-password', { token, newPassword });
                    console.log("Resetting password...");
                    router.push('/login');
                } else {
                    alert("Passwords do not match.");
                }
            } else {
                alert("Please fill in both fields.");
            }
        } catch (error: any) {
            console.log("Error resetting password:", error);
            throw new Error(error.message);
        }
    }

    useEffect(() => {
        const urlToken = window.location.search.split("=")[1];
        if (urlToken) {
            setToken(urlToken);
        } else {
            console.error("No token found in URL");
        }
    }, []);

    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="flex flex-col items-center py-6 px-8 rounded-lg border border-gray-300">
                <h1 className="text-2xl font-bold">Reset Your Password</h1>
                <br />
                <p>Enter your new password below.</p>
                <br />
                <label htmlFor="new-password" className='text-lg'>New Password</label>
                <input
                    type="password"
                    id="new-password"
                    placeholder='Enter your new password'
                    className="border border-gray-300 rounded p-2 mb-4 w-64"
                    required
                    onChange={(e) => setNewPassword(e.target.value)}
                    value={newPassword}
                />
                <label htmlFor="new-password" className='text-lg'>Confirm Password</label>
                <input
                    type="password"
                    id="confirm-password"
                    placeholder='Confirm your new password'
                    className="border border-gray-300 rounded p-2 mb-4 w-64"
                    required
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    value={confirmPassword}
                />
                <button
                    onClick={handleResetPassword}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-200 cursor-pointer"
                >Reset Password</button>
            </div>
        </div>
    )
}