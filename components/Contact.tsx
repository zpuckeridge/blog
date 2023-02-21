import Script from "next/script";
import { useState } from "react";
import { FiX, FiCheck } from "react-icons/fi";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (formSubmitted) {
      alert("You can only send one message per page refresh.");
      return;
    }

    if (name.trim() === "" || email.trim() === "" || message.trim() === "") {
      alert("All fields are required. Please fill out the form completely.");
      return;
    }

    try {
      await fetch(process.env.NEXT_PUBLIC_DISCORD_WEBHOOK_URL as string, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: "Contact Form",
          content: `**Name:** ${name}\n**Email:** ${email}\n**Message:** ${message}`,
        }),
      });

      setSuccess(true);
    } catch (error) {
      setSuccess(false);
      alert("There was an error sending the message. Please try again.");
    }

    try {
      setSuccess(true);
      setFormSubmitted(true);
    } catch (error) {
      setSuccess(false);
      setError(true);
    }
  };

  return (
    <>
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js"
        async={true}
        defer={true}
      />
      <div className="bg-white/5 w-full p-4 rounded-lg border border-zinc-800/50">
        <form onSubmit={handleSubmit}>
          <label className="font-bold text-sm mb-1">
            Name
            <input
              type="text"
              id="name"
              value={name}
              className="w-full p-2 mb-4 rounded-lg bg-white/5 text-sm placeholder:text-[#888888]"
              onChange={(event) => setName(event.target.value)}
            />
          </label>
          <br />
          <label className="font-bold text-sm mb-1">
            Email
            <input
              type="email"
              id="email"
              value={email}
              placeholder="example@example.com"
              className="w-full p-2 mb-4 rounded-lg bg-white/5 text-sm placeholder:text-[#888888]"
              onChange={(event) => setEmail(event.target.value)}
            />
          </label>
          <br />
          <label className="font-bold text-sm mb-1">
            Message
            <textarea
              id="message"
              value={message}
              className="w-full p-2 h-[150px] mb-4 rounded-lg bg-white/5 text-sm placeholder:text-[#888888]"
              onChange={(event) => setMessage(event.target.value)}
            />
          </label>
          <br />
          <div className="md:flex justify-between">
            <div
              className="cf-turnstile checkbox"
              data-sitekey={process.env.NEXT_PUBLIC_TURNSTILE_KEY}></div>
            <button
              disabled={formSubmitted}
              className="py-1 px-6 md:mt-0 mt-4 bg-white/5 border border-zinc-800/50 rounded-lg flex items-center justify-center hover:ring-2 ring-gray-300 transition-all"
              type="submit">
              {!success && !error && <span>Send</span>}
              {success && <FiCheck />}
              {error && <FiX />}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Contact;
