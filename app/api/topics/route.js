import ConnectMongoDB from "@/lib/mongodb"
import Topic from "@/models/topic"
import { NextResponse } from "next/server"

export async function POST(request) {
    try {
        const {title, description} = await request.json()
        await ConnectMongoDB()
        await Topic.create({title, description})
        return NextResponse.json(
            {message: "Topic created"},
            {status: 201}
        )
    } catch (error) {
        // handle any errors that occured during execution
        console.log(error)

        //return an appropriate error response
        return NextResponse.json(
            {message: "An error occured while creating the topic"},
            {status: 500}
        )
    }
}

export async function GET() { 
    try {
        await ConnectMongoDB()
        const data = await Topic.find()
        return NextResponse.json({data})
    } catch (error) {
        return NextResponse.json({
            message: "Internal Server Error"
        }, {status: 500})
    }
}

export async function DELETE(request) {
    try {
        const id = request.nextUrl.searchParams.get("id");
        await ConnectMongoDB();
        await Topic.findByIdAndDelete(id);

        if (!deleteTopicId) {
            return NextResponse.json(
                {message: "Topic not exist"},
                {status: 404}
            )
        }

        return NextResponse.json(
            {message: "Topic deleted"},
            {status: 201}
        )
    } 
    catch (error) {
        return NextResponse.json({
            message: "Internal Server Error"
        }, {status: 500})
    }
}