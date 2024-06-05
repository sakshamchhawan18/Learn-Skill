import { NavbarDemo } from "@/components/navbar";
import Footer  from "@/components/footer";
import Herosection from "@/components/herosection";
import { WobbleCard } from "@/ui/wobble-card";
import { WobbleCardDemo } from "@/components/card";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <NavbarDemo />
        <Herosection />
        <WobbleCardDemo />
        <Footer />
    </main>
  );
}
