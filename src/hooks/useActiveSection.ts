import { useEffect, useState } from "react";

/**
 * Returns the id of the section the reader is in, using one
 * IntersectionObserver. A section becomes active once its top crosses a line
 * 40% down the viewport, so a short last section can still become active.
 * The lowest section in that band wins: after a nav jump, the previous
 * section still shows as a strip behind the sticky header.
 */
export const useActiveSection = <T extends string>(ids: readonly T[]): T => {
  const [activeId, setActiveId] = useState<T>(ids[0] as T);

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => element !== null);
    if (elements.length === 0) return;

    const visible = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target.id);
          else visible.delete(entry.target.id);
        }
        const current = ids.findLast((id) => visible.has(id));
        if (current !== undefined) setActiveId(current);
      },
      { rootMargin: "0px 0px -60% 0px" },
    );

    for (const element of elements) observer.observe(element);
    return () => observer.disconnect();
  }, [ids]);

  return activeId;
};
