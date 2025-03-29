
import { useState } from "react";
import ProductForm from "./component/ProductForm";
import ProductSelect from "./component/Productselect";
import ProductList from "./component/ProductList";

interface Podec {
  id: number;
  title: string;
  amount: number;
  category: string;
}

interface Select {
  selectId: number;
  select: string;
}

export default function App() {
  const [proselect, setProselect] = useState<Select[]>([
    { selectId: 1, select: "Shirinliklar" },
    { selectId: 2, select: "Ichimliklar" },
    { selectId: 3, select: "Fast food" },
  ]);

  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [products, setProducts] = useState<Podec[]>([
    { id: 1, title: "Coca Cola", amount: 300, category: "Ichimliklar" },
    { id: 2, title: "Fanta", amount: 500, category: "Ichimliklar" },
    { id: 3, title: "Chocolate", amount: 200, category: "Shirinliklar" },
    { id: 4, title: "Burger", amount: 1000, category: "Fast food" },
  ]);

  const addProduct = (title: string, amount: number, category: string) => {
    const newProduct: Podec = {
      id: products.length + 1,
      title,
      amount,
      category,
    };
    setProducts([...products, newProduct]);
  };

  const deleteProduct = (id: number) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  const filteredProducts = selectedCategory
    ? products.filter((product) => product.category === selectedCategory)
    : products;

  return (
    <div className="container" style={{ padding: "20px" }}>
      <h1>Products</h1>
      <ProductForm proselect={proselect} addProduct={addProduct} />
      <ProductSelect proselect={proselect} setSelectedCategory={setSelectedCategory} />
      <ProductList products={filteredProducts} deleteProduct={deleteProduct} />
    </div>
  );
}

