import Link from 'next/link';



export default function MenusPage() {
    return (
        <div>
            <h1>Menus</h1>
            <Link href="/dashboard">Go back to dashboard</Link>
            <br />
            <Link href="/dashboard/menus/create">Create Menu</Link>
            
        </div>
    )
}