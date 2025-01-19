import { useState, useEffect } from 'react';
import Link from 'next/link';
import { generateClient } from 'aws-amplify/data';
import { type Schema } from '../../../amplify/data/resource';
import { getCurrentUser } from 'aws-amplify/auth';
import ItemForm from '@/components/ItemForm';

const client = generateClient<Schema>();

export default function CreateDrinkPage() {
    const [user, setUser] = useState('');
    const [name, setName] = useState<string>("");
    const [price, setPrice] = useState<number | string>("");
    const [description, setDescription] = useState<string>("");
  
    const handleSubmit = async (e?: React.FormEvent<HTMLFormElement>) => {
      e?.preventDefault();
      try {

        const numericPrice = typeof price === "string" ? parseFloat(price) : price;

        const { data } = await client.models.Drink.create({
            userId: user,
            name: name,
            description: description,
            price: numericPrice,
        })
      

        console.log('Successfully created new drink: ', data);

        setName('');
        setPrice('');
        setDescription('');

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
      <ItemForm
        name={name}
        setName={setName}
        price={price}
        setPrice={setPrice}
        description={description}
        setDescription={setDescription}
        handleSubmit={handleSubmit}
    />
  );
}
