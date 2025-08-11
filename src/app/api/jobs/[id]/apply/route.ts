import { getCurrentUser } from "@/lib/getCurrentUser";
import prismaClient from "@/services/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, { params }: { params: { id: string } }){
    const user = await getCurrentUser();
    const job_id = params.id;

    if(!user){
        return NextResponse.json({
            success: false,
            message: "User is not authenticated"
        })
    }

    const appToSave = {
        user_id: user.id,
        job_id: job_id
    }

    try{
        const application = await prismaClient.application.create({
            data: appToSave
        })

        return NextResponse.json({
            success: true,
            data : application
        })
    }
    catch(error){
        console.log(error.message);
        return NextResponse.json({
            success: true,
            data: {
                message: "Failed to create application"
            }
        })
    }


}