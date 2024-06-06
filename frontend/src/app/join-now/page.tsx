"use client"
import RoleSelection from "@/components/role-selection";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  
  const handleClick = () => {
    router.push('/login');
  };
  return (
    <main className="flex flex-col items-center justify-between">
      <h1 className="text-4xl m-16 ">Join as a student or a teacher</h1>
      <RoleSelection />
      <p className="text-md mb-3 pt-5 mt-10  ">Already have an account?</p>
      <button className=" underline text-md font-semibold text-gray-900 cursor-pointer w-40 p-2 bg-white shadow-md rounded-lg text-center hover:shadow-lg transition duration-300"  onClick={handleClick}>
        Login
      </button>
    </main>
  );
}
