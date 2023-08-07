'use client'

import { useState} from "react";
import { useRouter } from "next/navigation";

import Input, {Button} from "@/components/Input";

export default function AddTopic() {
    const [formData, setFormData] = useState({
        title: "",
        description: ""
    })

    const router = useRouter()

    function handleInputChange(e: React.ChangeEvent<HTMLInputElement>| React.ChangeEvent<HTMLTextAreaElement>, name: string) {
        setFormData(form => ({
            ...form, [name]: e.target.value
        }))
    }

    async function handleSubmit(e:React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        if (!formData.title || !formData.description) {
            alert("Title and Description are required!")
            return;
        }

        try {
            const res = await fetch("http://localhost:3000/api/topics", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    title: formData.title,
                    description: formData.description
                })
            })

            if (res.ok) {
                router.push("/")
            } else {
                throw new Error("Failed to create a topic")
            }
        } catch (error) {
            console.log(error)
        }
    }
    

    return(<>
    <form method="post" onSubmit={handleSubmit} className="flex flex-col gap-3">    
        <Input mode="input" name="title" label="Title" 
          onChange={e => handleInputChange(e, "title")} 
          value={formData.title} 
        />
        <Input mode="textarea" name="description" label="Description" 
          onChange={e => handleInputChange(e, "description")} 
          value={formData.description} 
        />
        <Button>
            Add Topic
        </Button>
    </form>
    </>)
}