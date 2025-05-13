'use client'
import Navbar from "@/components/Navbar/index"
import Footer from "@/components/Footer/index"
import Dashboard from "@/components/Courses/Dashboard";
import TestimonialsCard from "@/components/UI/TestimonialsCard";
import CustomCard from "@/components/UI/CustomCard";
import Pricing from "@/components/UI/Pricing";
import HomePage from "@/components/Courses/Home";





export default function Home() {


  return (
    <main>
      <Navbar />
      <HomePage />
      <Footer />
    </main>
  );
}
