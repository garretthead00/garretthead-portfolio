import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";
import { fadeIn } from "../../../common/transitions";

export const ContactForm = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const form = useRef();

  const submit = (event) => {
    event.preventDefault();
    if (name && email && message) {
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
          (error) => {
            console.log("FAILED...", error.text);
          }
        );
      event.target.reset();
    }
  };
  return (
    <motion.form
      ref={form}
      variants={fadeIn("left", 0.2)}
      initial="hidden"
      whileInView={"show"}
      viewport={{ once: false, amount: 0.3 }}
      className="flex-1 border rounded-2xl flex flex-col gap-y-6 p-6 items-start"
      onSubmit={submit}
    >
      <input
        type="text"
        placeholder="Your name"
        required={true}
        name="name"
        className="bg-transparent border-b py-3 outline-none w-full placeholder:text-white focus:border-accent transition-all"
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Your email"
        required={true}
        name="email"
        className="bg-transparent border-b py-3 outline-none w-full placeholder:text-white focus:border-accent transition-all"
        onChange={(e) => setEmail(e.target.value)}
      />
      <textarea
        required={true}
        placeholder="Your message"
        name="message"
        maxLength="1200"
        className="bg-transparent border-b pb-12 align-top outline-none w-full placeholder:text-white focus:border-accent transition-all resize-none"
        onChange={(e) => setMessage(e.target.value)}
      ></textarea>
      <button type="submit" className="btn btn-lg">
        Send message
      </button>
    </motion.form>
  );
};
