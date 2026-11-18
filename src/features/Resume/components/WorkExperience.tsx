import { BsArrowUpRight } from "react-icons/bs";
import { experience, type Role } from "../../../data";

import { TechStackList } from "./TechStack";
import { Reveal } from "../../../components/motion";

interface CompanyLinkProps {
  url: string;
}

const CompanyLink = ({ url }: CompanyLinkProps) => (
  <div className="flex flex-1 flex-col items-end">
    <a
      href={url}
      className="btn mb-[42px] flex h-9 w-9 items-center justify-center"
    >
      <BsArrowUpRight />
    </a>
  </div>
);

type ExperienceSummaryProps = Pick<
  Role,
  "title" | "company" | "duration" | "description"
>;

const ExperienceSummary = ({
  title,
  company,
  duration,
  description,
}: ExperienceSummaryProps) => {
  return (
    <>
      <h4 className="font-primary text-[20px] font-semibold tracking-wider">
        {title}
      </h4>

      <h4 className="font-primary text-[12px] font-semibold tracking-wider">
        {company} - {duration}
      </h4>
      <p className="font-secondary leading-tight">{description}</p>
    </>
  );
};

interface ExperienceListItemProps {
  role: Role;
}

const ExperienceListItem = ({ role }: ExperienceListItemProps) => {
  const { company, description, duration, companyLink, title, stack } = role;

  return (
    <li className="mb-[12px] flex h-fit border-b border-white/20 pb-2">
      <div className="max-w-[476px]">
        <ExperienceSummary
          title={title}
          company={company}
          duration={duration}
          description={description}
        />
        <br />
        <TechStackList stack={stack} />
      </div>
      <CompanyLink url={companyLink} />
    </li>
  );
};

export const WorkExperience = () => {
  return (
    <Reveal
      as="article"
      direction="left"
      delay={0.3}
      amount={0.1}
      className="mb-[12px] flex flex-1 pb-4"
    >
      <ul>
        {experience.map((role) => (
          <ExperienceListItem key={role.id} role={role} />
        ))}
      </ul>
    </Reveal>
  );
};
