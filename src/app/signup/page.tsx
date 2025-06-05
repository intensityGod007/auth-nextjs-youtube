"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { toast } from 'react-hot-toast';

export default function SignupPage() {

    const router = useRouter();
    const [user, setUser] = useState({
        username: '',
        email: '',
        password: ''
    });
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if(user.username.length > 0 && user.email.length > 0 && user.password.length > 0) {
            setButtonDisabled(false);
        }
        else {
            setButtonDisabled(true);
        }
    }, [user]);

    const onSignUp = async () => {
        try {
            setLoading(true);
            await axios.post('/api/users/signup', user);
            router.push('/login');
        } catch (error: any) {
            console.error("Error during signup:", error);
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="flex justify-center flex-col items-center min-h-screen py-2">
            <h1 className="text-white text-2xl">{loading ? "Processing" : "Signup"}</h1>
            <hr />
            <label htmlFor="username" className=''>Username</label>
            <input
                type="text"
                id="username"
                value={user.username}
                onChange={(e) => setUser({ ...user, username: e.target.value })}
                placeholder='Enter your username'
                className="border border-gray-300 rounded p-2 mb-4 w-64"
            />
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
            <button
            onClick={onSignUp}
            className="bg-blue-500 text-white rounded p-2 w-64 hover:bg-blue-600 transition duration-200"
            >{buttonDisabled ? "No Signup" : "Signup"}</button>
            <Link href='/login'>Visit login page</Link>
        </div>
    )
}