import React from "react";

type PriceOption = {
  label: string;
  price: number | string;
};

interface ItemFormProps {
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  imageUrlEnabled: boolean;
  imageUrl: string;
  setImageUrl: React.Dispatch<React.SetStateAction<string>>;
  category: string;
  setCategory: React.Dispatch<React.SetStateAction<string>>;
  submenus: string[];
  setSubmenus: React.Dispatch<React.SetStateAction<string[]>>;
  priceOptions: PriceOption[];
  setPriceOptions: React.Dispatch<React.SetStateAction<PriceOption[]>>;
  description: string;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
  handleSubmit: (e?: React.FormEvent<HTMLFormElement>) => Promise<void>;
}

const categoryOptions = [
  "STARTERS",
  "ENTREES",
  "SIDES",
  "DESSERTS",
  "DRINKS_NON_ALCOHOLIC",
  "DRINKS_ALCOHOLIC",
];

const submenuOptions = [
  "Appetizers",
  "Main Course",
  "Beverages",
  "Desserts",
  "Specials",
];

const ItemForm: React.FC<ItemFormProps> = ({
  name,
  setName,
  imageUrlEnabled,
  imageUrl,
  setImageUrl,
  category,
  setCategory,
  submenus,
  setSubmenus,
  priceOptions,
  setPriceOptions,
  description,
  setDescription,
  handleSubmit,
}) => {
  const updatePriceOption = (
    index: number,
    field: keyof PriceOption,
    value: string | number
  ) => {
    const updated = [...priceOptions];
    updated[index] = {
      ...updated[index],
      [field]: field === "price" ? Number(value) : value,
    };
    setPriceOptions(updated);
  };

  const addPriceOption = () => {
    setPriceOptions([...priceOptions, { label: "", price: "" }]);
  };

  const removePriceOption = (index: number) => {
    const updated = [...priceOptions];
    updated.splice(index, 1);
    setPriceOptions(updated);
  };

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
      {/* Category */}
      <div>
        <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="mt-1 w-full border rounded-md p-2"
        >
          <option value="">Select category</option>
          {categoryOptions.map((cat) => (
            <option key={cat} value={cat}>{cat.replace(/_/g, " ")}</option>
          ))}
        </select>
      </div>

      {/* Image URL */}
      <div className={imageUrlEnabled ? "" : "hidden"}>
        <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700">Image URL</label>
        <input
          id="imageUrl"
          type="text"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          className="mt-1 w-full border rounded-md p-2"
        />
      </div>

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

      {/* Price Options */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Price Options</label>
        {priceOptions.map((option, index) => (
          <div key={index} className="flex items-center space-x-2 mt-2">
            <input
              type="text"
              placeholder="Label"
              value={option.label}
              onChange={(e) => updatePriceOption(index, "label", e.target.value)}
              className="flex-1 border rounded-md p-2"
            />
            <input
              type="number"
              placeholder="Price"
              value={option.price}
              onChange={(e) => updatePriceOption(index, "price", e.target.value)}
              className="w-24 border rounded-md p-2"
            />
            <button
              type="button"
              onClick={() => removePriceOption(index)}
              className="text-red-500 hover:text-red-700"
            >
              ✕
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={addPriceOption}
          className="mt-2 text-sm text-blue-600 hover:underline"
        >
          + Add Price Option
        </button>
      </div>

      {/* Submenus - Now Dropdown */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Submenus</label>
        {submenus.map((submenu, index) => (
          <div key={index} className="flex items-center space-x-2 mt-2">
            <select
              value={submenu}
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

export default ItemForm;
