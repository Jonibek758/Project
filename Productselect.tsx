

interface Props {
    proselect: { selectId: number; select: string }[];
    setSelectedCategory: (category: string) => void;
  }
  
  export default function ProductSelect({ proselect, setSelectedCategory }: Props) {
    return (
      <select onChange={(e) => setSelectedCategory(e.target.value)} style={{ marginBottom: "20px" }}>
        <option value="">Barcha mahsulotlar</option>
        {proselect.map((item) => (
          <option key={item.selectId} value={item.select}>
            {item.select}
          </option>
        ))}
      </select>
    );
  }
  