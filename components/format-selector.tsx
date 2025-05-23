"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

type FormatOption = "yaml" | "json" | "upload"

export function FormatSelector() {
  const [selectedFormat, setSelectedFormat] = useState<FormatOption>("yaml")

  return (
    <div className="w-full max-w-3xl mx-auto space-y-4">
      <div className="inline-flex rounded-md shadow-sm" role="group">
        <Button
          variant={selectedFormat === "yaml" ? "default" : "outline"}
          className={`rounded-r-none ${selectedFormat === "yaml" ? "" : "hover:bg-muted"}`}
          onClick={() => setSelectedFormat("yaml")}
          aria-pressed={selectedFormat === "yaml"}
        >
          YAML
        </Button>
        <Button
          variant={selectedFormat === "json" ? "default" : "outline"}
          className={`rounded-none border-x-0 ${selectedFormat === "json" ? "" : "hover:bg-muted"}`}
          onClick={() => setSelectedFormat("json")}
          aria-pressed={selectedFormat === "json"}
        >
          JSON
        </Button>
        <Button
          variant={selectedFormat === "upload" ? "default" : "outline"}
          className={`rounded-l-none ${selectedFormat === "upload" ? "" : "hover:bg-muted"}`}
          onClick={() => setSelectedFormat("upload")}
          aria-pressed={selectedFormat === "upload"}
        >
          Upload
        </Button>
      </div>

      <div className="p-4 border rounded-md">
        {selectedFormat === "yaml" && (
          <div className="space-y-2">
            <Label htmlFor="yaml-input">YAML Configuration</Label>
            <Textarea
              id="yaml-input"
              placeholder="Enter your YAML configuration here..."
              className="font-mono h-64"
              defaultValue={`# Example YAML configuration
name: my-project
version: 1.0.0
dependencies:
  - name: react
    version: 18.2.0
  - name: next
    version: 13.4.0`}
            />
          </div>
        )}

        {selectedFormat === "json" && (
          <div className="space-y-2">
            <Label htmlFor="json-input">JSON Configuration</Label>
            <Textarea
              id="json-input"
              placeholder="Enter your JSON configuration here..."
              className="font-mono h-64"
              defaultValue={`{
  "name": "my-project",
  "version": "1.0.0",
  "dependencies": [
    {
      "name": "react",
      "version": "18.2.0"
    },
    {
      "name": "next",
      "version": "13.4.0"
    }
  ]
}`}
            />
          </div>
        )}

        {selectedFormat === "upload" && (
          <div className="space-y-4">
            <div className="flex flex-col items-center justify-center border-2 border-dashed rounded-md p-8">
              <div className="text-3xl text-muted-foreground mb-2">📁</div>
              <p className="text-sm text-muted-foreground mb-2">Drag and drop your configuration file here</p>
              <p className="text-xs text-muted-foreground mb-4">Supports .yaml, .yml, and .json files</p>
              <Input id="file-upload" type="file" accept=".yaml,.yml,.json" className="hidden" />
              <Label
                htmlFor="file-upload"
                className="cursor-pointer inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
              >
                Browse files
              </Label>
            </div>
            <div className="text-sm text-muted-foreground">
              <p>Selected file: No file selected</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
