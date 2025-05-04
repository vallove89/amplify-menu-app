import React from "react";
import MenuForm from "./MenuForm";


interface MenuFormProps {
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  submenus: string[];
  setSubmenus: React.Dispatch<React.SetStateAction<string[]>>;
  description: string;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
  handleSubmit: (e?: React.FormEvent<HTMLFormElement>) => Promise<void>;
}

const submenuOptions = [
  "Appetizers",
  "Main Course",
  "Beverages",
  "Desserts",
  "Specials",
];



const SubmenuForm: React.FC<MenuFormProps> = ({
  name,
  setName,
  submenus,
  setSubmenus,
  description,
  setDescription,
  handleSubmit,
}) => {

  const updateSubmenu = (index: number, value: string) => {
    const updated = [...submenus];
    updated[index] = value;
    setSubmenus(updated);
  };

  const addSubmenu = () => {
    setSubmenus([...submenus, ""]);
  };

  const removeSubmenu = (index: number) => {
    const updated = [...submenus];
    updated.splice(index, 1);
    setSubmenus(updated);
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
      className="max-w-md mx-auto p-6 bg-white rounded-lg shadow space-y-6"
    >
      {/* Name */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 w-full border rounded-md p-2"
        />
      </div>

      {/* Description */}
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mt-1 w-full border rounded-md p-2"
        />
      </div>

      {/* Submenus - Now Dropdown */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Submenus</label>
        {submenus.map((menu, index) => (
          <div key={index} className="flex items-center space-x-2 mt-2">
            <select
              value={menu}
              onChange={(e) => updateSubmenu(index, e.target.value)}
              className="flex-1 border rounded-md p-2"
            >
              <option value="">Select submenu</option>
              {submenuOptions.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
            <button
              type="button"
              onClick={() => removeSubmenu(index)}
              className="text-red-500 hover:text-red-700"
            >
              ✕
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={addSubmenu}
          className="mt-2 text-sm text-blue-600 hover:underline"
        >
          + Add Submenu
        </button>
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
      >
        Submit
      </button>
    </form>
  );
};

export default MenuForm;
