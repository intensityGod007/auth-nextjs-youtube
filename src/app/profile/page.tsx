"use client";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function ProfilePage() {
    const router = useRouter();
    const [id, setId] = useState("nothing");

    const logout = async () => {
        try {
            await axios.get("/api/users/logout");
            toast.success("Logout successful");
            router.push("/login");
        } catch (error: any) {
            console.error("Logout error:", error);
            toast.error(error.message || "Logout failed");
        }
    };

    const getUserDetails = async () => {
        const res = await axios.get("/api/users/me");
        setId(res.data.data._id);
    }

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-2xl font-bold mb-4">Profile Page</h1>
            <p className="text-lg">This is the profile page.</p>
            <span>{id === "nothing" ? "Nothing" : <Link href={`/profile/${id}`} target="_blank">{id}</Link>}</span>
            <button
                onClick={logout}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 cursor-pointer"
            >Logout</button>
            <button
                onClick={getUserDetails}
                className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 cursor-pointer"
            >Get user details</button>
        </div>
    );
}