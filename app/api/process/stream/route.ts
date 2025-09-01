import type { NextRequest } from "next/server"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const jobIds = searchParams.get("jobIds")?.split(",") || []

  // Create a readable stream for Server-Sent Events
  const stream = new ReadableStream({
    start(controller) {
      const encoder = new TextEncoder()

      // Send initial connection message
      controller.enqueue(
        encoder.encode(
          `data: ${JSON.stringify({ type: "connected", message: "Real-time processing stream connected" })}\n\n`,
        ),
      )

      // Simulate real-time updates
      const interval = setInterval(() => {
        const updates = jobIds.map((jobId) => ({
          jobId,
          progress: Math.min(100, Math.random() * 100),
          status: Math.random() > 0.8 ? "completed" : "processing",
          timestamp: Date.now(),
        }))

        const message = {
          type: "progress_update",
          updates,
          timestamp: Date.now(),
        }

        controller.enqueue(encoder.encode(`data: ${JSON.stringify(message)}\n\n`))

        // Stop after some updates
        if (Math.random() > 0.7) {
          clearInterval(interval)
          controller.enqueue(
            encoder.encode(`data: ${JSON.stringify({ type: "completed", message: "Processing completed" })}\n\n`),
          )
          controller.close()
        }
      }, 1000)

      // Cleanup on close
      return () => {
        clearInterval(interval)
      }
    },
  })

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  })
}
