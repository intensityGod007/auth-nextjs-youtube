import { NextResponse } from "next/server";

export async function GET() {
    try {
        const response = NextResponse.json({ 
            message: "Logout successful",
            success: true,
        });
        // Clear the cookies
        response.cookies.set("token", "", {
            httpOnly: true,
            expires: new Date(0), // Set expiration to the past to clear the cookie
        });
        return response;
    } catch (error: any) {
        return NextResponse.json({
            message: error.message || "Logout failed",
            success: false,
        }, { status: 500 });
    }
}