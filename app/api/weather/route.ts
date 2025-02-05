import axios from "axios";
import { NextRequest, NextResponse } from "next/server";



export  async function GET(req: NextRequest){
    const { searchParams } = new URL(req.url);
    const city = searchParams.get("city");

    if (!city) {
        return NextResponse.json({
             error: 'City is required'
        },{
            status: 400
        })
    }

    try {
        const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${process.env.OPENWEATHER_API_KEY}&units=metric`);
            return NextResponse.json(
                 response.data,
            {
                status : 200
            })
    } catch (error) {
        NextResponse.json({
            error: 'Failed to fetch weather data'
        },{
            status: 500
        })
    }
} 