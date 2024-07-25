import RoleSelection from "@/components/role-selection";


import Image from "next/image";
import { SignupFormDemo } from "./student-signup-form";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between">
      <h1 className=" text-3xl mt-7">Sign up to learn!</h1>
      <SignupFormDemo />
    </main>
  );
}
