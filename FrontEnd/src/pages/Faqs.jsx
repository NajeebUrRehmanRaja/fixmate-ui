import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const faqs = [
  {
    question: "What is this AI platform about?",
    answer:
      "Our AI platform analyzes your input code and provides intelligent suggestions, bug detection, and performance improvements in real-time.",
  },
  {
    question: "How does the AI detect bugs?",
    answer:
      "The AI uses advanced machine learning models trained on millions of code samples to detect syntax errors, logical issues, and security vulnerabilities.",
  },
  {
    question: "Do I need coding experience to use it?",
    answer:
      "Not at all! The interface is beginner-friendly. Even if you are new to coding, our AI guides you step-by-step.",
  },
  {
    question: "Can I integrate this AI into my own projects?",
    answer:
      "Yes, we offer an API that you can integrate into your applications, allowing you to use the AI's code review features directly.",
  },
  {
    question: "Is my code safe when I upload it?",
    answer:
      "Absolutely. All code is processed securely, and we never store or share your code without your permission.",
  },
  {
    question: "Does it support multiple programming languages?",
    answer:
      "Yes, our AI currently supports JavaScript, Python, Java, C++, and more languages are added regularly.",
  },
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="pt-20 max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center mb-8">FAQ</h1>
      <h2 className="text-2xl font-semibold text-center mb-6">
        Popular Questions
      </h2>

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border-b pb-4 cursor-pointer"
            onClick={() => toggleFAQ(index)}
          >
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">{faq.question}</h3>
              {openIndex === index ? <FaChevronUp /> : <FaChevronDown />}
            </div>
            {openIndex === index && (
              <p className="mt-2 text-gray-600">{faq.answer}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
