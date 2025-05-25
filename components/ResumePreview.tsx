import type { ResumeData } from "../utils/types"
import { ResumeTemplate } from "./resume-templates/DefaultTemplate"

interface ResumePreviewProps {
  data: ResumeData
}

export function ResumePreview({ data }: ResumePreviewProps) {
  return (
    <div className="h-full w-full overflow-auto bg-gray-100 p-2 sm:p-4 md:p-6 lg:p-8">
      <div className="mx-auto max-w-4xl bg-white shadow-md print:shadow-none">
        <ResumeTemplate data={data} />
      </div>
    </div>
  )
}
