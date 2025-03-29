import { useState } from "react";

interface Props {
  proselect: { selectId: number; select: string }[];
  addProduct: (title: string, amount: number, category: string) => void;
}

export default function ProductForm({ proselect, addProduct }: Props) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
   
    addProduct(title, parseInt(amount), category);
    setTitle("");
    setAmount("");
    setCategory("");
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
      <input
        type="text"
        placeholder="Mahsulot nomi"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="number"
        placeholder="Narxi"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="">Kategoriya tanlang</option>
        {proselect.map((item) => (
          <option key={item.selectId} value={item.select}>
            {item.select}
          </option>
        ))}
      </select>
      <button type="submit">Qo‘shish</button>
    </form>
  );
}
