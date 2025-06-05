import connectToDatabase from "@/app/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

connectToDatabase();

export async function POST(req: NextRequest) {
    try {
        const reqbody = await req.json();
        const { email, password } = reqbody;

        console.log(reqbody);

        // check if user exists
        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return NextResponse.json({ error: "User does not exist" }, { status: 400 });
        }

        // check password
        const isPasswordValid = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordValid) {
            return NextResponse.json({ error: "Invalid password" }, { status: 400 });
        }

        // create token data
        // Note: In a real application, you would generate a JWT token here
        const tokenData = {
            id: existingUser._id,
            username: existingUser.username,
            email: existingUser.email,
        };

        // create token
        // Note: In a real application, you would sign the token with a secret key
        const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
            expiresIn: '1h' // Token expiration time
        });

        const response = NextResponse.json({
            message: "User logged in successfully",
            success: true,
        });

        response.cookies.set('token', token, {
            httpOnly: true,
        });

        // Log the successful login
        return response;

    } catch (err: any) {
        console.error("Error in POST /api/login:", err);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}