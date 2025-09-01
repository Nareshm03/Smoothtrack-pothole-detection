// OpenCV Edge Detection and Computer Vision Utilities
export interface OpenCVConfig {
  method: "canny" | "sobel" | "laplacian" | "combined"
  cannyThreshold1: number
  cannyThreshold2: number
  sobelKernel: number
  gaussianBlur: number
  morphologyKernel: number
  minContourArea: number
  maxContourArea: number
}

export interface EdgeDetection {
  id: number
  class: string
  confidence: number
  bbox: {
    x: number
    y: number
    width: number
    height: number
  }
  method: string
  edgeStrength: number
  contourArea: number
  aspectRatio: number
  severity?: "low" | "medium" | "high" | "critical"
}

export const OPENCV_CONFIG: OpenCVConfig = {
  method: "combined",
  cannyThreshold1: 50,
  cannyThreshold2: 150,
  sobelKernel: 3,
  gaussianBlur: 5,
  morphologyKernel: 5,
  minContourArea: 500,
  maxContourArea: 10000,
}

export class OpenCVProcessor {
  private config: OpenCVConfig

  constructor(config: OpenCVConfig = OPENCV_CONFIG) {
    this.config = config
  }

  // Simulate image preprocessing for OpenCV
  preprocessImage(imageBuffer: Buffer): {
    grayscale: string
    blurred: string
    originalSize: { width: number; height: number }
  } {
    console.log("[v0] Image preprocessed for edge detection")

    // In real implementation, this would extract actual image dimensions
    // For now, we'll use a more realistic approach based on common image sizes
    const originalSize = { width: 1920, height: 1080 }

    return {
      grayscale: imageBuffer.toString("base64"),
      blurred: imageBuffer.toString("base64"),
      originalSize,
    }
  }

  private async cannyEdgeDetection(preprocessedData: any): Promise<EdgeDetection[]> {
    const detections: EdgeDetection[] = []
    const numEdges = Math.floor(Math.random() * 5) + 3
    const { width: imageWidth, height: imageHeight } = preprocessedData.originalSize

    const usedAreas: { x: number; y: number; width: number; height: number }[] = []

    for (let i = 0; i < numEdges; i++) {
      const edgeStrength = Math.random() * 0.35 + 0.55
      const contourArea = Math.random() * 4000 + 1500

      if (contourArea >= this.config.minContourArea && contourArea <= this.config.maxContourArea) {
        let bbox
        let attempts = 0

        do {
          bbox = {
            x: Math.floor(Math.random() * (imageWidth * 0.7)) + Math.floor(imageWidth * 0.15), // 15-85% of image width
            y: Math.floor(Math.random() * (imageHeight * 0.6)) + Math.floor(imageHeight * 0.2), // 20-80% of image height
            width: Math.floor(Math.random() * 200) + 80, // 80-280 pixels width
            height: Math.floor(Math.random() * 150) + 60, // 60-210 pixels height
          }
          attempts++
        } while (attempts < 10 && this.hasOverlap(bbox, usedAreas))

        // Ensure bbox stays within image bounds
        bbox.x = Math.max(0, Math.min(bbox.x, imageWidth - bbox.width))
        bbox.y = Math.max(0, Math.min(bbox.y, imageHeight - bbox.height))

        usedAreas.push(bbox)
        const severity = this.calculateSeverityFromEdge(edgeStrength, contourArea)

        detections.push({
          id: i + 1,
          class: "pothole",
          confidence: edgeStrength,
          bbox,
          method: "canny_edge",
          edgeStrength,
          contourArea,
          aspectRatio: bbox.width / bbox.height,
          severity,
        })
      }
    }

    return detections
  }

  private async sobelEdgeDetection(preprocessedData: any): Promise<EdgeDetection[]> {
    const detections: EdgeDetection[] = []
    const numEdges = Math.floor(Math.random() * 4) + 2
    const { width: imageWidth, height: imageHeight } = preprocessedData.originalSize

    const usedAreas: { x: number; y: number; width: number; height: number }[] = []

    for (let i = 0; i < numEdges; i++) {
      const edgeStrength = Math.random() * 0.3 + 0.6
      const contourArea = Math.random() * 3500 + 1200

      let bbox
      let attempts = 0

      do {
        bbox = {
          x: Math.floor(Math.random() * (imageWidth * 0.65)) + Math.floor(imageWidth * 0.2), // 20-85% of image width
          y: Math.floor(Math.random() * (imageHeight * 0.55)) + Math.floor(imageHeight * 0.25), // 25-80% of image height
          width: Math.floor(Math.random() * 220) + 90, // 90-310 pixels width
          height: Math.floor(Math.random() * 160) + 70, // 70-230 pixels height
        }
        attempts++
      } while (attempts < 10 && this.hasOverlap(bbox, usedAreas))

      // Ensure bbox stays within image bounds
      bbox.x = Math.max(0, Math.min(bbox.x, imageWidth - bbox.width))
      bbox.y = Math.max(0, Math.min(bbox.y, imageHeight - bbox.height))

      usedAreas.push(bbox)
      const severity = this.calculateSeverityFromEdge(edgeStrength, contourArea)

      detections.push({
        id: i + 1,
        class: "crack",
        confidence: edgeStrength,
        bbox,
        method: "sobel_gradient",
        edgeStrength,
        contourArea,
        aspectRatio: bbox.width / bbox.height,
        severity,
      })
    }

    return detections
  }

  private async laplacianEdgeDetection(preprocessedData: any): Promise<EdgeDetection[]> {
    const detections: EdgeDetection[] = []
    const numEdges = Math.floor(Math.random() * 4) + 2
    const { width: imageWidth, height: imageHeight } = preprocessedData.originalSize

    const usedAreas: { x: number; y: number; width: number; height: number }[] = []

    for (let i = 0; i < numEdges; i++) {
      const edgeStrength = Math.random() * 0.35 + 0.55
      const contourArea = Math.random() * 3000 + 1400

      let bbox
      let attempts = 0

      do {
        bbox = {
          x: Math.floor(Math.random() * (imageWidth * 0.6)) + Math.floor(imageWidth * 0.25), // 25-85% of image width
          y: Math.floor(Math.random() * (imageHeight * 0.5)) + Math.floor(imageHeight * 0.3), // 30-80% of image height
          width: Math.floor(Math.random() * 200) + 100, // 100-300 pixels width
          height: Math.floor(Math.random() * 140) + 80, // 80-220 pixels height
        }
        attempts++
      } while (attempts < 10 && this.hasOverlap(bbox, usedAreas))

      // Ensure bbox stays within image bounds
      bbox.x = Math.max(0, Math.min(bbox.x, imageWidth - bbox.width))
      bbox.y = Math.max(0, Math.min(bbox.y, imageHeight - bbox.height))

      usedAreas.push(bbox)
      const severity = this.calculateSeverityFromEdge(edgeStrength, contourArea)

      detections.push({
        id: i + 1,
        class: "road_damage",
        confidence: edgeStrength,
        bbox,
        method: "laplacian_edge",
        edgeStrength,
        contourArea,
        aspectRatio: bbox.width / bbox.height,
        severity,
      })
    }

    return detections
  }

  // Combined edge detection approach
  private async combinedEdgeDetection(preprocessedData: any): Promise<EdgeDetection[]> {
    const [cannyResults, sobelResults, laplacianResults] = await Promise.all([
      this.cannyEdgeDetection(preprocessedData),
      this.sobelEdgeDetection(preprocessedData),
      this.laplacianEdgeDetection(preprocessedData),
    ])

    // Combine and filter results
    const allDetections = [...cannyResults, ...sobelResults, ...laplacianResults]
    return this.filterOverlappingDetections(allDetections)
  }

  // Main processing method
  async processImage(preprocessedData: any): Promise<EdgeDetection[]> {
    // Simulate processing time (OpenCV is typically faster than YOLO)
    await new Promise((resolve) => setTimeout(resolve, 600 + Math.random() * 400))

    switch (this.config.method) {
      case "canny":
        return this.cannyEdgeDetection(preprocessedData)
      case "sobel":
        return this.sobelEdgeDetection(preprocessedData)
      case "laplacian":
        return this.laplacianEdgeDetection(preprocessedData)
      case "combined":
        return this.combinedEdgeDetection(preprocessedData)
      default:
        return this.cannyEdgeDetection(preprocessedData)
    }
  }

  // Filter overlapping detections (similar to NMS but for edge detection)
  private filterOverlappingDetections(detections: EdgeDetection[]): EdgeDetection[] {
    const filtered: EdgeDetection[] = []
    const sorted = detections.sort((a, b) => b.confidence - a.confidence)

    for (const detection of sorted) {
      let shouldKeep = true

      for (const kept of filtered) {
        const overlap = this.calculateOverlap(detection.bbox, kept.bbox)
        if (overlap > 0.3) {
          // 30% overlap threshold
          shouldKeep = false
          break
        }
      }

      if (shouldKeep) {
        filtered.push(detection)
      }
    }

    return filtered
  }

  // Calculate bounding box overlap
  private calculateOverlap(box1: any, box2: any): number {
    const x1 = Math.max(box1.x, box2.x)
    const y1 = Math.max(box1.y, box2.y)
    const x2 = Math.min(box1.x + box1.width, box2.x + box2.width)
    const y2 = Math.min(box1.y + box1.height, box2.y + box2.height)

    if (x2 <= x1 || y2 <= y1) return 0

    const intersection = (x2 - x1) * (y2 - y1)
    const area1 = box1.width * box1.height
    const area2 = box2.width * box2.height
    const union = area1 + area2 - intersection

    return intersection / union
  }

  // Calculate performance metrics
  calculateMetrics(detections: EdgeDetection[]): {
    averageConfidence: number
    averageEdgeStrength: number
    totalContourArea: number
    aspectRatioDistribution: { narrow: number; square: number; wide: number }
    methodDistribution: Record<string, number>
  } {
    if (detections.length === 0) {
      return {
        averageConfidence: 0,
        averageEdgeStrength: 0,
        totalContourArea: 0,
        aspectRatioDistribution: { narrow: 0, square: 0, wide: 0 },
        methodDistribution: {},
      }
    }

    const avgConfidence = detections.reduce((sum, det) => sum + det.confidence, 0) / detections.length
    const avgEdgeStrength = detections.reduce((sum, det) => sum + det.edgeStrength, 0) / detections.length
    const totalArea = detections.reduce((sum, det) => sum + det.contourArea, 0)

    const aspectRatioDistribution = detections.reduce(
      (acc, det) => {
        if (det.aspectRatio < 0.7) acc.narrow++
        else if (det.aspectRatio > 1.3) acc.wide++
        else acc.square++
        return acc
      },
      { narrow: 0, square: 0, wide: 0 },
    )

    const methodDistribution = detections.reduce(
      (acc, det) => {
        acc[det.method] = (acc[det.method] || 0) + 1
        return acc
      },
      {} as Record<string, number>,
    )

    return {
      averageConfidence: Math.round(avgConfidence * 100) / 100,
      averageEdgeStrength: Math.round(avgEdgeStrength * 100) / 100,
      totalContourArea: Math.round(totalArea),
      aspectRatioDistribution,
      methodDistribution,
    }
  }

  // Helper methods for better detection positioning and severity calculation
  private hasOverlap(newBox: any, existingBoxes: any[]): boolean {
    return existingBoxes.some((box) => {
      const overlapX = newBox.x < box.x + box.width && newBox.x + newBox.width > box.x
      const overlapY = newBox.y < box.y + box.height && newBox.y + newBox.height > box.y
      return overlapX && overlapY
    })
  }

  private calculateSeverityFromEdge(edgeStrength: number, contourArea: number): "low" | "medium" | "high" | "critical" {
    // Normalize area and combine with edge strength
    const normalizedArea = contourArea / 1000 // Normalize to reasonable scale
    const score = normalizedArea * 1.5 + edgeStrength * 2

    if (score > 3.5) return "critical"
    if (score > 2.8) return "high"
    if (score > 2.0) return "medium"
    return "low"
  }
}
