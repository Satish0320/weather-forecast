"use client"
import { useSession } from 'next-auth/react';

export default function Weather(){
    const {data: session} = useSession();

    if (!session) {
        return <p>Please log in to view the weather.</p>; // Show message if not logged in
    }
    return (
        <div>
            {session.user?.email}
            weather
        </div>
    )
}