import Link from 'next/link';



export default function SubmenusPage() {
    return (
        <div>
            <h1>Submenus</h1>
            <Link href="/dashboard">Go back to dashboard</Link>
            <br />
            <Link href="/dashboard/submenus/create">Create Submenu</Link>
        </div>
    )
}