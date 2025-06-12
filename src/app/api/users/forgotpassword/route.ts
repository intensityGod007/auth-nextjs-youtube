import {connectToDatabase} from "@/dbConfig/dbConfig";
import { NextResponse, NextRequest } from "next/server";
import User from "@/models/userModel";
import { sendEmail } from "@/helpers/mailer";

connectToDatabase();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { email } = reqBody;
        console.log("Received email for password reset:", email);

        // Check if the user exists
        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }
        console.log("User found:", user);

        // Send the reset password email
        await sendEmail({
            email: user.email,
            emailType: "RESET",
            userId: user._id,
        });
        console.log("Reset password email sent successfully");
        
        return NextResponse.json({
            message: "Reset password email sent successfully",
            success: true,
        }, { status: 200 });
    } catch (error: any) {
        console.error("Error in POST /api/users/forgotpassword:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

}