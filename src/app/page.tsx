'use client'
import Navbar from "@/components/Navbar/index"
import Footer from "@/components/Footer/index"
import Login from "@/app/login/page"

export default function Home() {
  return (
    <main>
      <Navbar />
      <Login />
      <Footer />
    </main>
  );
}
