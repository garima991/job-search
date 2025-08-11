import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const response = NextResponse.json({
            success: true,
            message: "Logout successful"
        }, { status: 200 });

        // Clear the authentication cookie
        response.cookies.delete('job-user-token');

        return response;

    } catch (error) {
        console.error('Logout error:', error);
        return NextResponse.json({
            success: false,
            message: 'Internal server error'
        }, { status: 500 });
    }
}
