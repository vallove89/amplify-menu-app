import React from "react";


interface SubmenuFormProps {
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  menus: string[];
  setMenus: React.Dispatch<React.SetStateAction<string[]>>;
  items: string[];
  setItems: React.Dispatch<React.SetStateAction<string[]>>;
  description: string;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
  handleSubmit: (e?: React.FormEvent<HTMLFormElement>) => Promise<void>;
}

const menuOptions = [
  "Appetizers",
  "Main Course",
  "Beverages",
  "Desserts",
  "Specials",
];

const itemOptions = [
    "Burger",
    "Ice Cream",
    "Beer",
    "salad",
    "Pizza",
  ];

const SubmenuForm: React.FC<SubmenuFormProps> = ({
  name,
  setName,
  menus,
  setMenus,
  items,
  setItems,
  description,
  setDescription,
  handleSubmit,
}) => {

  const updateMenu = (index: number, value: string) => {
    const updated = [...menus];
    updated[index] = value;
    setMenus(updated);
  };

  const addMenu = () => {
    setMenus([...menus, ""]);
  };

  const removeMenu = (index: number) => {
    const updated = [...menus];
    updated.splice(index, 1);
    setMenus(updated);
  };

  const updateItem = (index: number, value: string) => {
    const updated = [...items];
    updated[index] = value;
    setItems(updated);
  };

  const addItem = () => {
    setItems([...items, ""]);
  };

  const removeItem = (index: number) => {
    const updated = [...items];
    updated.splice(index, 1);
    setItems(updated);
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

      {/* Menus - Now Dropdown */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Menus</label>
        {menus.map((menu, index) => (
          <div key={index} className="flex items-center space-x-2 mt-2">
            <select
              value={menu}
              onChange={(e) => updateMenu(index, e.target.value)}
              className="flex-1 border rounded-md p-2"
            >
              <option value="">Select menu</option>
              {menuOptions.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
            <button
              type="button"
              onClick={() => removeMenu(index)}
              className="text-red-500 hover:text-red-700"
            >
              ✕
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={addMenu}
          className="mt-2 text-sm text-blue-600 hover:underline"
        >
          + Add Menu
        </button>
      </div>

        {/* Items - Now Dropdown */}
        <div>
        <label className="block text-sm font-medium text-gray-700">Items</label>
        {items.map((item, index) => (
          <div key={index} className="flex items-center space-x-2 mt-2">
            <select
              value={item}
              onChange={(e) => updateItem(index, e.target.value)}
              className="flex-1 border rounded-md p-2"
            >
              <option value="">Select item</option>
              {itemOptions.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
            <button
              type="button"
              onClick={() => removeItem(index)}
              className="text-red-500 hover:text-red-700"
            >
              ✕
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={addItem}
          className="mt-2 text-sm text-blue-600 hover:underline"
        >
          + Add Item
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

export default SubmenuForm;
