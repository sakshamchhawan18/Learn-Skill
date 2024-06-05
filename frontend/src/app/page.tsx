import { NavbarDemo } from "@/components/navbar";
import Footer  from "@/components/footer";
import Herosection from "@/components/herosection";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <NavbarDemo />
        <Herosection />
        <Footer />
    </main>
  );
}
