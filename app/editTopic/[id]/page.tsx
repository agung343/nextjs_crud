'use client'

import { useEffect, useState, useMemo } from "react"
import { useParams,useRouter } from "next/navigation"

import Input, {Button} from "@/components/Input"

const getTopicById = async (id:string) => {
    try {
        const res = await fetch("http://localhost:3000/api/topics/" + id, {
            cache: "no-store"
        })

        if (!res.ok) {
            throw new Error("Failed to fetch a topic")
        }        
        return res.json()
    } catch (error) {
        console.log(error)
    }
}

type Topic = {
    _id: string
    title: string
    description: string
}

type API_Response = {
    data: Topic
}

export default function EditTopic() {
    const params = useParams()
    const id = params.id as string
    console.log("id", id)

    const router = useRouter()

    useEffect(() => {
        async function fetchTopic() {
            const {response} = await getTopicById(id)
            setFormData(response.data)
        }
    }, [id])

    const [formData, setFormData] = useState({
        title: "",
        description: ""
    })

    function handleInputChange(e: React.ChangeEvent<HTMLInputElement>| React.ChangeEvent<HTMLTextAreaElement>, name: string) {
        setFormData(form => ({
            ...form, [name]: e.target.value
        }))
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        try {
            const res = await fetch(`http://localhost:3000/api/topics/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    title: formData.title,
                    description: formData.title
                })
            })

            if (res.ok) {
                router.push("/")
            } else {
                throw new Error("Failed to update topic")
            }
        } catch (error) {
            console.log(error)
        }
    }

    return(<>
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">    
        <Input mode="input" name="title" label="Title" 
          onChange={e => handleInputChange(e, "title")} 
          value={formData.title} 
          defaultValue={formData.title}
        />
        <Input mode="textarea" name="description" label="Description" 
          onChange={e => handleInputChange(e, "description")} 
          value={formData.description} 
          defaultValue={formData.description}
        />
        <Button>
            Update Topic
        </Button>
    </form>
    </>)
    
    
}