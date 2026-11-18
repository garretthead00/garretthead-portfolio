import { ContactForm, ContactHeader } from "./components";

export const Contact = () => {
  return (
    <section id="contact" className="h-svh py-8 mb-8 sm:mb-2 lg:section">
      <div className="container mx-auto flex flex-col lg:flex-row">
      <ContactHeader />
      <ContactForm />
      </div>
    </section>
  );
};
