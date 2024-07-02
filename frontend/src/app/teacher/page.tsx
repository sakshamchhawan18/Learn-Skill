import RoleSelection from "@/components/role-selection";
import { SignupFormDemo } from "./teacher-signup-form";

import Image from "next/image";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between">
      <h1 className=" text-3xl mt-7">Sign up to teach!</h1>
      <SignupFormDemo />
    </main>
  );
}
