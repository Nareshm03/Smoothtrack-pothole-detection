"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, MapPin, Clock, AlertTriangle, DollarSign } from "lucide-react"

interface PotholeRecord {
  id: string
  timestamp: string
  gpsLocation: {
    latitude: number | null
    longitude: number | null
    accuracy: number | null
  }
  severity: string
  severityPercentage: number
  confidence: number
  detectionMethod: string
  estimatedRepairCost: number
  priority: "low" | "medium" | "high"
  bbox: {
    x: number
    y: number
    width: number
    height: number
  }
}

interface PotholeDataTableProps {
  yoloDetections: PotholeRecord[]
  opencvDetections: PotholeRecord[]
  onPotholeClick: (pothole: PotholeRecord) => void
  selectedPotholeId: string | null
}

export function PotholeDataTable({
  yoloDetections = [],
  opencvDetections = [],
  onPotholeClick,
  selectedPotholeId,
}: PotholeDataTableProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [severityFilter, setSeverityFilter] = useState<string>("all")
  const [methodFilter, setMethodFilter] = useState<string>("all")

  // Combine all detections
  const allDetections = useMemo(() => {
    return [...yoloDetections, ...opencvDetections].sort(
      (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
    )
  }, [yoloDetections, opencvDetections])

  // Filter detections
  const filteredDetections = useMemo(() => {
    return allDetections.filter((detection) => {
      const matchesSearch =
        detection.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        detection.severity.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesSeverity = severityFilter === "all" || detection.severity === severityFilter
      const matchesMethod = methodFilter === "all" || detection.detectionMethod === methodFilter

      return matchesSearch && matchesSeverity && matchesMethod
    })
  }, [allDetections, searchTerm, severityFilter, methodFilter])

  const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case "low":
        return "bg-green-500"
      case "medium":
        return "bg-yellow-500"
      case "high":
        return "bg-orange-500"
      case "critical":
        return "bg-red-500"
      default:
        return "bg-gray-500"
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

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleString()
  }

  const formatGPS = (gps: PotholeRecord["gpsLocation"]) => {
    if (!gps.latitude || !gps.longitude) return "No GPS"
    return `${gps.latitude.toFixed(6)}, ${gps.longitude.toFixed(6)}`
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5" />
          Pothole Detection Records ({filteredDetections.length})
        </CardTitle>

        {/* Search and Filter Controls */}
        <div className="flex flex-wrap gap-4 mt-4">
          <div className="relative flex-1 min-w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search potholes..."
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
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
            <option value="critical">Critical</option>
          </select>

          <select
            value={methodFilter}
            onChange={(e) => setMethodFilter(e.target.value)}
            className="px-3 py-2 border rounded-md bg-white"
          >
            <option value="all">All Methods</option>
            <option value="YOLO">YOLO</option>
            <option value="OpenCV">OpenCV</option>
          </select>
        </div>
      </CardHeader>

      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b">
                <th className="text-left p-3 font-medium">ID</th>
                <th className="text-left p-3 font-medium">Timestamp</th>
                <th className="text-left p-3 font-medium">GPS Location</th>
                <th className="text-left p-3 font-medium">Severity</th>
                <th className="text-left p-3 font-medium">Method</th>
                <th className="text-left p-3 font-medium">Priority</th>
                <th className="text-left p-3 font-medium">Repair Cost</th>
                <th className="text-left p-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredDetections.map((detection) => (
                <tr
                  key={detection.id}
                  className={`border-b hover:bg-gray-50 cursor-pointer transition-colors ${
                    selectedPotholeId === detection.id ? "bg-blue-50 border-blue-200" : ""
                  }`}
                  onClick={() => onPotholeClick(detection)}
                >
                  <td className="p-3">
                    <div className="font-mono text-sm">{detection.id.slice(-8)}</div>
                  </td>

                  <td className="p-3">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-gray-400" />
                      <span className="text-sm">{formatTimestamp(detection.timestamp)}</span>
                    </div>
                  </td>

                  <td className="p-3">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-gray-400" />
                      <span className="text-sm font-mono">{formatGPS(detection.gpsLocation)}</span>
                    </div>
                  </td>

                  <td className="p-3">
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${getSeverityColor(detection.severity)}`}></div>
                      <span className="capitalize font-medium">{detection.severity}</span>
                      <span className="text-sm text-gray-500">({detection.severityPercentage}%)</span>
                    </div>
                  </td>

                  <td className="p-3">
                    <Badge variant={detection.detectionMethod === "YOLO" ? "default" : "secondary"}>
                      {detection.detectionMethod}
                    </Badge>
                  </td>

                  <td className="p-3">
                    <Badge className={getPriorityColor(detection.priority)}>{detection.priority.toUpperCase()}</Badge>
                  </td>

                  <td className="p-3">
                    <div className="flex items-center gap-1">
                      <DollarSign className="h-4 w-4 text-green-600" />
                      <span className="font-medium">{detection.estimatedRepairCost.toLocaleString()}</span>
                    </div>
                  </td>

                  <td className="p-3">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={(e) => {
                        e.stopPropagation()
                        onPotholeClick(detection)
                      }}
                    >
                      View
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredDetections.length === 0 && (
            <div className="text-center py-8 text-gray-500">No potholes found matching your criteria</div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
