import Link from 'next/link';



export default function SidesPage() {
    return (
        <div>
            <h1>Sides</h1>
            <Link href="/dashboard">Go back to dashboard</Link>
            <br />
            <Link href="/dashboard/sides/create">Create Side</Link>
        </div>
    )
}