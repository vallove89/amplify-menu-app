import { useEffect, useState } from 'react';
import Link from 'next/link';
import { uploadData, list } from 'aws-amplify/storage';
import { getCurrentUser } from 'aws-amplify/auth';






export default function CreateImagePage() {
    const baseUrl = 'https://vals-test-image-bucket-resized.s3.us-east-1.amazonaws.com/'
    const [user,setUser] = useState('');
    const [paths,setPaths] = useState<string[]>([]);

    async function handleUpload(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
    
        const file = formData.get("file") as File;
    
        console.log("file: ",file);
    
        try {
            const result = await uploadData({
                data: file,
                path: user + '/' + file.name,
                options: {
                    bucket: "userImage"
                }
            }).result;
            console.log("Succeded: ", result);
            handleList();
        } catch (e) {
            console.log("Error: ",e);
        }
    }

    async function handleList() {
        try {
            const { items } = await list({
                path: user + '/',
                options: {
                    listAll: true,
                    bucket: "publicImage"
                }
            });
            const images = items.map((item) => item.path);
            setPaths(images);
            console.log('Success return list', items);

        } catch (error) {
            console.log('Error returning list', error);
        }
    }

    useEffect(() => {
        const fetchUserId = async () => {
            try {
                const { userId } = await getCurrentUser();
                setUser(userId);
                console.log('Successfully return the user id: ',userId)
            } catch(error) {
                console.log('failure to return the current user: ', error);
            }
        }
        fetchUserId();
    }, []);
    return (
        <div>
            <h1>Create Image</h1>
            <form onSubmit={handleUpload}>
                <input type="file" name="file" id="file" />
                <input type="submit" value="Upload" />
            </form>
            <br />
            <button onClick={handleList}>Refresh</button>
            <Link href="/dashboard">Go back to dashboard</Link>
            <div>
                {
                    paths.length === 0 ?
                    <p>No Images Uploaded.</p> :
                    <div>
                        {
                            paths.map((path, index) => (
                                <img 
                                    key={index}
                                    src={baseUrl + path}
                                    alt={`Image ${index + 1}`}
                                />
                            ))
                        }
                    </div>
                }
            </div>
            <img src="https://vals-test-image-bucket-resized.s3.us-east-1.amazonaws.com/94b804a8-1001-7050-e305-4b27f76a5efc/burger02.webp" alt="" />
        </div>
    )
}