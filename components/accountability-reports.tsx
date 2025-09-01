"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import {
  BarChart3,
  Download,
  Calendar,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Clock,
  CheckCircle,
  AlertTriangle,
} from "lucide-react"

export function AccountabilityReports() {
  const [reportPeriod, setReportPeriod] = useState<string>("month")

  // Mock data for reports
  const monthlyStats = [
    { month: "Jan", reported: 145, resolved: 132, budget: 45000 },
    { month: "Feb", reported: 167, resolved: 149, budget: 52000 },
    { month: "Mar", reported: 189, resolved: 178, budget: 48000 },
    { month: "Apr", reported: 156, resolved: 145, budget: 41000 },
    { month: "May", reported: 198, resolved: 187, budget: 55000 },
    { month: "Jun", reported: 234, resolved: 201, budget: 62000 },
  ]

  const performanceMetrics = {
    totalResolved: 1192,
    averageResolutionTime: 4.2,
    budgetUtilization: 87,
    citizenSatisfaction: 4.3,
    monthlyTrend: "+12%",
    costEfficiency: 94,
  }

  const severityDistribution = [
    { name: "Low", value: 45, color: "#22c55e" },
    { name: "Medium", value: 35, color: "#f59e0b" },
    { name: "High", value: 15, color: "#ef4444" },
    { name: "Critical", value: 5, color: "#dc2626" },
  ]

  const engineerPerformance = [
    { name: "John Smith", completed: 45, avgTime: 3.2, rating: 4.8 },
    { name: "Maria Garcia", completed: 38, avgTime: 4.1, rating: 4.6 },
    { name: "David Chen", completed: 42, avgTime: 3.8, rating: 4.7 },
    { name: "Sarah Johnson", completed: 35, avgTime: 4.5, rating: 4.4 },
    { name: "Mike Wilson", completed: 40, avgTime: 3.9, rating: 4.5 },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Accountability Reports</h2>
          <p className="text-muted-foreground">Monthly repair statistics and performance metrics for decision-makers</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export PDF
          </Button>
          <Button>
            <Calendar className="h-4 w-4 mr-2" />
            Schedule Report
          </Button>
        </div>
      </div>

      {/* Report Period Filter */}
      <div className="flex items-center space-x-4">
        <label className="text-sm font-medium">Report Period:</label>
        <select
          value={reportPeriod}
          onChange={(e) => setReportPeriod(e.target.value)}
          className="px-3 py-2 border rounded-md bg-white"
        >
          <option value="week">This Week</option>
          <option value="month">This Month</option>
          <option value="quarter">This Quarter</option>
          <option value="year">This Year</option>
        </select>
      </div>

      {/* Key Performance Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <Card className="glass-effect">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-muted-foreground">Total Resolved</p>
                <p className="text-xl font-bold">{performanceMetrics.totalResolved}</p>
              </div>
              <CheckCircle className="h-6 w-6 text-green-500" />
            </div>
            <div className="flex items-center mt-2">
              <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
              <span className="text-xs text-green-600">{performanceMetrics.monthlyTrend}</span>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-effect">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-muted-foreground">Avg Resolution</p>
                <p className="text-xl font-bold">{performanceMetrics.averageResolutionTime}d</p>
              </div>
              <Clock className="h-6 w-6 text-blue-500" />
            </div>
            <div className="flex items-center mt-2">
              <TrendingDown className="h-3 w-3 text-green-500 mr-1" />
              <span className="text-xs text-green-600">-8% faster</span>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-effect">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-muted-foreground">Budget Usage</p>
                <p className="text-xl font-bold">{performanceMetrics.budgetUtilization}%</p>
              </div>
              <DollarSign className="h-6 w-6 text-green-500" />
            </div>
            <div className="flex items-center mt-2">
              <span className="text-xs text-muted-foreground">Within target</span>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-effect">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-muted-foreground">Satisfaction</p>
                <p className="text-xl font-bold">{performanceMetrics.citizenSatisfaction}/5</p>
              </div>
              <TrendingUp className="h-6 w-6 text-yellow-500" />
            </div>
            <div className="flex items-center mt-2">
              <span className="text-xs text-yellow-600">Citizen rating</span>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-effect">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-muted-foreground">Cost Efficiency</p>
                <p className="text-xl font-bold">{performanceMetrics.costEfficiency}%</p>
              </div>
              <BarChart3 className="h-6 w-6 text-purple-500" />
            </div>
            <div className="flex items-center mt-2">
              <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
              <span className="text-xs text-green-600">+3% improved</span>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-effect">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-muted-foreground">Active Issues</p>
                <p className="text-xl font-bold">342</p>
              </div>
              <AlertTriangle className="h-6 w-6 text-orange-500" />
            </div>
            <div className="flex items-center mt-2">
              <span className="text-xs text-orange-600">Pending repair</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Trends */}
        <Card className="glass-effect">
          <CardHeader>
            <CardTitle>Monthly Repair Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyStats}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="reported" fill="#ef4444" name="Reported" />
                <Bar dataKey="resolved" fill="#22c55e" name="Resolved" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Severity Distribution */}
        <Card className="glass-effect">
          <CardHeader>
            <CardTitle>Issue Severity Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={severityDistribution}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {severityDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Budget Utilization Chart */}
      <Card className="glass-effect">
        <CardHeader>
          <CardTitle>Budget Utilization Over Time</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyStats}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, "Budget"]} />
              <Line type="monotone" dataKey="budget" stroke="#3b82f6" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Engineer Performance Table */}
      <Card className="glass-effect">
        <CardHeader>
          <CardTitle>Engineer Performance Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3 font-medium">Engineer</th>
                  <th className="text-left p-3 font-medium">Completed</th>
                  <th className="text-left p-3 font-medium">Avg Time (days)</th>
                  <th className="text-left p-3 font-medium">Rating</th>
                  <th className="text-left p-3 font-medium">Performance</th>
                </tr>
              </thead>
              <tbody>
                {engineerPerformance.map((engineer) => (
                  <tr key={engineer.name} className="border-b hover:bg-muted/50">
                    <td className="p-3 font-medium">{engineer.name}</td>
                    <td className="p-3">{engineer.completed}</td>
                    <td className="p-3">{engineer.avgTime}</td>
                    <td className="p-3">
                      <div className="flex items-center">
                        <span className="mr-2">{engineer.rating}</span>
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <div
                              key={i}
                              className={`w-3 h-3 rounded-full mr-1 ${
                                i < Math.floor(engineer.rating) ? "bg-yellow-400" : "bg-gray-200"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    </td>
                    <td className="p-3">
                      <Badge
                        className={
                          engineer.rating >= 4.5 ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                        }
                      >
                        {engineer.rating >= 4.5 ? "Excellent" : "Good"}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
