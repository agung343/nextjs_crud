import ConnectMongoDB from "@/lib/mongodb"
import Topic from "@/models/topic"
import { NextResponse } from "next/server"

export const PUT = async(request, {params}) => {
    try {
        const {id} = params
        const {title, description} = request.json()
        await ConnectMongoDB()
        await Topic.findByIdAndUpdate(id, {title, description})
        return NextResponse.json(
            {message: "Topic Updated"},
            {status: 200}
        )
    }
    catch(error) {
        console.log(error)
        NextResponse.json(
            {message: "Internal Server Error"},
            {status: 500}
        )
    }
    
}

export const GET = async(request, {params}) => {
    try {
        const {id} = params;
        await ConnectMongoDB()
        const data = await Topic.findById(id)
        return NextResponse.json({data}, {status:200})
    } catch (error) {
        console.log(error)
        NextResponse.json(
            {message: "Internal Server Error"},
            {status: 500}
        )
    }
}