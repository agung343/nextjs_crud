import Link from "next/link";

interface Props  {
    href: string
    type: "menu" | "button"
    text: string
}

export default function NavigationItems({href, type, text}: Props) {
    return (<>
    
    {type === "menu" && (
        <Link className='text-white font-bold mx-2' href={href}>
            {text}
        </Link>
    )}
    {type === "button" && (
        <Link className='bg-white p-2' href={href}>
            {text}
        </Link>
    )}
    
    </>)
   
}