"use client"

import { useState, useCallback } from "react"
import { CustomDropzone } from "@/components/custom-dropzone"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Play, Trash2, RefreshCw } from "lucide-react"

interface ProcessingJob {
  id: string
  fileName: string
  status: "queued" | "processing" | "completed" | "failed"
  progress: number
  file?: File
}

export function BatchProcessing() {
  const [jobs, setJobs] = useState<ProcessingJob[]>([])
  const [isProcessing, setIsProcessing] = useState(false)
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])

  const handleFilesAccepted = useCallback((acceptedFiles: File[]) => {
    setUploadedFiles((prev) => [...prev, ...acceptedFiles])

    const newJobs = acceptedFiles.map((file) => ({
      id: `local_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      fileName: file.name,
      status: "queued" as const,
      progress: 0,
      file,
    }))

    setJobs((prev) => [...prev, ...newJobs])
  }, [])

  const startBatchProcessing = async () => {
    if (uploadedFiles.length === 0) return

    setIsProcessing(true)

    try {
      const formData = new FormData()
      uploadedFiles.forEach((file) => {
        formData.append("images", file)
      })

      const response = await fetch("/api/process/batch", {
        method: "POST",
        body: formData,
      })

      const result = await response.json()

      if (result.success) {
        // Update jobs with server IDs
        setJobs((prev) =>
          prev.map((job) => {
            const serverJob = result.jobs.find((sj: any) => sj.fileName === job.fileName)
            return serverJob ? { ...job, id: serverJob.id } : job
          }),
        )

        // Start polling for updates
        startPolling(result.jobs.map((job: any) => job.id))
      }
    } catch (error) {
      console.error("Batch processing failed:", error)
    }
  }

  const startPolling = (jobIds: string[]) => {
    const pollInterval = setInterval(async () => {
      try {
        const response = await fetch("/api/process/batch")
        const result = await response.json()

        setJobs((prev) =>
          prev.map((job) => {
            const serverJob = result.jobs.find((sj: any) => sj.id === job.id)
            return serverJob ? { ...job, ...serverJob } : job
          }),
        )

        // Check if all jobs are completed
        const allCompleted = result.jobs.every((job: any) => job.status === "completed" || job.status === "failed")

        if (allCompleted) {
          clearInterval(pollInterval)
          setIsProcessing(false)
        }
      } catch (error) {
        console.error("Polling failed:", error)
        clearInterval(pollInterval)
        setIsProcessing(false)
      }
    }, 2000)
  }

  const clearJobs = () => {
    setJobs([])
    setUploadedFiles([])
  }

  const removeJob = (jobId: string) => {
    setJobs((prev) => prev.filter((job) => job.id !== jobId))
    setUploadedFiles((prev) => prev.filter((_, index) => jobs[index]?.id !== jobId))
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "queued":
        return "bg-muted text-muted-foreground"
      case "processing":
        return "bg-primary/10 text-primary"
      case "completed":
        return "bg-chart-4/10 text-chart-4"
      case "failed":
        return "bg-destructive/10 text-destructive"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  return (
    <div className="space-y-6">
      {/* Upload Area */}
      <CustomDropzone onFilesAccepted={handleFilesAccepted} accept="image/*" multiple={true} className="mb-4" />

      {uploadedFiles.length > 0 && (
        <div className="text-center">
          <Badge variant="secondary" className="bg-primary/10 text-primary">
            {uploadedFiles.length} files ready for processing
          </Badge>
        </div>
      )}

      {/* Control Panel */}
      {jobs.length > 0 && (
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold">Batch Processing Queue</h3>
              <p className="text-sm text-muted-foreground">
                {jobs.filter((j) => j.status === "completed").length} of {jobs.length} images processed
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                onClick={startBatchProcessing}
                disabled={isProcessing || uploadedFiles.length === 0}
                className="animate-pulse-glow"
              >
                {isProcessing ? (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Play className="h-4 w-4 mr-2" />
                    Start Processing
                  </>
                )}
              </Button>
              <Button variant="outline" onClick={clearJobs} disabled={isProcessing}>
                <Trash2 className="h-4 w-4 mr-2" />
                Clear All
              </Button>
            </div>
          </div>

          {/* Overall Progress */}
          <div className="space-y-2 mb-6">
            <div className="flex justify-between text-sm">
              <span>Overall Progress</span>
              <span>
                {jobs.length > 0
                  ? ((jobs.filter((j) => j.status === "completed").length / jobs.length) * 100).toFixed(0)
                  : 0}
                %
              </span>
            </div>
            <Progress
              value={jobs.length > 0 ? (jobs.filter((j) => j.status === "completed").length / jobs.length) * 100 : 0}
              className="h-2"
            />
          </div>

          {/* Job List */}
          <ScrollArea className="h-64">
            <div className="space-y-3">
              {jobs.map((job) => (
                <div key={job.id} className="flex items-center space-x-4 p-3 bg-muted/20 rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium truncate">{job.fileName}</span>
                      <div className="flex items-center space-x-2">
                        <Badge className={getStatusColor(job.status)}>{job.status}</Badge>
                        {job.status !== "processing" && (
                          <Button variant="ghost" size="sm" onClick={() => removeJob(job.id)} disabled={isProcessing}>
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        )}
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Progress</span>
                        <span>{job.progress}%</span>
                      </div>
                      <Progress value={job.progress} className="h-1" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </Card>
      )}

      {/* Processing Statistics */}
      {jobs.filter((j) => j.status === "completed").length > 0 && (
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Processing Statistics</h3>
          <div className="grid md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-primary/5 rounded-lg">
              <div className="text-2xl font-bold text-primary">
                {jobs.filter((j) => j.status === "completed").length}
              </div>
              <div className="text-sm text-muted-foreground">Completed</div>
            </div>
            <div className="text-center p-4 bg-accent/5 rounded-lg">
              <div className="text-2xl font-bold text-accent">
                {jobs.filter((j) => j.status === "processing").length}
              </div>
              <div className="text-sm text-muted-foreground">Processing</div>
            </div>
            <div className="text-center p-4 bg-chart-4/5 rounded-lg">
              <div className="text-2xl font-bold text-chart-4">{jobs.filter((j) => j.status === "queued").length}</div>
              <div className="text-sm text-muted-foreground">Queued</div>
            </div>
            <div className="text-center p-4 bg-destructive/5 rounded-lg">
              <div className="text-2xl font-bold text-destructive">
                {jobs.filter((j) => j.status === "failed").length}
              </div>
              <div className="text-sm text-muted-foreground">Failed</div>
            </div>
          </div>
        </Card>
      )}
    </div>
  )
}
