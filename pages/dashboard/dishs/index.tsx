import Link from 'next/link';



export default function DishsPage() {
    return (
        <div>
            <h1>Dishs</h1>
            <Link href="/dashboard">Go back to dashboard</Link>
            <br />
            <Link href="/dashboard/dishs/create">Create Dish</Link>
        </div>
    )
}