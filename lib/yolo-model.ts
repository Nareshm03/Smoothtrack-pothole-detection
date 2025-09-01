// YOLO Model Configuration and Utilities
export interface YOLOConfig {
  modelVersion: string
  inputSize: { width: number; height: number }
  confidenceThreshold: number
  nmsThreshold: number
  classes: string[]
  anchors: number[][]
}

export interface Detection {
  id: number
  class: string
  confidence: number
  bbox: {
    x: number
    y: number
    width: number
    height: number
  }
  severity?: "low" | "medium" | "high" | "critical"
  area: number
}

export const YOLO_CONFIG: YOLOConfig = {
  modelVersion: "YOLOv8n-pothole",
  inputSize: { width: 640, height: 640 },
  confidenceThreshold: 0.5,
  nmsThreshold: 0.4,
  classes: ["pothole", "crack", "road_damage", "manhole"],
  anchors: [
    [10, 13, 16, 30, 33, 23],
    [30, 61, 62, 45, 59, 119],
    [116, 90, 156, 198, 373, 326],
  ],
}

export class YOLOProcessor {
  private config: YOLOConfig

  constructor(config: YOLOConfig = YOLO_CONFIG) {
    this.config = config
  }

  preprocessImage(imageBuffer: Buffer): {
    processedImage: string
    originalSize: { width: number; height: number }
    scaleFactor: number
    imageAnalysis: any
  } {
    console.log("[v0] Starting YOLO processing pipeline...")

    // Simulate image analysis to find potential pothole regions
    const imageAnalysis = this.analyzeImageForPotholes(imageBuffer)
    const originalSize = { width: 1920, height: 1080 }
    const scaleFactor = Math.min(
      this.config.inputSize.width / originalSize.width,
      this.config.inputSize.height / originalSize.height,
    )

    console.log("[v0] Image preprocessed, scale factor:", scaleFactor)

    return {
      processedImage: imageBuffer.toString("base64"),
      originalSize,
      scaleFactor,
      imageAnalysis,
    }
  }

  private analyzeImageForPotholes(imageBuffer: Buffer): any {
    // Simulate advanced image analysis that would identify potential pothole regions
    // In a real implementation, this would use computer vision techniques like:
    // - Edge detection to find irregular shapes
    // - Texture analysis to identify rough surfaces
    // - Color analysis to find dark areas (water-filled potholes)
    // - Contour detection for hole-like shapes

    const potentialRegions = []
    const numRegions = Math.floor(Math.random() * 4) + 2 // 2-5 potential regions

    for (let i = 0; i < numRegions; i++) {
      // Simulate regions that look like potholes based on common characteristics
      const region = {
        center: {
          x: 0.2 + Math.random() * 0.6, // Center 20-80% of image
          y: 0.3 + Math.random() * 0.4, // Center 30-70% of image (road area)
        },
        confidence: 0.6 + Math.random() * 0.3, // Higher confidence for better regions
        characteristics: {
          darkness: Math.random(), // How dark the region is
          irregularity: Math.random(), // How irregular the shape is
          waterPresence: Math.random() > 0.6, // Whether water is detected
          edgeSharpness: Math.random(), // How sharp the edges are
        },
      }
      potentialRegions.push(region)
    }

    return { potentialRegions }
  }

  async runInference(preprocessedData: any): Promise<Detection[]> {
    await new Promise((resolve) => setTimeout(resolve, 1200 + Math.random() * 800))

    const detections: Detection[] = []
    const { potentialRegions } = preprocessedData.imageAnalysis
    const imageWidth = preprocessedData.originalSize.width
    const imageHeight = preprocessedData.originalSize.height

    console.log("[v0] Analyzing", potentialRegions.length, "potential pothole regions")

    // Process each potential region identified by image analysis
    potentialRegions.forEach((region: any, index: number) => {
      const confidence = region.confidence * (0.8 + Math.random() * 0.2) // Adjust confidence based on analysis

      if (confidence >= this.config.confidenceThreshold) {
        // Convert normalized coordinates to actual pixel coordinates
        const centerX = region.center.x * imageWidth
        const centerY = region.center.y * imageHeight

        // Size based on characteristics - darker, more irregular regions tend to be larger
        const baseSize = 80 + region.characteristics.darkness * 100 + region.characteristics.irregularity * 80
        const width = Math.floor(baseSize + Math.random() * 60)
        const height = Math.floor(baseSize * 0.8 + Math.random() * 40) // Potholes often wider than tall

        const bbox = {
          x: Math.floor(centerX - width / 2),
          y: Math.floor(centerY - height / 2),
          width,
          height,
        }

        // Ensure bbox stays within image bounds
        bbox.x = Math.max(0, Math.min(bbox.x, imageWidth - bbox.width))
        bbox.y = Math.max(0, Math.min(bbox.y, imageHeight - bbox.height))

        const area = bbox.width * bbox.height
        const severity = this.calculateRealisticSeverity(
          region.characteristics,
          area,
          confidence,
          imageWidth,
          imageHeight,
        )

        // Determine class based on characteristics
        let detectedClass = "pothole"
        if (region.characteristics.edgeSharpness > 0.7 && region.characteristics.irregularity < 0.4) {
          detectedClass = "crack"
        } else if (region.characteristics.darkness < 0.3) {
          detectedClass = "road_damage"
        }

        detections.push({
          id: index + 1,
          class: detectedClass,
          confidence,
          bbox,
          severity,
          area,
        })
      }
    })

    console.log("[v0] Raw detections found:", detections.length)

    // Apply Non-Maximum Suppression
    const finalDetections = this.applyNMS(detections)
    console.log("[v0] Final detections after NMS:", finalDetections.length)

    return finalDetections
  }

  private calculateRealisticSeverity(
    characteristics: any,
    area: number,
    confidence: number,
    imageWidth: number,
    imageHeight: number,
  ): "low" | "medium" | "high" | "critical" {
    const totalImageArea = imageWidth * imageHeight
    const normalizedArea = area / totalImageArea

    // Calculate severity based on multiple factors
    let severityScore = 0

    // Size factor (larger potholes are more severe)
    severityScore += normalizedArea * 2000

    // Darkness factor (darker areas often indicate deeper holes)
    severityScore += characteristics.darkness * 1.5

    // Water presence increases severity significantly
    if (characteristics.waterPresence) {
      severityScore += 2.0
    }

    // Irregularity factor (more irregular shapes are often more severe)
    severityScore += characteristics.irregularity * 1.2

    // Confidence factor
    severityScore += confidence * 0.8

    if (severityScore > 4.5) return "critical"
    if (severityScore > 3.2) return "high"
    if (severityScore > 2.0) return "medium"
    return "low"
  }

  private hasOverlap(newBox: any, existingBoxes: any[]): boolean {
    return existingBoxes.some((box) => {
      const overlapX = newBox.x < box.x + box.width && newBox.x + newBox.width > box.x
      const overlapY = newBox.y < box.y + box.height && newBox.y + box.height > box.y
      return overlapX && overlapY
    })
  }

  // Simulate Non-Maximum Suppression
  private applyNMS(detections: Detection[]): Detection[] {
    // Sort by confidence (highest first)
    const sorted = detections.sort((a, b) => b.confidence - a.confidence)
    const filtered: Detection[] = []

    for (const detection of sorted) {
      let shouldKeep = true

      for (const kept of filtered) {
        const iou = this.calculateIoU(detection.bbox, kept.bbox)
        if (iou > this.config.nmsThreshold) {
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

  // Calculate Intersection over Union
  private calculateIoU(box1: any, box2: any): number {
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

  private calculateSeverity(
    area: number,
    confidence: number,
    imageWidth: number,
    imageHeight: number,
  ): "low" | "medium" | "high" | "critical" {
    // Normalize area based on actual image size
    const totalImageArea = imageWidth * imageHeight
    const normalizedArea = area / totalImageArea
    const score = normalizedArea * 1000 + confidence * 1.5 // Scale up normalized area for better distribution

    if (score > 3.0) return "critical"
    if (score > 2.2) return "high"
    if (score > 1.6) return "medium"
    return "low"
  }

  postProcess(detections: Detection[], originalSize: { width: number; height: number }, scaleFactor: number) {
    // Return detections as-is since we're already using actual pixel coordinates
    return detections.map((detection) => ({
      ...detection,
      // Keep original coordinates since they're already in the correct scale
      bbox: detection.bbox,
    }))
  }
}
