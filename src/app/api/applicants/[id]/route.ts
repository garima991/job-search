import prismaClient from "@/services/prisma";
import { NextResponse } from "next/server";

export async function GET(req: NextResponse, {params} : {params: {id : String}}){
    const job_id = params.id;

    try{
        const response = await prismaClient.application.findMany({
            where: {
                job_id : job_id
            },
            include : {
                user : true
            }
        })

        return NextResponse.json({
            success: true,
            data : response
        })
    }
    catch(error){
        console.log(error);
        return NextResponse.json({
            success: false,
            message: "Failed to fetch applicants"
        })
    }
}