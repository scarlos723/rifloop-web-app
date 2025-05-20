import { FaGithub, FaHeart } from "react-icons/fa";

export const Footer = () => (
  <footer className="w-full py-6 mt-10 flex flex-col items-center gap-2 relative bottom-0">
    <div className="flex items-center gap-2 text-white dark:text-gray-300">
      <span>Desarrollado con</span>
      <FaHeart className="text-red-500" />
      <span>por Carlos Sánchez</span>
    </div>
    <a
      href="https://github.com/scarlos723"
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-1 text-xs text-gray-400 hover:text-blue-500 transition-colors"
    >
      <FaGithub /> GitHub
    </a>
    <span className="text-xs text-gray-400">
      © {new Date().getFullYear()} Rifloop
    </span>
  </footer>
);
