import Link from 'next/link';



export default function ImagesPage() {
    return (
        <div>
            <h1>Images</h1>
            <Link href="/dashboard/images/create">Upload an new image</Link>
            <br />

            <Link href="/dashboard">Go back to dashboard</Link>
        </div>
    )
}