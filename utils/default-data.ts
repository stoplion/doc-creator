import type { ResumeData } from "../schemas/resume"

export const defaultResumeData: ResumeData = {
  basics: {
    name: "George Norris",
    label: "Fullstack Typescript Software Engineer",
    email: "angelmcfood@gmail.com",
    phone: "757-971-7882",
    location: {
      city: "Las Vegas",
      region: "Nevada",
      countryCode: "US",
    },
    summary:
      "I\u2019m a Fullstack Engineer with 10+ years of experience building responsive, user-focused web apps. I work across the stack with TypeScript, JavaScript, React, Node.js, SQL (Postgres), and GraphQL. My background in UI design helps me craft polished interfaces, and I build reliable, well-tested APIs and backend systems. Projects include assured.claims, trailhead.salesforce.com, opentable.com, upstart.com, and blend.com. Open to remote roles.",
    profiles: [
      {
        network: "LinkedIn",
        username: "georgenorris",
        url: "https://www.linkedin.com/in/georgenorris",
      },
      {
        network: "GitHub",
        username: "georgenorris",
        url: "https://github.com/georgenorris",
      },
      {
        network: "CodePen",
        username: "georgenorris",
        url: "https://codepen.io/georgenorris",
      },
    ],
  },
  work: [
    {
      company: "Assured",
      position: "Staff Engineer",
      startDate: "2023-09",
      summary:
        "Full-stack development of web and mobile apps for insurance claims, using Node.js, React, and AWS.",
      highlights: [
        "Mobile web app for high-volume data intake with uploads",
        "Backend for adjuster workflows with secure data handling",
        "Feature flagging with LaunchDarkly, secure access via StrongDM",
        "Stack: TypeScript, React, Node.js, Postgres, GraphQL, Prisma, OpenAI, FFMpeg",
      ],
    },
    {
      company: "OtterTune",
      position: "Lead Frontend Engineer / Engineering Manager",
      startDate: "2022-05",
      summary:
        "Tech lead for major frontend rebuild and engineering management responsibilities.",
      highlights: [
        "Technical lead for v2.0 rebuild project",
        "Hands-on coding and code reviews",
        "Led stand-ups and team syncs",
        "Worked with Product and Design on architecture",
        "Stack: React, Redux, TypeScript, Vite, Cypress, Jest",
      ],
    },
    {
      company: "Blend",
      position: "Senior Software Engineer",
      startDate: "2021-03",
      endDate: "2022-04",
      summary:
        "Worked on Blend\u2019s loan and CRM products for mortgage processes.",
      highlights: [
        "UI for loan officer workflow",
        "Full-stack features with Node.js and MongoDB",
        "Stack: TypeScript, React, Redux, React Query, Express, MongoDB, CSS/Sass",
      ],
    },
    {
      company: "Salesforce",
      position: "Senior Software Engineer",
      startDate: "2016-03",
      endDate: "2021-03",
      summary:
        "Led architecture and launch of Trailhead content authoring tools.",
      highlights: [
        "Architected and launched Trailhead's Trailmaker",
        "Presented at Dreamforce 2017",
        "SuperBadge and credentialing tool development",
        "Stack: React, Redux, TypeScript, Express, Postgres, Ruby on Rails",
      ],
    },
    {
      company: "OpenTable",
      position: "Senior Frontend Software Engineer",
      startDate: "2015-08",
      endDate: "2016-02",
      summary: "Frontend feature development and performance testing.",
      highlights: [
        "Core features for restaurant listings",
        "A/B testing with Optimizely",
        "Load testing for high-traffic seasons",
        "Stack: JavaScript, Node.js, Express, Optimizely",
      ],
    },
    {
      company: "Upstart",
      position: "Front End Developer",
      startDate: "2014-02",
      endDate: "2015-04",
      summary: "Solo frontend developer at early-stage startup.",
      highlights: [
        "High-ownership UI delivery",
        "Close work with founders and design team",
        "Stack: JavaScript, Ruby on Rails, Heroku, CSS/Sass",
      ],
    },
    {
      company: "Dominion Enterprises",
      position: "Front End Developer / UX Designer",
      startDate: "2010-12",
      endDate: "2014-01",
      summary: "Frontend and UX for employment portals.",
      highlights: [
        "First fully responsive portal redesign",
        "Introduced JavaScript unit testing",
        "Stack: JavaScript, Rails, Backbone.js, jQuery, CSS/Sass",
      ],
    },
    {
      company: "bmace.com",
      position: "Web Developer / Designer",
      startDate: "2007-05",
      endDate: "2008-09",
      summary: "Agency site development using Flash and ActionScript.",
      highlights: [
        "Clients included Ogilvy, R/GA, Cheil, Rokkan, and ABC, Reebok, HP, Carnival Cruises",
      ],
    },
  ],
  education: [
    {
      institution: "Old Dominion University",
      area: "Graphic and UX Design",
      studyType: "BFA",
      startDate: "2006-09",
      endDate: "2010-05",
    },
    {
      institution: "Tidewater Community College",
      area: "Graphic and UI/UX Design",
      studyType: "AA",
      startDate: "2004-09",
      endDate: "2006-05",
    },
    {
      institution: "University of the Arts",
      area: "Multimedia / Film Studies",
      studyType: "Non-degree",
      startDate: "2003-09",
      endDate: "2004-05",
    },
  ],
}
