"use client";

import { useEffect, useState } from "react";
import { API_BASE_URL } from "@/lib/api";
import Cookies from "js-cookie";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, FileText, Calendar, Award } from "lucide-react";

type DashboardStats = {
  totalEmployees?: number;
  totalAssessments?: number;
  upcomingTrainings?: number;
  completedCertifications?: number;
};

export default function StaffDashboard() {
  const [stats, setStats] = useState<DashboardStats>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = Cookies.get("token");
        // Mock data for now - replace with actual API calls
        setStats({
          totalEmployees: 150,
          totalAssessments: 25,
          upcomingTrainings: 8,
          completedCertifications: 45
        });
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return <div className="p-6">Loading dashboard...</div>;
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Staff Dashboard</h1>
        <p className="text-muted-foreground">Welcome to your staff portal</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Employees</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalEmployees}</div>
            <p className="text-xs text-muted-foreground">
              Active employees in system
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Assessments</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalAssessments}</div>
            <p className="text-xs text-muted-foreground">
              Active assessments
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Trainings</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.upcomingTrainings}</div>
            <p className="text-xs text-muted-foreground">
              Scheduled this month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Certifications</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.completedCertifications}</div>
            <p className="text-xs text-muted-foreground">
              Completed this year
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
            <CardDescription>Latest updates in the system</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border-l-2 border-blue-500 pl-4">
                <p className="text-sm font-medium">New assessment created</p>
                <p className="text-xs text-muted-foreground">2 hours ago</p>
              </div>
              <div className="border-l-2 border-green-500 pl-4">
                <p className="text-sm font-medium">Training completed</p>
                <p className="text-xs text-muted-foreground">1 day ago</p>
              </div>
              <div className="border-l-2 border-orange-500 pl-4">
                <p className="text-sm font-medium">Employee profile updated</p>
                <p className="text-xs text-muted-foreground">3 days ago</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Frequently used features</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-2">
              <button className="text-left p-3 border rounded hover:bg-muted">
                View My Profile
              </button>
              <button className="text-left p-3 border rounded hover:bg-muted">
                My Assessments
              </button>
              <button className="text-left p-3 border rounded hover:bg-muted">
                Training Schedule
              </button>
              <button className="text-left p-3 border rounded hover:bg-muted">
                Request Leave
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}