"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { CheckCircle, MapPin, Clock, Search, Calendar, DollarSign, User, Camera } from "lucide-react"

interface SolvedIssue {
  id: string
  location: string
  severity: "low" | "medium" | "high" | "critical"
  reportedDate: string
  solvedDate: string
  assignedEngineer: string
  actualCost: number
  beforeImage: string
  afterImage: string
  ward: string
  workOrderId: string
  repairMethod: string
}

export function SolvedIssuesArchive() {
  const [searchTerm, setSearchTerm] = useState("")
  const [dateFilter, setDateFilter] = useState<string>("all")

  // Mock solved issues data
  const solvedIssues: SolvedIssue[] = [
    {
      id: "SI-2024-001",
      location: "Broadway & 42nd Street",
      severity: "critical",
      reportedDate: "2024-01-10T08:00:00Z",
      solvedDate: "2024-01-12T16:30:00Z",
      assignedEngineer: "John Smith",
      actualCost: 4200,
      beforeImage: "/pothole.png",
      afterImage: "/placeholder.svg?height=100&width=150&text=After+Repair",
      ward: "Ward 5",
      workOrderId: "WO-2024-045",
      repairMethod: "Hot Mix Asphalt Patching",
    },
    {
      id: "SI-2024-002",
      location: "Park Avenue & 23rd Street",
      severity: "high",
      reportedDate: "2024-01-08T12:15:00Z",
      solvedDate: "2024-01-11T14:20:00Z",
      assignedEngineer: "Maria Garcia",
      actualCost: 2800,
      beforeImage: "/damaged-road-close-up.png",
      afterImage: "/placeholder.svg?height=100&width=150&text=After+Repair",
      ward: "Ward 3",
      workOrderId: "WO-2024-043",
      repairMethod: "Cold Mix Patching",
    },
    {
      id: "SI-2024-003",
      location: "Elm Street near Hospital",
      severity: "medium",
      reportedDate: "2024-01-05T09:30:00Z",
      solvedDate: "2024-01-09T11:45:00Z",
      assignedEngineer: "David Chen",
      actualCost: 1500,
      beforeImage: "/road-cracks.png",
      afterImage: "/placeholder.svg?height=100&width=150&text=After+Repair",
      ward: "Ward 7",
      workOrderId: "WO-2024-041",
      repairMethod: "Crack Sealing",
    },
  ]

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "bg-red-500 text-white"
      case "high":
        return "bg-orange-500 text-white"
      case "medium":
        return "bg-yellow-500 text-black"
      case "low":
        return "bg-green-500 text-white"
      default:
        return "bg-gray-500 text-white"
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const getRepairDuration = (reportedDate: string, solvedDate: string) => {
    const days = Math.ceil((new Date(solvedDate).getTime() - new Date(reportedDate).getTime()) / (1000 * 60 * 60 * 24))
    return `${days} day${days !== 1 ? "s" : ""}`
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Solved Issues Archive</h2>
          <p className="text-muted-foreground">Track completed repairs with before/after documentation</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Calendar className="h-4 w-4 mr-2" />
            Export Report
          </Button>
          <Button>
            <Camera className="h-4 w-4 mr-2" />
            Add Documentation
          </Button>
        </div>
      </div>

      {/* Search and Filter Controls */}
      <div className="flex flex-wrap gap-4">
        <div className="relative flex-1 min-w-64">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search solved issues..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        <select
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
          className="px-3 py-2 border rounded-md bg-white"
        >
          <option value="all">All Time</option>
          <option value="week">This Week</option>
          <option value="month">This Month</option>
          <option value="quarter">This Quarter</option>
        </select>
      </div>

      {/* Solved Issues Grid */}
      <div className="grid gap-6">
        {solvedIssues.map((issue) => (
          <Card key={issue.id} className="hover-lift transition-all duration-200">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-500" />
                  <div>
                    <h3 className="text-lg font-semibold">{issue.location}</h3>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground mt-1">
                      <span className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        {issue.ward}
                      </span>
                      <span className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        Completed {formatDate(issue.solvedDate)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-end space-y-2">
                  <Badge className={getSeverityColor(issue.severity)}>{issue.severity.toUpperCase()}</Badge>
                  <Badge className="bg-green-100 text-green-800">COMPLETED</Badge>
                </div>
              </div>

              {/* Before/After Images */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-2">Before Repair</p>
                  <img
                    src={issue.beforeImage || "/placeholder.svg"}
                    alt="Before repair"
                    className="w-full h-32 object-cover rounded-lg border"
                  />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-2">After Repair</p>
                  <img
                    src={issue.afterImage || "/placeholder.svg"}
                    alt="After repair"
                    className="w-full h-32 object-cover rounded-lg border"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Issue ID</p>
                  <p className="font-mono text-sm">{issue.id}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Engineer</p>
                  <p className="text-sm flex items-center">
                    <User className="h-3 w-3 mr-1" />
                    {issue.assignedEngineer}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Repair Duration</p>
                  <p className="text-sm">{getRepairDuration(issue.reportedDate, issue.solvedDate)}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Actual Cost</p>
                  <p className="text-sm font-semibold text-green-600 flex items-center">
                    <DollarSign className="h-3 w-3 mr-1" />
                    {issue.actualCost.toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Work Order</p>
                  <p className="text-xs font-mono">{issue.workOrderId}</p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t">
                <div>
                  <p className="text-sm text-muted-foreground">
                    Repair Method: <span className="font-medium">{issue.repairMethod}</span>
                  </p>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    View Full Report
                  </Button>
                  <Button variant="outline" size="sm">
                    Download Images
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
