import { Icon } from "../../components/Icon";
import { TechLabels } from "../../components/TechLabels";
import { formatYearMonth, type Role } from "../../content";

interface RoleCardProps {
  role: Role;
}

export const RoleCard = ({ role }: RoleCardProps) => (
  <article className="card grid gap-x-10 gap-y-4 p-6 md:grid-cols-3 md:p-8">
    <header className="flex flex-col gap-1.5">
      <p className="font-mono text-[13px] text-light-gray">
        <time dateTime={role.start}>{formatYearMonth(role.start)}</time>
        {" – "}
        <time dateTime={role.end}>{formatYearMonth(role.end)}</time>
      </p>
      <h3 className="font-display text-[22px] leading-snug font-bold">
        {role.company}
      </h3>
      <p className="font-semibold text-lsu-gold">{role.title}</p>
      <a
        href={role.companyUrl}
        className="flex min-h-11 items-center gap-1.5 text-sm font-medium"
      >
        {role.company} on LinkedIn
        <Icon name="external" size={16} />
      </a>
    </header>
    <div className="flex flex-col gap-5 md:col-span-2">
      <ul className="flex list-disc flex-col gap-2.5 pl-5 text-light-gray marker:text-light-purple">
        {role.highlights.map((highlight) => (
          <li key={highlight}>{highlight}</li>
        ))}
      </ul>
      <TechLabels
        items={role.technologies}
        label={`${role.company} technologies`}
      />
    </div>
  </article>
);
