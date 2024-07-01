"use client"
import { NavbarDemo } from "@/components/navbar";
import Footer from "@/components/footer";
import Herosection from "@/components/herosection";
import { WobbleCardDemo } from "@/components/card";
import { Coursesb } from "@/components/coursesb";
import { Text } from "@/components/text";
import { useRouter } from "next/navigation";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/firebase";
import { useEffect, useState } from "react";

export default function Home() {
  const router = useRouter();
  const [user, loading, error] = useAuthState(auth);
  const [pageLoading, setPageLoading] = useState(true);
  useEffect(() => {
    if (user) router.push("/dashboard");
    if (!loading && !user) setPageLoading(false);
  }, [user, router, loading]);
  if(pageLoading) return null;
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <NavbarDemo />
      <Herosection />
      <WobbleCardDemo />
      <Text />
      <Footer />
    </main>
  );
}
