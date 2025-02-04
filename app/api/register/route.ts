import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";


export async function POST (req: Request){
    try {
        
    const {email, password} = await req.json();

    if (!email || !password) {
        return NextResponse.json({
            message: 'Email and password are required'
        },{
            status: 400
        })
    }

    const existingUser = await prisma.user.findUnique({
        where:{
            email
        }
    });

    if (existingUser) {
        return NextResponse.json({
            message: 'User already exists'
        },{status: 400})
    }

    const newUser = await prisma.user.create({
        data:{
            email,
            password
        }
    });
    return NextResponse.json({
        message: 'User registered successfully',
        User: newUser
    },{
        status: 200
    })

    } catch (error: unknown) {
        return NextResponse.json({
            message: 'Failed to register user' 
        },{
            status: 500
        })
    }
}