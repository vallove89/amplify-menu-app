import { uploadData,getUrl, remove, list } from 'aws-amplify/storage';
import '@aws-amplify/ui-react/styles.css';
import Link from 'next/link';



export default function PublicPicture() {
    async function returnList() {
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

    return (
        <div>
            <h1>Public Picture</h1>
            <button onClick={returnList}>Return List</button>
            <Link href="/">Back to Home</Link>
        </div>
    )
}