import { useRef, useState, type FormEvent } from "react";
import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";
import { fadeIn } from "../../../common/transitions";

export const ContactForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const form = useRef<HTMLFormElement>(null);

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (name && email && message && form.current) {
      const contactData = {
        name,
        email,
        message,
        messageLength: message.length,
      };
      console.log("submitting form data: ", contactData);
      emailjs
        .sendForm("service_zsxrrxc", "template_y7650e8", form.current, {
          publicKey: "HNnAcZTJzTZ1nagHz",
        })
        .then(
          () => {
            console.log("SUCCESS!");
          },
          (error: { text?: string }) => {
            console.log("FAILED...", error.text);
          },
        );
      event.currentTarget.reset();
    }
  };
  return (
    <motion.form
      ref={form}
      variants={fadeIn("left", 0.2)}
      initial="hidden"
      whileInView={"show"}
      viewport={{ once: false, amount: 0.3 }}
      className="flex flex-1 flex-col items-start gap-y-6 rounded-2xl border p-6"
      onSubmit={submit}
    >
      <input
        type="text"
        placeholder="Your name"
        required={true}
        name="name"
        className="w-full border-b bg-transparent py-3 outline-hidden transition-all placeholder:text-white focus:border-accent"
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Your email"
        required={true}
        name="email"
        className="w-full border-b bg-transparent py-3 outline-hidden transition-all placeholder:text-white focus:border-accent"
        onChange={(e) => setEmail(e.target.value)}
      />
      <textarea
        required={true}
        placeholder="Your message"
        name="message"
        maxLength={1200}
        className="w-full resize-none border-b bg-transparent pb-12 align-top outline-hidden transition-all placeholder:text-white focus:border-accent"
        onChange={(e) => setMessage(e.target.value)}
      ></textarea>
      <button type="submit" className="btn btn-lg">
        Send message
      </button>
    </motion.form>
  );
};
