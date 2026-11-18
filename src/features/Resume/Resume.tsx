import React from 'react'
import { JobTitle, WorkExperience } from './components'

export const Resume = () => {
  return (
    <section id="resume" className="section container mx-auto flex flex-col lg:flex-row">
      <JobTitle />
      <WorkExperience />
    </section>
  );
};
