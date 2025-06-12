import connectToDatabase from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";

connectToDatabase();

export async function POST(req: NextRequest) {
    try {
        const reqbody = await req.json();
        const { username, email, password } = reqbody;

        console.log(reqbody);

        // check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return NextResponse.json({ error: "User already exists" }, { status: 400 });
        }

        // hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // create a new user
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        });

        const savedUser = await newUser.save();
        console.log("User created successfully:", savedUser);

        // Verify the user by sending a verification email
        await sendEmail({
            email: email,
            emailType: "VERIFY",
            userId: savedUser._id,
        });

        return NextResponse.json({
            message: "User created successfully",
            success: true,
            savedUser
        }, { status: 201 });

    } catch (err: any) {
        console.error("Error in POST /api/signup:", err);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });

    }
}