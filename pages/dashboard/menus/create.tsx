import { useState, useEffect } from 'react';
import Link from 'next/link';
import { generateClient } from 'aws-amplify/data';
import { type Schema } from '../../../amplify/data/resource';
import { getCurrentUser } from 'aws-amplify/auth';

const client = generateClient<Schema>();

export default function CreateSidePage() {
    const [user, setUser] = useState('');
    const [title, setTitle] = useState('');
  
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      try {

        const { data } = await client.models.Menu.create({
            userId: user,
            title: title,
        })

        console.log('Successfully created new drink: ', data);
      } catch(error) {
        console.log('Error creating drink: ',error);
      };
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
      <form onSubmit={handleSubmit} className="drink-form">
        <div>
          <label>
            Title:
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </label>
        </div>
  
        <button type="submit">Create Menu</button>
      </form>
    );
  }
