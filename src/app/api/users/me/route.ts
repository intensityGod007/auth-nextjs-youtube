import { getDataFromToken } from '@/helpers/getDataFromToken';
import { NextRequest, NextResponse } from 'next/server';
import User from '@/models/userModel';
import { connectToDatabase } from '@/dbConfig/dbConfig';

connectToDatabase();

export async function GET(request: NextRequest) {
    try {
        const id = await getDataFromToken(request);
        const user = await User.findOne({ _id: id }).select("-password -__v -createdAt -updatedAt");
        if (!user) {
            return NextResponse.json({
                message: "User not found"
            }, { status: 404 });
        }
        return NextResponse.json({
            data: user,
            message: "User data retrieved successfully"
        }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({
            message: error.message || "An error occurred"
        }, { status: 500 });
    }
}