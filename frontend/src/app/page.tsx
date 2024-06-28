import { NavbarDemo } from "@/components/navbar";
import Footer  from "@/components/footer";
import Herosection from "@/components/herosection";
import { WobbleCardDemo } from "@/components/card";
import { Coursesb } from "@/components/coursesb";
import { Text } from "@/components/text";

export default function Home() {
  
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
