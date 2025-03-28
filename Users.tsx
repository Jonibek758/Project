
interface Props {
  users: { name: string; email: string }[]; 
}

export default function Users({ users }: Props) {
  return (
    <>
      <div className="marg">
        <h2>Foydalanuvchilar</h2>
        <ul>
          {users.map((user, index) => (
            <li key={index}>
              <strong>{user.name}</strong> - {user.email}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
