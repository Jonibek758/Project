interface Podec {
    id: number;
    title: string;
    amount: number;
    category: string;
  }
  
  interface Props {
    products: Podec[];
    deleteProduct: (id: number) => void;
  }
  
  export default function ProductList({ products, deleteProduct }: Props) {
    return (
      <div>
        {products.map((product) => (
          <div className="read" key={product.id} style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
            <span>{product.title}</span>
            <span className="mer">{product.amount} so'm</span>
            <span className="mend">{product.category}</span>
            <i
              onClick={() => deleteProduct(product.id)}
              className="bx bx-message-alt-minus"
              style={{ cursor: "pointer", color: "red" }}
            ></i>
          </div>
        ))}
      </div>
    );
  }
  