"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PendingIssuesTracker } from "@/components/pending-issues-tracker"
import { SolvedIssuesArchive } from "@/components/solved-issues-archive"
import { WorkOrderManagement } from "@/components/work-order-management"
import { MunicipalityHeatmap } from "@/components/municipality-heatmap"
import { AccountabilityReports } from "@/components/accountability-reports"
import {
  ArrowLeft,
  Building2,
  AlertTriangle,
  CheckCircle,
  Users,
  Map,
  BarChart3,
  TrendingUp,
  Clock,
} from "lucide-react"
import Link from "next/link"

export default function MunicipalityDashboard() {
  const [activeTab, setActiveTab] = useState("pending")

  // Mock data for dashboard overview
  const dashboardStats = {
    totalPotholes: 1247,
    pendingIssues: 342,
    solvedIssues: 905,
    activeWorkOrders: 89,
    averageRepairTime: "4.2 days",
    monthlyBudget: 125000,
    budgetUsed: 87500,
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/30 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 animate-slide-in-left">
              <Link href="/">
                <Button variant="ghost" size="sm" className="hover-lift">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Home
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-primary flex items-center">
                  <Building2 className="h-6 w-6 mr-2" />
                  Municipality Dashboard
                </h1>
                <p className="text-sm text-muted-foreground">Road Infrastructure Management System</p>
              </div>
            </div>
            <div className="flex items-center space-x-2 animate-slide-in-right">
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                <CheckCircle className="h-3 w-3 mr-1" />
                {dashboardStats.solvedIssues} Resolved
              </Badge>
              <Badge variant="secondary" className="bg-orange-100 text-orange-800">
                <AlertTriangle className="h-3 w-3 mr-1" />
                {dashboardStats.pendingIssues} Pending
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="glass-effect hover-lift">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Potholes</CardTitle>
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{dashboardStats.totalPotholes.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                <TrendingUp className="h-3 w-3 inline mr-1" />
                +12% from last month
              </p>
            </CardContent>
          </Card>

          <Card className="glass-effect hover-lift">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Issues</CardTitle>
              <Clock className="h-4 w-4 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">{dashboardStats.pendingIssues}</div>
              <p className="text-xs text-muted-foreground">Avg repair time: {dashboardStats.averageRepairTime}</p>
            </CardContent>
          </Card>

          <Card className="glass-effect hover-lift">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Work Orders</CardTitle>
              <Users className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{dashboardStats.activeWorkOrders}</div>
              <p className="text-xs text-muted-foreground">Assigned to field engineers</p>
            </CardContent>
          </Card>

          <Card className="glass-effect hover-lift">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Budget Utilization</CardTitle>
              <BarChart3 className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {Math.round((dashboardStats.budgetUsed / dashboardStats.monthlyBudget) * 100)}%
              </div>
              <p className="text-xs text-muted-foreground">
                ${dashboardStats.budgetUsed.toLocaleString()} / ${dashboardStats.monthlyBudget.toLocaleString()}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Dashboard Tabs */}
        <Card className="glass-effect">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-5 m-4 mb-0">
              <TabsTrigger value="pending" className="focus-ring">
                <AlertTriangle className="h-4 w-4 mr-2" />
                Pending Issues
              </TabsTrigger>
              <TabsTrigger value="solved" className="focus-ring">
                <CheckCircle className="h-4 w-4 mr-2" />
                Solved Issues
              </TabsTrigger>
              <TabsTrigger value="workorders" className="focus-ring">
                <Users className="h-4 w-4 mr-2" />
                Work Orders
              </TabsTrigger>
              <TabsTrigger value="heatmap" className="focus-ring">
                <Map className="h-4 w-4 mr-2" />
                Heatmap
              </TabsTrigger>
              <TabsTrigger value="reports" className="focus-ring">
                <BarChart3 className="h-4 w-4 mr-2" />
                Reports
              </TabsTrigger>
            </TabsList>

            <TabsContent value="pending" className="p-6">
              <PendingIssuesTracker />
            </TabsContent>

            <TabsContent value="solved" className="p-6">
              <SolvedIssuesArchive />
            </TabsContent>

            <TabsContent value="workorders" className="p-6">
              <WorkOrderManagement />
            </TabsContent>

            <TabsContent value="heatmap" className="p-6">
              <MunicipalityHeatmap />
            </TabsContent>

            <TabsContent value="reports" className="p-6">
              <AccountabilityReports />
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </div>
  )
}
