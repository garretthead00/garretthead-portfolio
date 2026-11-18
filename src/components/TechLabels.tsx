interface TechLabelsProps {
  items: readonly string[];
  /** Accessible name for the list. */
  label: string;
}

export const TechLabels = ({ items, label }: TechLabelsProps) => (
  <ul aria-label={label} className="flex flex-wrap gap-2">
    {items.map((item) => (
      <li key={item} className="tech-label">
        {item}
      </li>
    ))}
  </ul>
);
