"use client";
import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { axios } from 'axios';

export default function SignupPage() {

    const [user, setUser] = React.useState({
        username: '',
        email: '',
        password: ''
    });

    const onSignUp = async () => {}

    return (
        <div className="flex justify-center flex-col items-center min-h-screen py-2">
            <h1 className="text-white text-2xl">Signup</h1>
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
            >Signup</button>
            <Link href='/login'>Visit login page</Link>
        </div>
    )
}