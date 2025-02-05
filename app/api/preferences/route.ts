import prisma from "@/lib/prisma";
import { authOptions } from "../auth/[...nextauth]/route";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";

// ✅ Handle GET request (Fetch user preferences)
export async function GET(req: NextRequest) {
    const session = await getServerSession(authOptions);

    if (!session) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    try {
        const user = await prisma.user.findUnique({
            where: { email: session.user?.email as string },
            select: { preferences: true }
        });

        return NextResponse.json({ preferences: user?.preferences || { favoriteCities: [] } }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: 'Error fetching preferences', error: error.message }, { status: 500 });
    }
}


export async function PUT(req: NextRequest) {
    const session = await getServerSession(authOptions);

    if (!session) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    try {
        const { favoriteCities } = await req.json(); 

        await prisma.user.update({
            where: { email: session.user?.email as string },
            data: { preferences: { upsert: { create: { favoriteCities }, update: { favoriteCities } } } }
        });

        return NextResponse.json({ message: 'Preferences updated' }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: 'Error updating preferences', error: error.message }, { status: 500 });
    }
}
