import { comparePassword, generateToken } from "@/lib/auth";
import prismaClient from "@/services/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        // Validate input
        if (!body.email || !body.password) {
            return NextResponse.json({
                success: false,
                message: 'Email and password are required'
            }, { status: 400 });
        }

        // Find user by email only first
        const user = await prismaClient.user.findUnique({
            where: {
                email: body.email
            }
        });

        if (!user) {
            return NextResponse.json({
                success: false,
                message: 'Invalid email or password'
            }, { status: 401 });
        }

        // Compare the provided password with stored hash
        const isPasswordValid = await comparePassword(body.password, user.password);
        if (!isPasswordValid) {
            return NextResponse.json({
                success: false,
                message: 'Invalid email or password'
            }, { status: 401 });
        }

        // Generate JWT token
        const token = await generateToken({
            id: user.id,
            email: user.email,
            role: user.role
        });

        const response = NextResponse.json({
            success: true,
            message: "Login Successful",
            redirectTo: "/jobs",
            user: {
                id: user.id,
                email: user.email,
                role: user.role
            }
        });

        response.cookies.set('job-user-token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            path: '/',
            maxAge: 60 * 60 * 24,
            expires: new Date(Date.now() + 60 * 60 * 24 * 1000)
        });

        return response;


    } catch (error) {
        console.error('Login error:', error);
        return NextResponse.json({
            success: false,
            message: 'Internal server error'
        }, { status: 500 });
    }
}