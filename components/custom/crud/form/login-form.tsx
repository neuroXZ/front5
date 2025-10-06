"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { API_BASE_URL } from "@/lib/api"
import axios from "axios"
import Image from "next/image"
import { Eye, EyeOff } from "lucide-react"

export function LoginForm() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [userType, setUserType] = useState("admin");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Logging in with", { username, password, userType });
    try {
      const res = await axios.post(`${API_BASE_URL}/auth/login`, {
        username: username, // Guna username untuk both admin and staff
        password,
        userType: userType,
      });
      console.log(res.data);
      if (res.data.token) {
        setToken(res.data.token);
        document.cookie = `token=${res.data.token}; path=/;`
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("userType", userType);
        
        // Conditional redirect based on userType
        if (userType === "admin") {
          window.location.href = "/admin/dashboard";
        } else {
          window.location.href = "/staff/dashboard";
        }
        alert("Login success!");
      } else {
        alert("Token invalid or unavailable")
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Login failed");
    }
  };

  const getProfile = async () => {
    const token = localStorage.getItem("token");
    const storedUserType = localStorage.getItem("userType");
    if (!token) return alert("No token found");
    
    try {
      // Guna endpoint yang sesuai based on user type
      const endpoint = storedUserType === "admin" ? "/admin" : "/staff";
      const res = await axios.get(`${API_BASE_URL}${endpoint}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert(JSON.stringify(res.data));
    } catch {
      alert("Not authorized");
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form onSubmit={handleLogin} className="flex flex-col gap-3">
            <div className="flex flex-col gap-5 m-3">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">TNA Pro Login</h1>
                <p className="text-muted-foreground text-balance">
                  Login to your TNA Pro account
                </p>
              </div>
              <div className="grid gap-3">
                <Label htmlFor="userType">Login As</Label>
                <select
                  value={userType}
                  onChange={(e) => setUserType(e.target.value)}
                  className="border p-2 rounded"
                >
                  <option value="admin">Admin</option>
                  <option value="staff">Staff</option>
                </select>
              </div>
              <div className="grid gap-3">
                <Label htmlFor="username">Username</Label>
                <input
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="border p-2 rounded"
                  required
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border p-2 w-full pr-10 rounded"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-2 top-1/2 -translate-y-1/2"
                    tabIndex={-1}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
              <Button type="submit" className="w-full">
                Login
              </Button>
              <div className="text-center text-sm">
              </div>
            </div>
          </form>
          {token && (
            <button
              onClick={getProfile}
              className="mt-4 bg-green-500 text-white p-2 rounded"
            >
              Get Profile
            </button>
          )}
          <div className="bg-muted relative hidden md:block">
            <Image
              src="/login.jpg"
              width={500}
              height={500}
              alt="login-image"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>
      <div className="text-center text-sm text-muted-foreground">
        &copy; {new Date().getFullYear()} TNA Pro Version 2. All rights reserved.
      </div>
    </div>
  )
}