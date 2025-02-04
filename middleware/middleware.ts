import { NextRequest, NextResponse } from "next/server";


export async function middleware(req: NextRequest){
    const token = process.env.NEXTAUTH_SECRET;

    const { pathname } = req.nextUrl;

    if (!token && pathname.startsWith("/weather")) {
        const loginurl = new URL("/login", req.url);
        loginurl.searchParams.set("callbackUrl", req.url)
        return NextResponse.redirect(loginurl);
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/weather:path**"]
}