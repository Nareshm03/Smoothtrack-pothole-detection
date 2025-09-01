"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { MapPin, Clock, Search, Plus, AlertTriangle, CheckCircle, User } from "lucide-react"

interface WorkOrder {
  id: string
  issueId: string
  location: string
  assignedEngineer: string
  priority: "low" | "medium" | "high"
  status: "assigned" | "in-progress" | "completed" | "overdue"
  deadline: string
  estimatedCost: number
  assignedDate: string
  ward: string
  description: string
  progress: number
}

export function WorkOrderManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")

  // Mock work orders data
  const workOrders: WorkOrder[] = [
    {
      id: "WO-2024-050",
      issueId: "PI-2024-001",
      location: "Main Street & 5th Avenue",
      assignedEngineer: "John Smith",
      priority: "high",
      status: "in-progress",
      deadline: "2024-01-20T17:00:00Z",
      estimatedCost: 4500,
      assignedDate: "2024-01-16T09:00:00Z",
      ward: "Ward 12",
      description: "Emergency repair of critical pothole causing traffic disruption",
      progress: 65,
    },
    {
      id: "WO-2024-049",
      issueId: "PI-2024-002",
      location: "Oak Street near School",
      assignedEngineer: "Maria Garcia",
      priority: "high",
      status: "assigned",
      deadline: "2024-01-22T17:00:00Z",
      estimatedCost: 2200,
      assignedDate: "2024-01-15T14:30:00Z",
      ward: "Ward 8",
      description: "Repair multiple potholes in school safety zone",
      progress: 0,
    },
    {
      id: "WO-2024-048",
      issueId: "PI-2024-003",
      location: "Industrial Park Road",
      assignedEngineer: "David Chen",
      priority: "medium",
      status: "overdue",
      deadline: "2024-01-18T17:00:00Z",
      estimatedCost: 1200,
      assignedDate: "2024-01-12T10:15:00Z",
      ward: "Ward 15",
      description: "Surface repair and crack sealing",
      progress: 25,
    },
    {
      id: "WO-2024-047",
      issueId: "SI-2024-001",
      location: "Broadway & 42nd Street",
      assignedEngineer: "John Smith",
      priority: "high",
      status: "completed",
      deadline: "2024-01-12T17:00:00Z",
      estimatedCost: 4200,
      assignedDate: "2024-01-10T08:00:00Z",
      ward: "Ward 5",
      description: "Critical pothole repair with hot mix asphalt",
      progress: 100,
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "in-progress":
        return "bg-blue-100 text-blue-800"
      case "assigned":
        return "bg-yellow-100 text-yellow-800"
      case "overdue":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
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
    })
  }

  const getDaysUntilDeadline = (deadline: string) => {
    const days = Math.ceil((new Date(deadline).getTime() - Date.now()) / (1000 * 60 * 60 * 24))
    if (days < 0) return `${Math.abs(days)} days overdue`
    if (days === 0) return "Due today"
    return `${days} days remaining`
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4" />
      case "in-progress":
        return <Clock className="h-4 w-4" />
      case "assigned":
        return <User className="h-4 w-4" />
      case "overdue":
        return <AlertTriangle className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Work Order Management</h2>
          <p className="text-muted-foreground">Assign and track repair work orders for field engineers</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90">
          <Plus className="h-4 w-4 mr-2" />
          Create Work Order
        </Button>
      </div>

      {/* Search and Filter Controls */}
      <div className="flex flex-wrap gap-4">
        <div className="relative flex-1 min-w-64">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search work orders..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-3 py-2 border rounded-md bg-white"
        >
          <option value="all">All Status</option>
          <option value="assigned">Assigned</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
          <option value="overdue">Overdue</option>
        </select>
      </div>

      {/* Work Orders Grid */}
      <div className="grid gap-6">
        {workOrders.map((order) => (
          <Card key={order.id} className="hover-lift transition-all duration-200">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start space-x-4">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10">
                    {getStatusIcon(order.status)}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">{order.location}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{order.description}</p>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <span className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        {order.ward}
                      </span>
                      <span className="flex items-center">
                        <User className="h-4 w-4 mr-1" />
                        {order.assignedEngineer}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-end space-y-2">
                  <Badge className={getStatusColor(order.status)}>{order.status.replace("-", " ").toUpperCase()}</Badge>
                  <Badge className={getPriorityColor(order.priority)}>{order.priority.toUpperCase()} PRIORITY</Badge>
                </div>
              </div>

              {/* Progress Bar */}
              {order.status !== "assigned" && (
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Progress</span>
                    <span>{order.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full transition-all duration-300"
                      style={{ width: `${order.progress}%` }}
                    ></div>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Work Order ID</p>
                  <p className="font-mono text-sm">{order.id}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Issue ID</p>
                  <p className="font-mono text-sm">{order.issueId}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Estimated Cost</p>
                  <p className="text-sm font-semibold text-green-600">${order.estimatedCost.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Deadline</p>
                  <p className={`text-sm ${order.status === "overdue" ? "text-red-600 font-medium" : ""}`}>
                    {getDaysUntilDeadline(order.deadline)}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t">
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <span>Assigned: {formatDate(order.assignedDate)}</span>
                  <span>Due: {formatDate(order.deadline)}</span>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                  <Button variant="outline" size="sm">
                    Update Progress
                  </Button>
                  {order.status === "assigned" && <Button size="sm">Start Work</Button>}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
