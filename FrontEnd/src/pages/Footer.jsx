const Footer = () => {
  return (
    <footer className="border-t border-border bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white">
      <div className="container px-4 md:px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Logo and Tagline */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img src="../../public/assets/Logo.png" alt="logo" width={35} />
              <span className="text-xl font-bold tracking-wide">FixMate</span>
            </div>
            <p className="text-sm text-gray-400 max-w-md">
              AI-powered code review and bug detection for developers who want
              to write clean, error-free code at lightning speed.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="flex md:justify-end">
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href="/"
                  className="hover:text-primary transition-colors duration-200"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="/about"
                  className="hover:text-primary transition-colors duration-200"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  className="hover:text-primary transition-colors duration-200"
                >
                  Contact
                </a>
              </li>
              <li>
                <a
                  href="/features"
                  className="hover:text-primary transition-colors duration-200"
                >
                  Features
                </a>
              </li>
              <li>
                <a
                  href="/faqs"
                  className="hover:text-primary transition-colors duration-200"
                >
                  Faqs
                </a>
              </li>
              <li>
                <a
                  href="/getstarted"
                  className="bg-primary text-white font-semibold px-4 py-2 rounded-lg hover:bg-primary/80 transition-colors duration-200"
                >
                  Get Started
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Text */}
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-xs text-gray-500">
          © {new Date().getFullYear()} FixMate — Built with ❤️ for developers.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
