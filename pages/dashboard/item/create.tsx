import React, { useState } from "react";
import ItemForm from "@/components/ItemForm";

const TestItemForm: React.FC = () => {
  const [name, setName] = useState<string>("Chicken");
  const [imageUrl, setImageUrl] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [submenus, setSubmenus] = useState<string[]>([]);
  const [priceOptions, setPriceOptions] = useState<{ label: string; price: number | string }[]>([]);
  const [description, setDescription] = useState<string>("");

  const handleSubmit = async () => {
    console.log({
      name,
      imageUrl,
      category,
      submenus,
      priceOptions,
      description,
    });

  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-center mb-6">Test Item Form</h1>
      <ItemForm
        name={name}
        setName={setName}
        imageUrlEnabled={false}
        imageUrl={imageUrl}
        setImageUrl={setImageUrl}
        category={category}
        setCategory={setCategory}
        submenus={submenus}
        setSubmenus={setSubmenus}
        priceOptions={priceOptions}
        setPriceOptions={setPriceOptions}
        description={description}
        setDescription={setDescription}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

export default TestItemForm;
