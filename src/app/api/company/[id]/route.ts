import prismaClient from "@/services/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, {params}){
    const id = await params.id;

    const company = await prismaClient.company.findUnique({
        where : {
            id : id
        },
        include : {
            owner : true,
            jobs : true,
        
        }
    });

    console.log(company);

    return NextResponse.json({
        success : true,
        data : company
    });
}