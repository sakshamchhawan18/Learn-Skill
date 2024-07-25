"use client";
import { NavbarDemo } from "@/components/navbar";
import Footer from "@/components/footer";
import Herosection from "@/components/herosection";
import { WobbleCardDemo } from "@/components/card";
import { Text } from "@/components/text";
import { useRouter } from "next/navigation";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "@/firebase/firebase"; // Ensure db is exported from firebase setup
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";

export default function Home() {
  const router = useRouter();
  const [user, loading, error] = useAuthState(auth);
  const [pageLoading, setPageLoading] = useState(true);

  useEffect(() => {
    const checkUserType = async () => {
      if (user) {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          if (userData.userType === "student") {
            router.push("/dashboard-student");
          } else if (userData.userType === "teacher") {
            router.push("/dashboard-teacher");
          } else {
            setPageLoading(false);
          }
        } else {
          setPageLoading(false);
        }
      } else if (!loading) {
        setPageLoading(false);
      }
    };

    checkUserType();
  }, [user, router, loading]);

  if (pageLoading) return null;

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
