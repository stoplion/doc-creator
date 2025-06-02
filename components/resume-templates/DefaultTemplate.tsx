import {
  Briefcase,
  Github,
  Globe,
  GraduationCap,
  Linkedin,
  Mail,
  MapPin,
  Phone,
} from "lucide-react"
import type { ResumeData } from "../../utils/types"
import { Badge } from "../misc/Badge"

interface ResumeTemplateProps {
  resumeData: ResumeData
}

export function ResumeTemplate({ resumeData }: ResumeTemplateProps) {
  return (
    <div className="p-4 sm:p-6 md:p-8 font-sans">
      {/* Header - More responsive with smaller padding and font sizes */}
      <header className="mb-4 sm:mb-6 md:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
          {resumeData.basics.name}
        </h1>
        <h2 className="text-lg sm:text-xl text-gray-600 mt-1">
          {resumeData.basics.label}
        </h2>

        <div className="flex flex-wrap gap-2 sm:gap-4 mt-3 text-xs sm:text-sm text-gray-600">
          {resumeData.basics.email && (
            <div className="flex items-center gap-1">
              <Mail className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
              <a
                href={`mailto:${resumeData.basics.email}`}
                className="hover:text-gray-900 truncate"
              >
                {resumeData.basics.email}
              </a>
            </div>
          )}

          {resumeData.basics.phone && (
            <div className="flex items-center gap-1">
              <Phone className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
              <a
                href={`tel:${resumeData.basics.phone}`}
                className="hover:text-gray-900"
              >
                {resumeData.basics.phone}
              </a>
            </div>
          )}

          {resumeData.basics.location && (
            <div className="flex items-center gap-1">
              <MapPin className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
              <span className="truncate">
                {resumeData.basics.location.city},{" "}
                {resumeData.basics.location.region}
              </span>
            </div>
          )}
        </div>

        {/* Website and profiles in a separate row for better small screen layout */}
        <div className="flex flex-wrap gap-2 sm:gap-4 mt-2 text-xs sm:text-sm text-gray-600">
          {resumeData.basics.url && (
            <div className="flex items-center gap-1">
              <Globe className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
              <a
                href={resumeData.basics.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-900 truncate"
              >
                {resumeData.basics.url.replace(/^https?:\/\//, "")}
              </a>
            </div>
          )}

          {resumeData.basics.profiles?.map((profile, index) => (
            <div key={index} className="flex items-center gap-1">
              {profile.network === "GitHub" && (
                <Github className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
              )}
              {profile.network === "LinkedIn" && (
                <Linkedin className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
              )}
              <a
                href={profile.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-900 truncate"
              >
                {profile.username}
              </a>
            </div>
          ))}
        </div>
      </header>

      {/* Main content - Two column layout that collapses to one column at smaller widths */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
        {/* Left Column - Takes full width on small screens, 2/3 on larger screens */}
        <div className="md:col-span-2">
          {/* Summary */}
          {resumeData.basics.summary && (
            <section className="mb-4 sm:mb-6">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 border-b border-gray-200 pb-1 mb-2 sm:mb-3">
                Summary
              </h3>
              <p className="text-sm sm:text-base text-gray-700 whitespace-pre-line">
                {resumeData.basics.summary}
              </p>
            </section>
          )}

          {/* Work Experience */}
          {resumeData.work && resumeData.work.length > 0 && (
            <section className="mb-4 sm:mb-6">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 border-b border-gray-200 pb-1 mb-2 sm:mb-3 flex items-center gap-1 sm:gap-2">
                <Briefcase className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />{" "}
                Work Experience
              </h3>

              {resumeData.work.map((work, index) => (
                <div key={index} className="mb-3 sm:mb-4">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start">
                    <div>
                      <h4 className="text-sm sm:text-base font-medium text-gray-900">
                        {work.position}
                      </h4>
                      <h5 className="text-xs sm:text-sm text-gray-700">
                        {work.company}
                      </h5>
                    </div>
                    <div className="text-xs text-gray-600 mt-1 sm:mt-0">
                      {work.startDate} - {work.endDate || "Present"}
                    </div>
                  </div>

                  {work.summary && (
                    <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-gray-700">
                      {work.summary}
                    </p>
                  )}

                  {work.highlights && work.highlights.length > 0 && (
                    <ul className="mt-1 sm:mt-2 list-disc list-inside text-xs sm:text-sm text-gray-700">
                      {work.highlights.map((highlight, i) => (
                        <li key={i}>{highlight}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </section>
          )}

          {/* Projects */}
          {resumeData.projects && resumeData.projects.length > 0 && (
            <section className="mb-4 sm:mb-6">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 border-b border-gray-200 pb-1 mb-2 sm:mb-3">
                Projects
              </h3>

              {resumeData.projects.map((project, index) => (
                <div key={index} className="mb-3 sm:mb-4">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start">
                    <div>
                      <h4 className="text-sm sm:text-base font-medium text-gray-900">
                        {project.name}
                      </h4>
                      {project.entity && (
                        <h5 className="text-xs sm:text-sm text-gray-700">
                          {project.entity}
                        </h5>
                      )}
                    </div>
                    {(project.startDate || project.endDate) && (
                      <div className="text-xs text-gray-600 mt-1 sm:mt-0">
                        {project.startDate} - {project.endDate || "Present"}
                      </div>
                    )}
                  </div>

                  {project.description && (
                    <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-gray-700">
                      {project.description}
                    </p>
                  )}

                  {project.highlights && project.highlights.length > 0 && (
                    <ul className="mt-1 sm:mt-2 list-disc list-inside text-xs sm:text-sm text-gray-700">
                      {project.highlights.map((highlight, i) => (
                        <li key={i}>{highlight}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </section>
          )}
        </div>

        {/* Right Column - Skills sidebar that collapses below on small screens */}
        <div>
          {/* Skills */}
          {resumeData.skills && resumeData.skills.length > 0 && (
            <section className="mb-4 sm:mb-6">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 border-b border-gray-200 pb-1 mb-2 sm:mb-3">
                Skills
              </h3>

              {resumeData.skills.map((skillGroup, index) => (
                <div key={index} className="mb-3 sm:mb-4">
                  <h4 className="text-sm sm:text-base font-medium text-gray-900">
                    {skillGroup.name}
                  </h4>
                  <div className="mt-1 sm:mt-2 flex flex-wrap gap-1 sm:gap-2">
                    {skillGroup?.keywords?.map((skill, i) => (
                      <Badge
                        key={i}
                        variant="outline"
                        className="bg-gray-100 text-xs"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </section>
          )}

          {/* Education */}
          {resumeData.education && resumeData.education.length > 0 && (
            <section className="mb-4 sm:mb-6">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 border-b border-gray-200 pb-1 mb-2 sm:mb-3 flex items-center gap-1 sm:gap-2">
                <GraduationCap className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />{" "}
                Education
              </h3>

              {resumeData.education.map((edu, index) => (
                <div key={index} className="mb-3 sm:mb-4">
                  <h4 className="text-sm sm:text-base font-medium text-gray-900">
                    {edu.institution}
                  </h4>
                  <div className="text-xs sm:text-sm text-gray-700">
                    {edu.studyType} {edu.area && `in ${edu.area}`}
                    {edu.score && `, GPA: ${edu.score}`}
                  </div>
                  <div className="text-xs text-gray-600">
                    {edu.startDate} - {edu.endDate || "Present"}
                  </div>
                </div>
              ))}
            </section>
          )}

          {/* Languages */}
          {resumeData.languages && resumeData.languages.length > 0 && (
            <section className="mb-4 sm:mb-6">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 border-b border-gray-200 pb-1 mb-2 sm:mb-3">
                Languages
              </h3>

              <ul className="text-xs sm:text-sm text-gray-700">
                {resumeData.languages.map((language, index) => (
                  <li key={index} className="mb-1">
                    <span className="font-medium">{language.language}</span>
                    {language.fluency && ` - ${language.fluency}`}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Certifications */}
          {resumeData.certificates && resumeData.certificates.length > 0 && (
            <section className="mb-4 sm:mb-6">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 border-b border-gray-200 pb-1 mb-2 sm:mb-3">
                Certifications
              </h3>

              {resumeData.certificates.map((cert, index) => (
                <div key={index} className="mb-2">
                  <div className="text-sm sm:text-base font-medium text-gray-900">
                    {cert.name}
                  </div>
                  <div className="text-xs sm:text-sm text-gray-700">
                    {cert.issuer}
                  </div>
                  {cert.date && (
                    <div className="text-xs text-gray-600">{cert.date}</div>
                  )}
                </div>
              ))}
            </section>
          )}
        </div>
      </div>
    </div>
  )
}
