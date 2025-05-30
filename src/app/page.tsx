'use client'
import Navbar from "@/components/Navbar/index"
import Footer from "@/components/Footer/index"
import Dashboard from "@/components/Courses/Dashboard";
import GetUserCourses from "@/components/Courses/GetUserCourses";
import UserHomePage from "@/components/UI/UserHomePage";
import GetAdminCourses from "@/components/Courses/GetAdminCourses";

export default function Home() {
  return (
    <main>
      <Dashboard />
    </main>
  );
}
