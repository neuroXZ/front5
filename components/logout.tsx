"use client"

import Cookies from "js-cookie"
import { useRouter } from "next/navigation"

export default function LogoutButton() {
  const router = useRouter()

  const handleLogout = () => {
    Cookies.remove("token") // Buang token dari cookie
    router.push("/login")   // Redirect ke login page
  }

  return (
    <button onClick={handleLogout} className="w-full text-left">
      Logout
    </button>
  )
}