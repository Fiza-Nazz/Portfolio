import React from "react";
import { FaInstagram, FaLinkedin, FaGithub } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="w-full py-4 bg-black-100/55 text-white flex justify-center gap-6">
      <a
        href="https://github.com/FatimaNazeer777"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="GitHub: @FatimaNazeer777"
        title="GitHub: @FatimaNazeer777"
        className="hover:text-[#915EFF] transition-colors"
      >
        <FaGithub size={22} />
      </a>
      <a
        href="https://www.linkedin.com/in/fatima-nazeer-493a83278/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="LinkedIn: fatima-nazeer-493a83278"
        title="LinkedIn: fatima-nazeer-493a83278"
        className="hover:text-[#915EFF] transition-colors"
      >
        <FaLinkedin size={22} />
      </a>
      <a
        href="https://www.instagram.com/fatimayy__here"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Instagram: @fatimayy__here"
        title="Instagram: @fatimayy__here"
        className="hover:text-[#915EFF] transition-colors"
      >
        <FaInstagram size={22} />
      </a>
    </footer>
  );
};

export default Footer;