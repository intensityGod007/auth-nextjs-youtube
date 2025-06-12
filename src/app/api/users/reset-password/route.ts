import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/dbConfig/dbConfig';
import User from '@/models/userModel';
import bcrypt from 'bcryptjs';

connectToDatabase();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { token, newPassword } = reqBody;

        // Find the user with the reset password token
        const user = await User.findOne({
            forgotPasswordToken: token,
            forgotPasswordExpiry: { $gt: Date.now() }, // Check if token is still valid
        });

        if (!user) {
            return NextResponse.json({ error: 'Invalid or expired token' }, { status: 400 });
        }

        // Update the user's password
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        user.forgotPasswordToken = undefined; // Clear the token
        user.forgotPasswordExpiry = undefined; // Clear the expiry
        await user.save();

        return NextResponse.json({
            message: 'Password reset successfully',
            success: true,
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}