"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Mail, Phone, Calendar, MapPin, Building } from "lucide-react";

export default function StaffProfile() {
  // Mock profile data - replace with actual API call
  const profileData = {
    name: "John Doe",
    email: "john.doe@company.com",
    phone: "+60123456789",
    position: "Software Developer",
    department: "Information Technology",
    joinDate: "January 15, 2023",
    location: "Kuala Lumpur, Malaysia",
    employeeId: "EMP001",
    supervisor: "Jane Smith"
  };

  return (
    <div className="p-6 max-w-4xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">My Profile</h1>
        <p className="text-muted-foreground">View and manage your profile information</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Personal Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground">Name</label>
              <p className="text-lg">{profileData.name}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Employee ID</label>
              <p className="text-lg">{profileData.employeeId}</p>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <span>{profileData.email}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <span>{profileData.phone}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span>{profileData.location}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building className="h-5 w-5" />
              Work Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground">Position</label>
              <p className="text-lg">{profileData.position}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Department</label>
              <p className="text-lg">{profileData.department}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Supervisor</label>
              <p className="text-lg">{profileData.supervisor}</p>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span>Joined {profileData.joinDate}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Skills & Competencies</CardTitle>
          <CardDescription>Your current skill levels and competencies</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">JavaScript</span>
                <span className="text-sm text-muted-foreground">Advanced</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{width: '85%'}}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">React</span>
                <span className="text-sm text-muted-foreground">Intermediate</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{width: '70%'}}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">Communication</span>
                <span className="text-sm text-muted-foreground">Advanced</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{width: '90%'}}></div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}