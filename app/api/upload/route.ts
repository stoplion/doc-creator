import { writeFile } from "fs/promises"
import { NextRequest, NextResponse } from "next/server"
import OpenAI from "openai"
import { join } from "path"
import PDFParser from "pdf2json"
import { resumeSchema } from "../../../utils/schema"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 })
    }

    // Validate file type
    if (file.type !== "application/pdf") {
      return NextResponse.json(
        { error: "Only PDF files are allowed" },
        { status: 400 }
      )
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Create a unique filename
    const timestamp = Date.now()
    const filename = `${timestamp}-${file.name}`
    const uploadDir = join(process.cwd(), "uploads")
    const filepath = join(uploadDir, filename)

    // Save the PDF file
    await writeFile(filepath, buffer)

    // Extract text from PDF
    const pdfParser = new PDFParser()
    const pdfData = await new Promise((resolve, reject) => {
      pdfParser.on("pdfParser_dataReady", (pdfData) => {
        resolve(pdfData)
      })
      pdfParser.on("pdfParser_dataError", (error) => {
        reject(error)
      })
      pdfParser.parseBuffer(buffer)
    })

    // Extract text from all pages
    const text = (pdfData as any).Pages.map((page: any) => {
      return page.Texts.map((text: any) => {
        return decodeURIComponent(text.R[0].T)
      }).join(" ")
    }).join("\n\n")

    // Save as markdown
    const markdownFilename = `${timestamp}-${file.name.replace(".pdf", ".md")}`
    const markdownPath = join(uploadDir, markdownFilename)
    await writeFile(markdownPath, text)

    // Process with OpenAI
    const completion = await openai.chat.completions.create({
      model: "gpt-4-turbo-preview",
      messages: [
        {
          role: "system",
          content: `You are a resume parser. Extract information from the provided text and format it according to the JSON Resume schema. 
          The response should be a valid JSON object that matches the schema exactly. 
          Only include fields that you can confidently extract from the text.`,
        },
        {
          role: "user",
          content: text,
        },
      ],
      response_format: { type: "json_object" },
    })

    // Parse and validate the response
    const resumeData = JSON.parse(completion.choices[0].message.content)
    const validationResult = resumeSchema.safeParse(resumeData)

    if (!validationResult.success) {
      console.error("Validation error:", validationResult.error)
      return NextResponse.json(
        { error: "Failed to parse resume data correctly" },
        { status: 500 }
      )
    }

    // Save as JSON
    const jsonFilename = `${timestamp}-${file.name.replace(".pdf", ".json")}`
    const jsonPath = join(uploadDir, jsonFilename)
    await writeFile(jsonPath, JSON.stringify(resumeData, null, 2))

    return NextResponse.json({
      message: "File uploaded and processed successfully",
      filename: filename,
      markdownFilename: markdownFilename,
      jsonFilename: jsonFilename,
      resumeData: resumeData,
    })
  } catch (error) {
    console.error("Error processing file:", error)
    return NextResponse.json(
      { error: "Error processing file" },
      { status: 500 }
    )
  }
}
