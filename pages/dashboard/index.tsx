import Link from 'next/link';



export default function DashboardPage() {
    return (
        <div>
            <h1>Dashboard</h1>
            <div>
                <Link href="/dashboard/dishs">Dish&apos;s ...</Link>
            </div>
            <div>
                <Link href="/dashboard/submenus">Submenu&apos;s ...</Link>
            </div>
            <div>
                <Link href="/dashboard/menus">Menu&apos;s ...</Link>
            </div>
            <div>
                <Link href="/dashboard/sides">Side&apos;s ...</Link>
            </div>
            <div>
                <Link href="/dashboard/drinks">Drink&apos;s ...</Link>
            </div>
            
            <Link href="/">Back to Home</Link>
        </div>
    )
}