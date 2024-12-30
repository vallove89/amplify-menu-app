import { uploadData,getUrl, remove, list } from 'aws-amplify/storage';
import '@aws-amplify/ui-react/styles.css';
import Link from 'next/link';

async function handleList() {
    try {
        const result = await list({
            path: '',
            options: {
                listAll: true,
                bucket: "publicImage"
            }
        });
        console.log('Success return list', result);
    } catch (error) {
        console.log('Error returning list', error);
    }
    
}

export default function PublicPicture() {
    return (
        <div>
            <h1>Public Picture</h1>
            <button onClick={handleList}>Return List</button>
            <Link href="/">Back to Home</Link>
        </div>
    )
}