import { generateToken, hashPassword } from "@/lib/auth";
import { setAuthCookie } from "@/lib/cookies";
import prismaClient from "@/services/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { name, email, password } = body;

        const existingUser = await prismaClient.user.findUnique({
            where: {
                email
            }
        });
        if (existingUser) {
            return NextResponse.json({
                success: false,
                message: 'User already exists'
            })

        }

        const hashedPassword = await hashPassword(password);

        const user = await prismaClient.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                role: 'user'
            }
        })
        const token = await generateToken({ id: user.id, email: user.email, role: user.role });

        const response = NextResponse.json({
            success: true,
            message: "Signup Successful",
            redirectTo: "/jobs",
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });

        response.cookies.set('job-user-token', token, {
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax', 
            path: '/',
            maxAge: 60 * 60 * 24, // 24 hours
            expires: new Date(Date.now() + 60 * 60 * 24 * 1000)
        
    });
        
        console.log('User created successfully:', user.email);
        console.log('Token generated and cookie set');

        return response;

    }
    catch (error) {
        console.log(error);
        return NextResponse.json({
            success: false,
            message: 'Internal server error'
        })
    }
}