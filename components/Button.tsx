"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"

type Props = {
    action: "edit" | "delete";
    children: React.ReactNode
    topicId?: string | undefined
    id?: string,
    onClick?: () => {}
}

export default function Button ({action, children, topicId, id, onClick}: Props) {
    const router = useRouter()

    async function removeClick() {
        const confirmed = confirm("Are you Sure?")

        if (confirmed) {
            const res = await fetch(`http://localhost:3000/api/topics?id=${id}`,{
                method: "DELETE"
            })
        }

        router.refresh()
    }

    return(<>
    
    {action === "delete" && (
        <button className="text-red-400" onClick={removeClick}>
            {children}
        </button>
    )}
    {action === "edit" && (
        <Link className="" href={`/editTopic/${topicId}`}>
            {children}
        </Link>
    )}

    </>)
}