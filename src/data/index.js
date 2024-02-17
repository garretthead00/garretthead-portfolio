// COMPANY & SCHOOL ICONS
import pingIcon from "../assets/images/Ping.png";
import muralIcon from "../assets/images/Mural.png";
import incentrikIcon from "../assets/images/InCentrik.png";
import bridgestoneFirestoneIcon from "../assets/images/Firestone.png";
import mcneeseIcon from "../assets/images/McNeese.png";

// TECH ICONS
import { FaCss3Alt, FaReact, FaNodeJs } from "react-icons/fa";
import { BiLogoGraphql, BiLogoPostgresql, BiLogoTailwindCss, BiLogoVuejs } from "react-icons/bi";
import { BsBootstrap, BsDatabase } from "react-icons/bs";
import {
  SiAngularjs,
  SiApachecassandra,
  SiDotnet,
  SiExpress,
  SiMicrosoftsqlserver,
  SiMongodb,
  SiRedis,
  SiRedux,
} from "react-icons/si";

export const experience = [
  {
    id: 0,
    title: "Senior Software Engineer",
    company: "Ping Identity",
    location: "Austin, TX (remote)",
    description: `
          Team DaVinci. Focused on delivering product enhancements to our B2B security and authentication platform.
          `,
    stack: [
      {
        name: "React",
        icon: <FaReact className="w-8 h-8 mx-auto text-blue-500" />,
      },
      {
        name: "Redux",
        icon: <SiRedux className="w-8 h-8 mx-auto text-purple-500" />,
      },
      {
        name: "CSS3",
        icon: <FaCss3Alt className="w-8 h-8 mx-auto text-blue-500" />,
      },
      {
        name: "Redis",
        icon: <SiRedis className="w-8 h-8 mx-auto text-red-500" />,
      },
      {
        name: "NodeJS",
        icon: <FaNodeJs className="w-8 h-8 mx-auto text-green-500" />,
      },
      {
        name: "ExpressJS",
        icon: <SiExpress className="w-8 h-8 mx-auto text-yellow-500" />,
      },
      {
        name: "PostgreSQL",
        icon: <BiLogoPostgresql className="w-8 h-8 mx-auto text-blue-500" />,
      },
      {
        name: "MongoDB",
        icon: <SiMongodb className="w-8 h-8 mx-auto text-green-500" />,
      },
      {
        name: "CassandraDB",
        icon: <SiApachecassandra className="w-8 h-8 mx-auto" />,
      },
    ],
    companyLink: "https://www.pingidentity.com/en.html",
    duration: "1.5 yrs",
    icon: pingIcon,
  },
  {
    id: 1,
    title: "Senior Software Engineer",
    company: "MURAL",
    location: "Austin, TX (remote)",
    description: `
          Team Integrations. Bring our productivity and team collaboration tools to the Microsoft Teams platform.
          `,
    stack: [
      {
        name: "React",
        icon: <FaReact className="w-8 h-8 mx-auto text-blue-500" />,
      },
      {
        name: "Redux",
        icon: <SiRedux className="w-8 h-8 mx-auto text-purple-500" />,
      },
      {
        name: "CSS 3",
        icon: <FaCss3Alt className="w-8 h-8 mx-auto text-blue-500" />,
      },
      {
        name: "Redis",
        icon: <SiRedis className="w-8 h-8 mx-auto text-red-500" />,
      },
      {
        name: "NodeJS",
        icon: <FaNodeJs className="w-8 h-8 mx-auto text-green-500" />,
      },
      {
        name: "ExpressJS",
        icon: <SiExpress className="w-8 h-8 mx-auto text-yellow-500" />,
      },
      {
        name: "MongoDB",
        icon: <SiMongodb className="w-8 h-8 mx-auto text-green-500" />,
      },
    ],
    companyLink: "https://www.mural.co",
    duration: "1.5 yrs",
    icon: muralIcon,
  },
  {
    id: 2,
    title: "Software Engineer",
    company: "Incentrik",
    location: "Sulphur, LA (remote)",
    description: `
          Build a centralized data historian for all process and operations data. Integrate custom SaaS applications to deliver high-end graphic frontends.`,
    stack: [
      {
        name: "Angular",
        icon: <SiAngularjs className="w-8 h-8 mx-auto text-red-500" />,
      },
      {
        name: "CSS 3",
        icon: <FaCss3Alt className="w-8 h-8 mx-auto text-blue-500" />,
      },
      {
        name: "Bootstrap",
        icon: <BsBootstrap className="w-8 h-8 mx-auto text-purple-500" />,
      },
      {
        name: "NodeJS",
        icon: <FaNodeJs className="w-8 h-8 mx-auto text-green-500" />,
      },
      {
        name: "ExpressJS",
        icon: <SiExpress className="w-8 h-8 mx-auto text-yellow-500" />,
      },
      {
        name: "MongoDB",
        icon: <SiMongodb className="w-8 h-8 mx-auto text-green-500" />,
      },
      {
        name: "MS SQL",
        icon: (
          <SiMicrosoftsqlserver className="w-8 h-8 mx-auto text-blue-500" />
        ),
      },
    ],
    companyLink: "https://www.incentrik.com",
    duration: "4 yrs",
    icon: incentrikIcon,
  },
  {
    id: 3,
    title: "Applications Developer",
    company: "Bridgestone-Firestone",
    location: "Sulphur, LA",
    description: `Create a custom suite of business applications for optimizing and automating critical day-to-day business functions.`,
    stack: [
      {
        name: "Angular",
        icon: <SiAngularjs className="w-8 h-8 mx-auto text-red-500" />,
      },
      {
        name: "CSS 3",
        icon: <FaCss3Alt className="w-8 h-8 mx-auto text-blue-500" />,
      },
      {
        name: "Bootstrap",
        icon: <BsBootstrap className="w-8 h-8 mx-auto text-purple-500" />,
      },
      {
        name: "NodeJS",
        icon: <FaNodeJs className="w-8 h-8 mx-auto text-green-500" />,
      },
      {
        name: "ExpressJS",
        icon: <SiExpress className="w-8 h-8 mx-auto text-yellow-500" />,
      },
      {
        name: ".NET",
        icon: <SiDotnet className="w-8 h-8 mx-auto text-gray-300" />,
      },
      {
        name: "MS SQL",
        icon: (
          <SiMicrosoftsqlserver className="w-8 h-8 mx-auto text-blue-500" />
        ),
      },
    ],
    companyLink: "https://www.bridgestoneamericas.com/en/index",
    duration: "4 yrs",
    icon: bridgestoneFirestoneIcon,
  },
];

export const education = {
  school: "McNeese State University",
  concentration: "Computer Science",
  degree: `Bachelor's`,
  icon: mcneeseIcon,
};

export const skills = [
  {
    name: "React",
    icon: <FaReact className="w-12 h-12 mx-auto text-blue-500" />,
  },
  {
    name: "VueJS",
    icon: <BiLogoVuejs className="w-12 h-12 mx-auto text-green-500" />,
  },
  {
    name: "CSS3",
    icon: <FaCss3Alt className="w-12 h-12 mx-auto text-blue-500" />,
  },
  {
    name: "TailwindCSS",
    icon: <BiLogoTailwindCss className="w-12 h-12 mx-auto text-blue-400" />,
  },
  {
    name: "NodeJS",
    icon: <FaNodeJs className="w-12 h-12 mx-auto text-green-500" />,
  },
  {
    name: "ExpressJS",
    icon: <SiExpress className="w-12 h-12 mx-auto text-yellow-500" />,
  },
  {
    name: "GraphQL",
    icon: <BiLogoGraphql className="w-12 h-12 mx-auto text-pink-500" />,
  },
  {
    name: "MongoDB",
    icon: <SiMongodb className="w-12 h-12 mx-auto text-green-500" />,
  },
  {
    name: "SQL",
    icon: <BsDatabase className="w-12 h-12 mx-auto text-gray-400" />,
  },
]