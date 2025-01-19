import { useState, useEffect } from 'react';
import Link from 'next/link';
import { generateClient } from 'aws-amplify/data';
import { type Schema } from '../../../amplify/data/resource';
import { getCurrentUser } from 'aws-amplify/auth';

interface Price {
    price: string;
    unit: string;
}


const client = generateClient<Schema>();

export default function CreateDrinkPage() {
    const [user, setUser] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [category, setCategory] = useState(false);
    const [price, setPrice] = useState('');
  
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      try {

        const { data } = await client.models.Drink.create({
            userId: user,
            name: name,
            description: description,
            imageUrl: imageUrl,
            category: category,
            price: parseFloat(price),
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
            Name:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>
        </div>
        
        <div>
          <label>
            Description:
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </label>
        </div>
  
        <div>
          <label>
            Image URL:
            <input
              type="text"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
            />
          </label>
        </div>
  
        <div>
          <label>
            Category (Alcoholic):
            <input
              type="checkbox"
              checked={category}
              onChange={(e) => setCategory(e.target.checked)}
            />
          </label>
        </div>
  
        <div>
          <label>Price:</label>
          <input
                type="number"
                placeholder="Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
        </div>
  
        <button type="submit">Create Drink</button>
      </form>
    );
  }
