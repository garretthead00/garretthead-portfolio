import { ContactForm, ContactHeader } from "./components";

export const Contact = () => {
  return (
    <section
      id="contact"
      className="mb-8 h-svh py-8 sm:mb-2 lg:flex lg:h-screen lg:items-center lg:py-24"
    >
      <div className="container mx-auto flex flex-col lg:flex-row">
        <ContactHeader />
        <ContactForm />
      </div>
    </section>
  );
};
