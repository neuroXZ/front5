"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, Clock, CheckCircle, AlertCircle } from "lucide-react";

export default function StaffAssessments() {
  // Helper function to format date consistently
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0]; // Returns YYYY-MM-DD format
  };

  // Mock assessments data - replace with actual API call
  const assessments = [
    {
      id: 1,
      title: "Annual Performance Review 2024",
      description: "Comprehensive performance evaluation for the year 2024",
      status: "completed",
      dueDate: "2024-12-31",
      completedDate: "2024-12-15",
      score: 85
    },
    {
      id: 2,
      title: "Technical Skills Assessment",
      description: "Evaluation of technical competencies and programming skills",
      status: "in-progress",
      dueDate: "2024-10-30",
      completedDate: null,
      score: null
    },
    {
      id: 3,
      title: "Leadership Potential Evaluation",
      description: "Assessment of leadership qualities and potential for growth",
      status: "pending",
      dueDate: "2024-11-15",
      completedDate: null,
      score: null
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-500"><CheckCircle className="h-3 w-3 mr-1" />Completed</Badge>;
      case "in-progress":
        return <Badge className="bg-blue-500"><Clock className="h-3 w-3 mr-1" />In Progress</Badge>;
      case "pending":
        return <Badge className="bg-gray-500"><AlertCircle className="h-3 w-3 mr-1" />Pending</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">My Assessments</h1>
        <p className="text-muted-foreground">Track your assessment progress and results</p>
      </div>

      <div className="grid gap-6">
        {assessments.map((assessment) => (
          <Card key={assessment.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    {assessment.title}
                  </CardTitle>
                  <CardDescription className="mt-2">
                    {assessment.description}
                  </CardDescription>
                </div>
                {getStatusBadge(assessment.status)}
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Due Date</label>
                  <p className="text-lg">{formatDate(assessment.dueDate)}</p>
                </div>
                {assessment.completedDate && (
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Completed Date</label>
                    <p className="text-lg">{formatDate(assessment.completedDate)}</p>
                  </div>
                )}
                {assessment.score && (
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Score</label>
                    <p className="text-lg font-bold text-green-600">{assessment.score}%</p>
                  </div>
                )}
              </div>
              {assessment.status === "pending" && (
                <div className="mt-4">
                  <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                    Start Assessment
                  </button>
                </div>
              )}
              {assessment.status === "in-progress" && (
                <div className="mt-4">
                  <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                    Continue Assessment
                  </button>
                </div>
              )}
              {assessment.status === "completed" && (
                <div className="mt-4">
                  <button className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">
                    View Results
                  </button>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}