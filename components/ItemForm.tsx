const ItemForm: React.FC<{
    name: string;
    setName: React.Dispatch<React.SetStateAction<string>>;
    price: number | string;
    setPrice: React.Dispatch<React.SetStateAction<number | string>>;
    description: string;
    setDescription: React.Dispatch<React.SetStateAction<string>>;
    handleSubmit: (e?: React.FormEvent<HTMLFormElement>) => Promise<void>;
  }> = ({ name, setName, price, setPrice, description, setDescription, handleSubmit }) => (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      <div>
        <label htmlFor="name">Name:</label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="price">Price:</label>
        <input
          id="price"
          type="number"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
        />
      </div>
      <div>
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );

  export default ItemForm;