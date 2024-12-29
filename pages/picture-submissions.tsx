import { uploadData,getUrl, remove, list } from 'aws-amplify/storage';
import '@aws-amplify/ui-react/styles.css';
import Link from 'next/link';

async function handleOnSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const file = formData.get("file") as File;

    console.log("file: ",file);

    try {
        const result = await uploadData({
            data: file,
            path: file.name,
            options: {
                bucket: 'pictureBucket'
            }
        }).result;
        console.log("Succeded: ", result);
    } catch (e) {
        console.log("Error: ",e);
    }
}

async function handleDownload() {
    try {
        const result = await getUrl({
            path: 'buck01.jpg',
            options: {
                bucket: 'pictureBucket'
            }
        });
        console.log("Success", result);
    } catch (err) {
        console.log("Error: ",err);
    }

}

async function handleRemove() {
    try{
        const result = await remove({
            path: 'buck01.jpg',
            options: {
                bucket: 'pictureBucket'
            }
        });
        console.log('Success remove: ', result);
    } catch (err) {
        console.log('Error: ',err);
    }
}

export default function PictureSubmissions() {
    return (
        <div>
            <h1>Picture Submission</h1>
            <form onSubmit={handleOnSubmit}>
                <input type="file" name="file" id="file" />
                <input type="submit" />
            </form>
            <Link href="/">Back to Home</Link>
            <button onClick={handleDownload}>Download</button>
            <button onClick={handleRemove}>Remove</button>
        </div>
    )
}