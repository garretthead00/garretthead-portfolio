import type { ReactNode } from "react";

// COMPANY & SCHOOL ICONS
import pingIcon from "../assets/images/Ping.png";
import muralIcon from "../assets/images/Mural.png";
import incentrikIcon from "../assets/images/InCentrik.png";
import copilotIcon from "../assets/images/Copilot.png";
import lsuIcon from "../assets/images/lsu.png";

// TECH ICONS
import { FaCss3Alt, FaReact, FaNodeJs } from "react-icons/fa";
import {
  BiLogoGraphql,
  BiLogoPostgresql,
  BiLogoTailwindCss,
  BiLogoVuejs,
} from "react-icons/bi";
import { BsBootstrap, BsDatabase } from "react-icons/bs";
import {
  SiAngularjs,
  SiApachecassandra,
  SiExpress,
  SiMicrosoftsqlserver,
  SiMongodb,
  SiRedis,
  SiRedux,
} from "react-icons/si";

export interface TechItem {
  name: string;
  icon: ReactNode;
}

export interface Role {
  id: number;
  title: string;
  company: string;
  location: string;
  description: string;
  stack: TechItem[];
  companyLink: string;
  duration: string;
  icon: string;
}

export interface Education {
  school: string;
  concentration: string;
  degree: string;
  icon: string;
}

export const experience: Role[] = [
  {
    id: 0,
    title: "Senior Software Engineer",
    company: "Copilot",
    location: "Austin, TX (remote)",
    description: `
          Core front-end engineer building out the AI driven web and mobile application to assist users in vehicle searches.
          `,
    stack: [
      {
        name: "React",
        icon: <FaReact className="mx-auto h-8 w-8 text-blue-500" />,
      },
      {
        name: "Redux",
        icon: <SiRedux className="mx-auto h-8 w-8 text-purple-500" />,
      },
      {
        name: "CSS3",
        icon: <FaCss3Alt className="mx-auto h-8 w-8 text-blue-500" />,
      },
      {
        name: "NodeJS",
        icon: <FaNodeJs className="mx-auto h-8 w-8 text-green-500" />,
      },
      {
        name: "ExpressJS",
        icon: <SiExpress className="mx-auto h-8 w-8 text-yellow-500" />,
      },
    ],
    companyLink: "https://www.copilotsearch.com/",
    duration: "1 yr",
    icon: copilotIcon,
  },
  {
    id: 1,
    title: "Senior Software Engineer",
    company: "Ping Identity",
    location: "Austin, TX (remote)",
    description: `
          Team DaVinci. Focused on delivering product enhancements to our B2B security and authentication platform.
          `,
    stack: [
      {
        name: "React",
        icon: <FaReact className="mx-auto h-8 w-8 text-blue-500" />,
      },
      {
        name: "Redux",
        icon: <SiRedux className="mx-auto h-8 w-8 text-purple-500" />,
      },
      {
        name: "CSS3",
        icon: <FaCss3Alt className="mx-auto h-8 w-8 text-blue-500" />,
      },
      {
        name: "Redis",
        icon: <SiRedis className="mx-auto h-8 w-8 text-red-500" />,
      },
      {
        name: "NodeJS",
        icon: <FaNodeJs className="mx-auto h-8 w-8 text-green-500" />,
      },
      {
        name: "ExpressJS",
        icon: <SiExpress className="mx-auto h-8 w-8 text-yellow-500" />,
      },
      {
        name: "PostgreSQL",
        icon: <BiLogoPostgresql className="mx-auto h-8 w-8 text-blue-500" />,
      },
      {
        name: "MongoDB",
        icon: <SiMongodb className="mx-auto h-8 w-8 text-green-500" />,
      },
      {
        name: "CassandraDB",
        icon: <SiApachecassandra className="mx-auto h-8 w-8" />,
      },
    ],
    companyLink: "https://www.pingidentity.com/en.html",
    duration: "1.5 yrs",
    icon: pingIcon,
  },
  {
    id: 2,
    title: "Senior Software Engineer",
    company: "MURAL",
    location: "Austin, TX (remote)",
    description: `
          Team Integrations. Bring our productivity and team collaboration tools to the Microsoft Teams platform.
          `,
    stack: [
      {
        name: "React",
        icon: <FaReact className="mx-auto h-8 w-8 text-blue-500" />,
      },
      {
        name: "Redux",
        icon: <SiRedux className="mx-auto h-8 w-8 text-purple-500" />,
      },
      {
        name: "CSS 3",
        icon: <FaCss3Alt className="mx-auto h-8 w-8 text-blue-500" />,
      },
      {
        name: "Redis",
        icon: <SiRedis className="mx-auto h-8 w-8 text-red-500" />,
      },
      {
        name: "NodeJS",
        icon: <FaNodeJs className="mx-auto h-8 w-8 text-green-500" />,
      },
      {
        name: "ExpressJS",
        icon: <SiExpress className="mx-auto h-8 w-8 text-yellow-500" />,
      },
      {
        name: "MongoDB",
        icon: <SiMongodb className="mx-auto h-8 w-8 text-green-500" />,
      },
    ],
    companyLink: "https://www.mural.co",
    duration: "1.5 yrs",
    icon: muralIcon,
  },
  {
    id: 3,
    title: "Software Engineer",
    company: "Incentrik",
    location: "Sulphur, LA (remote)",
    description: `
          Build a centralized data historian for all process and operations data. Integrate custom SaaS applications to deliver high-end graphic frontends.`,
    stack: [
      {
        name: "Angular",
        icon: <SiAngularjs className="mx-auto h-8 w-8 text-red-500" />,
      },
      {
        name: "CSS 3",
        icon: <FaCss3Alt className="mx-auto h-8 w-8 text-blue-500" />,
      },
      {
        name: "Bootstrap",
        icon: <BsBootstrap className="mx-auto h-8 w-8 text-purple-500" />,
      },
      {
        name: "NodeJS",
        icon: <FaNodeJs className="mx-auto h-8 w-8 text-green-500" />,
      },
      {
        name: "ExpressJS",
        icon: <SiExpress className="mx-auto h-8 w-8 text-yellow-500" />,
      },
      {
        name: "MongoDB",
        icon: <SiMongodb className="mx-auto h-8 w-8 text-green-500" />,
      },
      {
        name: "MS SQL",
        icon: (
          <SiMicrosoftsqlserver className="mx-auto h-8 w-8 text-blue-500" />
        ),
      },
    ],
    companyLink: "https://www.incentrik.com",
    duration: "4 yrs",
    icon: incentrikIcon,
  },
];

export const education: Education = {
  school: "McNeese State University",
  concentration: "Computer Science",
  degree: `Bachelor's`,
  icon: lsuIcon,
};

export const skills: TechItem[] = [
  {
    name: "React",
    icon: <FaReact className="mx-auto h-12 w-12 text-blue-500" />,
  },
  {
    name: "VueJS",
    icon: <BiLogoVuejs className="mx-auto h-12 w-12 text-green-500" />,
  },
  {
    name: "CSS3",
    icon: <FaCss3Alt className="mx-auto h-12 w-12 text-blue-500" />,
  },
  {
    name: "TailwindCSS",
    icon: <BiLogoTailwindCss className="mx-auto h-12 w-12 text-blue-400" />,
  },
  {
    name: "NodeJS",
    icon: <FaNodeJs className="mx-auto h-12 w-12 text-green-500" />,
  },
  {
    name: "ExpressJS",
    icon: <SiExpress className="mx-auto h-12 w-12 text-yellow-500" />,
  },
  {
    name: "GraphQL",
    icon: <BiLogoGraphql className="mx-auto h-12 w-12 text-pink-500" />,
  },
  {
    name: "MongoDB",
    icon: <SiMongodb className="mx-auto h-12 w-12 text-green-500" />,
  },
  {
    name: "SQL",
    icon: <BsDatabase className="mx-auto h-12 w-12 text-gray-400" />,
  },
];
