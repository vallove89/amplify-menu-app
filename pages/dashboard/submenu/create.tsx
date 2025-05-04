import React, { useState } from "react";
import SubmenuForm from "@/components/SubmenuForm";

const TestSubmenuForm: React.FC = () => {
  const [name, setName] = useState<string>("Chicken");
  const [menus, setMenus] = useState<string[]>([]);
  const [items, setItems] = useState<string[]>([]);
  const [description, setDescription] = useState<string>("");

  const handleSubmit = async () => {
    console.log({
      name,
      menus,
      description,
    });

  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-center mb-6">Test Submenu Form</h1>
      <SubmenuForm
        name={name}
        setName={setName}
        menus={menus}
        setMenus={setMenus}
        items={items}
        setItems={setItems}
        description={description}
        setDescription={setDescription}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

export default TestSubmenuForm;
