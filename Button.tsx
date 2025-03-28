
interface Props {
    showForms: () => void;
    showUsers: () => void;
  }
  
  export default function Button({ showForms, showUsers }: Props) {
    return (
      <>
        <button onClick={showForms} className="btn">forms</button>
        <button onClick={showUsers} className="btn2">Users</button>
      </>
    );
  }
  