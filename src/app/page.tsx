'use client'
import Navbar from "@/components/Navbar/index"
import Footer from "@/components/Footer/index"
import Dashboard from "@/components/Courses/Dashboard";






export default function Home() {


  return (
    <main>
      <Navbar />
      <Dashboard />
      <Footer />
    </main>
  );
}
