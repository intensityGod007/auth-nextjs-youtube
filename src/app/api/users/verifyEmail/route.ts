import { connectToDatabase } from "@/dbConfig/dbConfig"
import { NextResponse, NextRequest } from "next/server";
import User from "@/models/userModel";

connectToDatabase();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { token } = reqBody;
        console.log("Received token:", token);

        const user = await User.findOne({
            verifyToken: token,
            verifyTokenExpiry: { $gt: Date.now() } // Check if token is still valid
        });

        if(!user) {
            return NextResponse.json({ error: "Invalid or expired token" }, { status: 400 });
        }

        console.log("User found:", user);

        user.isVerified = true;
        user.verifyToken = undefined; // Clear the token
        user.verifyTokenExpiry = undefined; // Clear the expiry
        await user.save();

        return NextResponse.json({
            message: "Email verified successfully",
            success: true,
        });
        
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });        
    }
}