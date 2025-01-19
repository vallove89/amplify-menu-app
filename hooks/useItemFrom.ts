import { useState, useEffect } from "react";
import { generateClient } from "aws-amplify/data";
import { type Schema } from "@/amplify/data/resource";
import { getCurrentUser } from "aws-amplify/auth";

const client = generateClient<Schema>();

export const useDishForm = () => {
  const [user, setUser] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [price, setPrice] = useState<number | string>("");
  const [description, setDescription] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string>("");
  const [statusMessage, setStatusMessage] = useState<string>("");

  const handleSubmit = async (e?: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault();

    try {
      const { data } = await client.models.Dish.create({
        userId: user,
        name,
        description,
        imageUrl,
        price: typeof price === "string" ? parseFloat(price) : price,
      });

      console.log("Successfully created new dish: ", data);

      // Reset form fields
      setName("");
      setPrice("");
      setDescription("");
      setImageUrl("");
      setStatusMessage("Dish created successfully!");
    } catch (error) {
      console.log("Error creating dish: ", error);
      setStatusMessage("Failed to create the dish. Please try again.");
    }
  };

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const { userId } = await getCurrentUser();
        setUser(userId);
        console.log("Successfully returned the user ID: ", userId);
      } catch (error) {
        console.log("Failed to fetch the current user: ", error);
      }
    };

    fetchUserId();
  }, []);

  return {
    name,
    setName,
    price,
    setPrice,
    description,
    setDescription,
    imageUrl,
    setImageUrl,
    handleSubmit,
    statusMessage,
  };
};
