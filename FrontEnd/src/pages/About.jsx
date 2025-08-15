import React from "react";

export default function About() {
  return (
    <div className="pt-30 min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white px-6 py-12">
      <div className="max-w-5xl mx-auto">
        {/* Page Header */}
        <header className="text-center mb-12">
          <h1 className="text-5xl font-extrabold mb-4 tracking-wide">
            About <span className="text-blue-400">Us</span>
          </h1>
          <p className="text-gray-300 text-lg">
            Building clean, functional, and innovative solutions — one line of
            code at a time.
          </p>
        </header>

        {/* About Content */}
        <section className="mb-16">
          <h2 className="text-3xl font-semibold mb-4">Who We Are</h2>
          <p className="text-gray-300 leading-relaxed">
            We are a passionate team of developers, designers, and dreamers who
            believe that technology should empower people, not complicate their
            lives. Our mission is to deliver high-quality, scalable, and
            future-ready solutions that not only work but also inspire.
          </p>
        </section>

        {/* Mission */}
        <section className="mb-16">
          <h2 className="text-3xl font-semibold mb-4">Our Mission</h2>
          <p className="text-gray-300 leading-relaxed">
            To craft software experiences that are fast, intuitive, and
            accessible to everyone. Whether it’s a small business website or a
            full-scale enterprise application, we approach every project with
            the same passion and precision.
          </p>
        </section>

        {/* Fun Facts */}
        <section className="bg-gray-800 p-6 rounded-lg shadow-lg mb-16">
          <h2 className="text-3xl font-semibold mb-4">Fun Facts</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-300">
            <li>💻 We drink more coffee than we write bugs (we think!).</li>
            <li>🚀 Deploying is our cardio.</li>
            <li>🎨 We believe code is as much an art as it is science.</li>
            <li>
              🛠 Debugging is just our way of making friends with our past
              selves.
            </li>
          </ul>
        </section>

        {/* Contact CTA */}
        <section className="text-center">
          <h2 className="text-3xl font-semibold mb-4">
            Let’s Build Something Amazing
          </h2>
          <p className="text-gray-300 mb-6">
            Got an idea? We’ve got the skills to bring it to life.
          </p>
          <a
            href="/contact"
            className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-full font-semibold transition-colors"
          >
            Contact Us
          </a>
        </section>
      </div>
    </div>
  );
}
