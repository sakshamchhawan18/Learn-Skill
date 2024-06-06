import RoleSelection from "@/components/role-selection";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between">
      <h1 className="text-4xl m-16 ">Join as a student or a teacher</h1>
      <RoleSelection />
      Already have an account?<button className=" underline text-blue-400 ">Login</button>
      {/* <RoleSelection /> */}
    </main>
  );
}
