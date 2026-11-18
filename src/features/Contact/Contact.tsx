import { ContactForm, ContactHeader } from "./components";

export const Contact = () => {
  return (
    <section id="contact" className="lg:section mb-8 h-svh py-8 sm:mb-2">
      <div className="container mx-auto flex flex-col lg:flex-row">
        <ContactHeader />
        <ContactForm />
      </div>
    </section>
  );
};
