import { getCurrentUser } from "@/lib/getCurrentUser";
import prismaClient from "@/services/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest){
    const user = await getCurrentUser();

    if(!user){
        return NextResponse.json({
            success : false
        })
    }


    const body = await req.json();
    const company = {name : body.name, description : body.description, ownerId : user.id}

    try {
        const newCompany = await prismaClient.company.create({
            data: company
        })

        return NextResponse.json({
            success : true,
            data : newCompany
        });
    }
    catch(error){
        console.log(error);
        return NextResponse.json({
            success : false
        })
    }
}