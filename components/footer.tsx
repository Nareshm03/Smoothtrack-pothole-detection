"use client"

import { Github, Twitter, Linkedin, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Footer() {
  return (
    <footer className="bg-card/30 backdrop-blur-sm border-t border-border/50">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-primary">SmoothTrack</h3>
            <p className="text-muted-foreground">
              AI-powered road monitoring system for safer infrastructure worldwide.
            </p>
            <div className="flex space-x-2">
              <Button variant="ghost" size="sm">
                <Github className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Twitter className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Linkedin className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Mail className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Product</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Features
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  API Documentation
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Enterprise
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Technology</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <a href="#" className="hover:text-accent transition-colors">
                  YOLO Models
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-accent transition-colors">
                  OpenCV Integration
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-accent transition-colors">
                  Computer Vision
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-accent transition-colors">
                  Deep Learning
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <a href="#" className="hover:text-chart-4 transition-colors">
                  Documentation
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-chart-4 transition-colors">
                  Community
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-chart-4 transition-colors">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-chart-4 transition-colors">
                  Status
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border/50 mt-8 pt-8 text-center text-muted-foreground">
          <p>&copy; 2024 SmoothTrack. All rights reserved. Built with AI for safer roads.</p>
        </div>
      </div>
    </footer>
  )
}
