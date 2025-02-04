import prisma from "@/lib/prisma";
import { authOptions } from "../auth/[...nextauth]/route";
// import { getSession } from "next-auth/react";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";



export async function PUT(req: NextRequest){
    const session = await getServerSession(authOptions);

    if (!session) {
        return NextResponse.json({
            message: 'Unauthorized' 
        },{
            status: 401
        })
    }

    const body = await req.body
    const {favoriteCities} = body;

    try {
        await prisma.user.update({
            where:{
                email: session.user?.email as string
            },
            data:{
                preferences:{
                    upsert:{
                        create: {favoriteCities},
                        update: {favoriteCities}
                    }
                }
            }
        })

        return NextResponse.json({
            message: 'Preferences updated' 
        },{
            status:200
        })
    } catch (error) {
        return NextResponse.json({
            message: 'Error updating preferences',
            error: error.message 
        }, { status: 500 });
    }
}