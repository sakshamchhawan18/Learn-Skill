import { NavbarDemo } from "@/components/navbar";
import {Livebstart} from"@/components/livebstart";
import Footer  from "@/components/footer";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      
            
        <NavbarDemo />
        <Livebstart />
        <Footer />
    </main>
  );
}
