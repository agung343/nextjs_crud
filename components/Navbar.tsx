import NavigationItems from "./NavItems"

export default function NavigationBar() {
    return(<>
    
    <nav className='flex justify-between items-center bg-slate-800 px-8 py-4'>
        <div>
            <NavigationItems type='menu' href="/" text="Next CRUD App" />
            <NavigationItems type="menu" href="https://nextjs.org/" text="About Next.js" />
        </div>
       <NavigationItems type="button" href="/add-topic" text="Add Topic" />
    </nav>
    
    </>)
}