"use client";
import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { toast } from 'react-hot-toast';

export default function LoginPage() {

    const router = useRouter();
    const [user, setUser] = React.useState({
        email: '',
        password: ''
    });
    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    const onLogin = async () => {
        try {
            setLoading(true);
            await axios.post('/api/users/login', user);
            toast.success("Login successful!");
            router.push('/profile'); // Redirect to profile page after successful login
        } catch (error: any) {
            console.error("Error during login:", error);
            // Handle error (e.g., show a toast notification)
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }

    React.useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0) {
            setButtonDisabled(false);
        }
        else {
            setButtonDisabled(true);
        }
    }, [user]);

    return (
        <div className="flex justify-center flex-col items-center min-h-screen py-2">
            <h1 className="text-white text-2xl">{loading ? "Processing" : "Login"}</h1>
            <hr />
            <label htmlFor="email" className=''>Email</label>
            <input
                type="email"
                id="email"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                placeholder='Enter your email'
                className="border border-gray-300 rounded p-2 mb-4 w-64"
            />
            <hr />
            <label htmlFor="password" className=''>Password</label>
            <input
                type="password"
                id="password"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                placeholder='Enter your password'
                className="border border-gray-300 rounded p-2 mb-4 w-64"
            />
            <Link href='/forgotpassword'>Forgot password?</Link>
            <button
            onClick={onLogin}
            className="bg-blue-500 text-white rounded p-2 w-64 hover:bg-blue-600 transition duration-200"
            >{buttonDisabled ? "No login" : "Login"}</button>
            <Link href='/signup'>Visit signup page</Link>
        </div>
    )
}