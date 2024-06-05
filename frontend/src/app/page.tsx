import { NavbarDemo } from "@/components/navbar";
import Footer  from "@/components/footer";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <h1>njonc</h1>
        <NavbarDemo /> Hi
        <Footer />
    </main>
  );
}
