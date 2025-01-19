import Link from 'next/link';



export default function DrinksPage() {
    return (
        <div>
            <h1>Drinks</h1>
            <Link href='/dashboard/drinks/create'>Create Drink</Link>
            <br />
            <Link href="/dashboard">Go back to dashboard</Link>
        </div>
    )
}