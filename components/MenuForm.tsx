import React from "react";


interface MenuFormProps {
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  description: string;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
  submenus: string[];
  setSubmenus: React.Dispatch<React.SetStateAction<string[]>>;
  handleSubmit: (e?: React.FormEvent<HTMLFormElement>) => Promise<void>;
}

const submenuOptions = [
  "Appetizers",
  "Main Course",
  "Beverages",
  "Desserts",
  "Specials",
];

const MenuForm: React.FC<MenuFormProps> = ({
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
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-6 space-y-4 bg-white rounded-md shadow">
      <h2 className="text-xl font-bold">Create or Edit Menu</h2>

      {/* Menu Name */}
      <div>
        <label className="block font-medium">Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full border p-2 rounded"
        />
      </div>

      {/* Menu Description */}
      <div>
        <label className="block font-medium">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border p-2 rounded"
        />
      </div>

        {/* Submenu - Now Dropdown */}
        <div>
        <label className="block text-sm font-medium text-gray-700">Submenus</label>
        {submenus.map((submunu, index) => (
          <div key={index} className="flex items-center space-x-2 mt-2">
            <select
              value={submunu}
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
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Save Menu
      </button>
    </form>
  );
}

export default MenuForm;