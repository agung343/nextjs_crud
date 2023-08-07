"use client"

import { useEffect, useState } from "react";
import Button from "./Button";
import {HiPencilAlt} from "react-icons/hi"
import { HiOutlineTrash } from "react-icons/hi"

// define topics type
type Topics = {
    _id: string
    title: string
    description: string
}

type API_Response = {
    data: Topics[]
}

const getTopic =async () => {
    try {
        const res = await fetch("http://localhost:3000/api/topics",{
            cache: "no-store"
        })

        if (!res.ok) {
            throw new Error("Failed to fetch topics")
        }
        return res.json()
    } catch (error) {
        console.log("Error loading topics", error)
    }
}


export default function TopicsList() {
    const [topics, setTopics] = useState<Topics[]>([])

    useEffect( () => {
        async function fetchTopic() {
            const respose: API_Response = await getTopic()
            setTopics(respose.data)
        }
        fetchTopic()
    },[topics])

    // const {data: topics}:API_Response = await getTopic();

    return(<>
    
    {topics.map(topic => (<>
         <div key={topic._id} className='p-4 border border-slate-300 my-3 flex justify-between gap-5 items-start'>
         <div>
             <h2 className='font-bold text-2xl'>{topic.title}</h2>
             <div>{topic.description}</div>
         </div>
 
         <div className='flex gap-2'>
             <Button action="delete" id={topic._id}>
                 <HiOutlineTrash size={24} />
             </Button>
             <Button action="edit" topicId={topic._id}>
                 <HiPencilAlt size={24} />
             </Button>
         </div>
     </div>
    </>))}
   
    
    </>)
}
