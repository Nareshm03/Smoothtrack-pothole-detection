import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { yoloResults, opencvResults } = await request.json()

    // Simulate analysis comparison
    const analysis = {
      accuracy: {
        yolo: 0.89,
        opencv: 0.65,
      },
      processingSpeed: {
        yolo: "1.2s",
        opencv: "0.8s",
      },
      detectionCount: {
        yolo: yoloResults?.detections?.length || 0,
        opencv: opencvResults?.detections?.length || 0,
      },
      recommendation:
        yoloResults?.detections?.length > opencvResults?.detections?.length
          ? "YOLO model shows higher detection accuracy for this image"
          : "OpenCV baseline provides faster processing with reasonable accuracy",
    }

    return NextResponse.json({
      success: true,
      analysis,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Analysis error:", error)
    return NextResponse.json({ error: "Analysis failed" }, { status: 500 })
  }
}
