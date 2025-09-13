import React, { useState } from "react";
import { Send } from "lucide-react";
import { toast } from "sonner";
import { baseUrl } from "../../../config/routes";

const FAQ: React.FC = () => {
  interface QuestionForm {
    name: string;
    email: string;
    message: string;
  }

  const [question, setQuestion] = useState<QuestionForm>({
    name: "",
    email: "",
    message: "",
  });
  const faqs = [
    {
      question: "What is DevElevate?",
      answer:
        "DevElevate is your all-in-one platform for learning, coding practice, interview prep, resume building, tech news, and community support.",
    },
    {
      question: "Is DevElevate free to use?",
      answer:
        "Core features are free. Premium features like AI-powered tools and advanced templates may require a subscription.",
    },
    {
      question: "Do I need an account to use features?",
      answer:
        "You can explore publicly available content, but creating an account unlocks personalized progress tracking and protected areas.",
    },
    {
      question: "Does dark mode work across the app?",
      answer:
        "Yes. The app remembers your preference and applies it across pages including the landing experience.",
    },
    {
      question: "Can I track my learning progress?",
      answer:
        "Yes. Your learning modules, streaks, and goals are tracked so you can monitor growth over time.",
    },
    {
      question: "How do I ask questions or get help?",
      answer:
        "Use the Community section to post, or contact us using the form below if it's account or platform related.",
    },
  ];

  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const toggleFAQ = (index: number) => {
    setActiveIndex((prev) => (prev === index ? null : index));
  };
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setQuestion({ ...question, [e.target.name]: e.target.value });
  };
  const onSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    console.log(question);

    try {
      const res = await fetch(`${baseUrl}/api/v1/faq`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(question),
      });

      if (!res.ok) {
        throw new Error("Failed to submit form");
      }

      const result = await res.json();
      toast.success(result.message || "Form submitted successfully");

      setQuestion({ name: "", email: "", message: "" });
    } catch (err) {
      console.error("❌ Error submitting form:", err);
    }
    setQuestion({ name: "", email: "", message: "" });
  };

  return (
    <section className="relative py-20" id="faq">
      {/* Background gradient to align with landing aesthetics */}
      <div className="absolute inset-0 bg-gradient-to-l via-transparent -z-10 from-indigo-900/40 to-purple-900/30" />

      <div className="container px-4 mx-auto max-w-6xl">
        <h2 className="text-3xl font-extrabold text-center text-white">
          Frequently Asked Questions
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-gray-300">
          Find answers to common questions about DevElevate
        </p>

        <div className="grid gap-4 mt-10 md:grid-cols-2">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`rounded-xl border transition-all duration-200 bg-gray-900/60 border-white/10 shadow-lg ${
                activeIndex === index ? "ring-1 ring-indigo-500/50" : ""
              }`}
            >
              <button
                type="button"
                onClick={() => toggleFAQ(index)}
                className="flex justify-between items-center px-4 py-3 w-full text-left"
              >
                <span className="pr-6 text-base font-semibold text-white">
                  {faq.question}
                </span>
                <span
                  className={`shrink-0 rounded-md border border-white/10 p-1 text-indigo-400 transition-transform ${
                    activeIndex === index ? "rotate-45" : ""
                  }`}
                  aria-hidden
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d={activeIndex === index ? "M4 8H12" : "M4 8H12M8 4V12"}
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
              </button>
              <div
                className={`px-4 overflow-hidden transition-[max-height,padding] duration-300 ${
                  activeIndex === index ? "max-h-40 pb-4" : "max-h-0"
                }`}
              >
                <p className="text-sm leading-6 text-gray-300">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Still Questions? */}
        <div className="grid gap-6 items-center p-6 mt-14 rounded-2xl border md:grid-cols-2 bg-gray-900/70 border-white/10">
          <div className="flex justify-center items-center">
            <img
              src="https://cdn.dribbble.com/userupload/33383923/file/still-9868069a3086067a79d11680d672d458.gif?resize=400x0"
              alt="Get in Touch"
              className="object-cover w-full max-w-xs h-72 bg-white rounded-xl shadow-xl md:max-w-md"
            />
          </div>
          <div>
            <h3 className="mb-4 text-2xl font-bold text-white">
              Still Questions?
            </h3>
            <form onSubmit={onSubmit} className="space-y-3">
              <input
                type="text"
                name="name"
                onChange={handleChange}
                value={question.name}
                placeholder="Your Name"
                required
                className="px-4 py-2 w-full placeholder-gray-400 text-white rounded-lg border bg-gray-800/80 border-white/10 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <input
                type="email"
                name="email"
                onChange={handleChange}
                value={question.email}
                placeholder="Email Address"
                required
                className="px-4 py-2 w-full placeholder-gray-400 text-white rounded-lg border bg-gray-800/80 border-white/10 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <textarea
                name="message"
                placeholder="Type your Message"
                value={question.message}
                onChange={handleChange}
                rows={3}
                required
                className="px-4 py-2 w-full placeholder-gray-400 text-white rounded-lg border bg-gray-800/80 border-white/10 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button
                type="submit"
                className="inline-flex gap-2 justify-center items-center px-4 py-2 w-full font-semibold text-white bg-gradient-to-r from-fuchsia-500 to-rose-500 rounded-lg transition-colors hover:from-rose-500 hover:to-fuchsia-500"
              >
                <Send className="w-5 h-5" />
                <span>Send</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;


