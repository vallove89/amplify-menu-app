import React, { useState } from "react";
import MenuForm from "@/components/MenuForm"; // Adjust the import path based on your project structure

const TestPage: React.FC = () => {
  // State for the menu form
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [submenus, setSubmenus] = useState<string[]>([]);

  // Handle form submission
  const handleSubmit = async (e?: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault(); // Prevent default form submission behavior

    // Prepare the form data
    const menuData = {
      name,
      description,
      submenus,
    };

    // Simulate form submission (e.g., logging to the console or sending data to an API)
    console.log("Submitted Menu Data:", menuData);

    // Optionally, you can reset the form after submission
    setName("");
    setDescription("");
    setSubmenus([]);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-semibold mb-6">Menu Creation Form</h1>

      {/* Render the SubmenuForm component */}
      <MenuForm
        name={name}
        setName={setName}
        description={description}
        setDescription={setDescription}
        submenus={submenus}
        setSubmenus={setSubmenus}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

export default TestPage;
