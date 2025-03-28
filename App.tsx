import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod"; 
import { zodResolver } from "@hookform/resolvers/zod";
import imglent from "./imglent.png";
import Users from "./component/Users";
import Button from "./component/Button";



const schema = z.object({
  name: z.string().min(1, "Ism majburiy!"),
  email: z.string().email("Email noto‘g‘ri!"),
  password: z
    .string()
    .min(8, "Parol kamida 8 ta belgidan iborat bo‘lishi kerak!")
    .regex(/[!@#$%^&*]/, "Parolda kamida 1 ta maxsus belgi bo‘lishi kerak!"),
  returnpassword: z.string().min(1, "Parolni qayta kiriting!"),
}).refine((data) => data.password === data.returnpassword, {
  message: "Parollar mos kelmadi!",
  path: ["returnpassword"],
});

type User = z.infer<typeof schema>;

export default function App() {
  const {register,handleSubmit,reset,formState: { errors },} = useForm<User>({resolver: zodResolver(schema), });

  const [users, setUsers] = useState<User[]>([]);
  const [showForms, setShowForms] = useState(true);

  const onSubmit = (data: User) => {

    setUsers([...users, data]);
    reset();
  };

  return (
    <>

      <Button
        showForms={() => setShowForms(true)}
        showUsers={() => setShowForms(false)}
      />

      <img src={imglent} alt="Rasm" />

      <div className="center">
        <div className="marg">
          {showForms ? (
            <form onSubmit={handleSubmit(onSubmit)}>
             
              <label htmlFor="name">Name</label>
              <input {...register("name")} id="name" type="text" placeholder="Name" />
              <p className="error">{errors.name?.message}</p>

              <label htmlFor="email">Email</label>
              <input {...register("email")} id="email" type="email" placeholder="Email" />
              <p className="error">{errors.email?.message}</p>

              <label htmlFor="password">Password</label>
              <input {...register("password")} id="password" type="password" placeholder="Password" />
              <p className="error">{errors.password?.message}</p>

              <label htmlFor="returnpassword">Confirm Password</label>
              <input {...register("returnpassword")} id="returnpassword" type="password" placeholder="Confirm Password" />
              <p className="error">{errors.returnpassword?.message}</p>

              <button type="submit">Save</button>
            </form>
          ) : (
            <Users users={users} />
          )}
        </div>
      </div>
    </>
  );
}
