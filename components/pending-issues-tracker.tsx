"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { AlertTriangle, MapPin, Clock, Search, Eye, UserPlus } from "lucide-react"

interface PendingIssue {
  id: string
  location: string
  coordinates: { lat: number; lng: number }
  severity: "low" | "medium" | "high" | "critical"
  reportedDate: string
  reportedBy: string
  estimatedCost: number
  priority: "low" | "medium" | "high"
  ward: string
  description: string
  imageUrl?: string
}

export function PendingIssuesTracker() {
  const [searchTerm, setSearchTerm] = useState("")
  const [severityFilter, setSeverityFilter] = useState<string>("all")
  const [sortBy, setSortBy] = useState<string>("date")

  // Mock pending issues data
  const pendingIssues: PendingIssue[] = [
    {
      id: "PI-2024-001",
      location: "Main Street & 5th Avenue",
      coordinates: { lat: 40.7128, lng: -74.006 },
      severity: "critical",
      reportedDate: "2024-01-15T10:30:00Z",
      reportedBy: "Citizen Report",
      estimatedCost: 4500,
      priority: "high",
      ward: "Ward 12",
      description: "Large pothole causing traffic disruption",
      imageUrl: "/pothole.png",
    },
    {
      id: "PI-2024-002",
      location: "Oak Street near School",
      coordinates: { lat: 40.7589, lng: -73.9851 },
      severity: "high",
      reportedDate: "2024-01-14T14:20:00Z",
      reportedBy: "AI Detection",
      estimatedCost: 2200,
      priority: "high",
      ward: "Ward 8",
      description: "Multiple potholes in school zone",
      imageUrl: "/damaged-road-close-up.png",
    },
    {
      id: "PI-2024-003",
      location: "Industrial Park Road",
      coordinates: { lat: 40.6892, lng: -74.0445 },
      severity: "medium",
      reportedDate: "2024-01-13T09:15:00Z",
      reportedBy: "Maintenance Team",
      estimatedCost: 1200,
      priority: "medium",
      ward: "Ward 15",
      description: "Surface cracking and minor potholes",
      imageUrl: "/road-cracks.png",
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

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const getDaysAgo = (dateString: string) => {
    const days = Math.floor((Date.now() - new Date(dateString).getTime()) / (1000 * 60 * 60 * 24))
    return days === 0 ? "Today" : `${days} days ago`
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Pending Issues Tracker</h2>
          <p className="text-muted-foreground">Monitor and manage unresolved pothole reports</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90">
          <UserPlus className="h-4 w-4 mr-2" />
          Assign Engineer
        </Button>
      </div>

      {/* Search and Filter Controls */}
      <div className="flex flex-wrap gap-4">
        <div className="relative flex-1 min-w-64">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search by location, ID, or ward..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        <select
          value={severityFilter}
          onChange={(e) => setSeverityFilter(e.target.value)}
          className="px-3 py-2 border rounded-md bg-white"
        >
          <option value="all">All Severities</option>
          <option value="critical">Critical</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-3 py-2 border rounded-md bg-white"
        >
          <option value="date">Sort by Date</option>
          <option value="severity">Sort by Severity</option>
          <option value="cost">Sort by Cost</option>
          <option value="ward">Sort by Ward</option>
        </select>
      </div>

      {/* Issues Grid */}
      <div className="grid gap-6">
        {pendingIssues.map((issue) => (
          <Card key={issue.id} className="hover-lift transition-all duration-200">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start space-x-4">
                  <img
                    src={issue.imageUrl || "/placeholder.svg"}
                    alt="Issue location"
                    className="w-24 h-16 object-cover rounded-lg"
                  />
                  <div>
                    <h3 className="text-lg font-semibold">{issue.location}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{issue.description}</p>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <span className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        {issue.ward}
                      </span>
                      <span className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {getDaysAgo(issue.reportedDate)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-end space-y-2">
                  <Badge className={getSeverityColor(issue.severity)}>{issue.severity.toUpperCase()}</Badge>
                  <Badge className={getPriorityColor(issue.priority)}>{issue.priority.toUpperCase()} PRIORITY</Badge>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Issue ID</p>
                  <p className="font-mono text-sm">{issue.id}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Reported By</p>
                  <p className="text-sm">{issue.reportedBy}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Estimated Cost</p>
                  <p className="text-sm font-semibold text-green-600">${issue.estimatedCost.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Coordinates</p>
                  <p className="text-xs font-mono">
                    {issue.coordinates.lat.toFixed(4)}, {issue.coordinates.lng.toFixed(4)}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t">
                <p className="text-sm text-muted-foreground">Reported: {formatDate(issue.reportedDate)}</p>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-2" />
                    View Details
                  </Button>
                  <Button size="sm">
                    <UserPlus className="h-4 w-4 mr-2" />
                    Assign
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {pendingIssues.length === 0 && (
        <div className="text-center py-12">
          <AlertTriangle className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-2">No Pending Issues</h3>
          <p className="text-muted-foreground">All reported issues have been resolved or assigned.</p>
        </div>
      )}
    </div>
  )
}
