import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { FiGithub, FiChevronRight, FiX } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import categories from "./JsSideBarData.json";
import useMobile from "../../../../hooks/useMobile";

const JavaScriptNotesSidebar = ({ onNavigate }) => {
  const isMobile = useMobile(768);
  const location = useLocation();

  const handleNavClick = () => {
    if (isMobile && onNavigate) {
      onNavigate();
    }
  };

  const [expandedCategories, setExpandedCategories] = useState(new Set());

  // Set the initial expanded categories based on the current URL path
  useEffect(() => {
    // Look for the last path that is open, if that found in the sidebar -> if found expand that category else expand the first one.
    let path = location.pathname.split("/").pop();
    const category = Object.keys(categories).find((key) =>
      categories[key].some(
        (item) => item.toLowerCase().replace(/\s+/g, "-") === path
      )
    );
    if (category) {
      setExpandedCategories(new Set([category]));
    } else {
      const category = Object.keys(categories)[0];
      setExpandedCategories(new Set([category]));
    }
  }, []);

  const toggleCategory = (category) => {
    setExpandedCategories((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(category)) {
        newSet.delete(category);
      } else {
        newSet.add(category);
      }
      return newSet;
    });
  };

  const isCategoryExpanded = (category) => expandedCategories.has(category);

  return (
    <div className="flex flex-col w-full h-full overflow-y-auto bg-white border-r dark:bg-black border-black/50 dark:border-white/50">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <h2 className="flex items-center text-xl font-bold text-gray-800 dark:text-gray-100">
          <span className="mr-2 text-primary-600 dark:text-primary-400">•</span>
          <NavLink to="/notes/javascript" onClick={handleNavClick}>
            JavaScript NOTES
          </NavLink>
        </h2>
      </div>

      <div className="flex-1 px-1 py-2 overflow-y-auto">
        {Object.entries(categories).map(([category, items]) => (
          <div key={category} className="mb-1">
            <button
              onClick={() => toggleCategory(category)}
              className={`w-full flex items-center justify-between px-4 py-2.5 text-sm font-medium rounded-md transition-all duration-200
                                ${
                                  isCategoryExpanded(category)
                                    ? "text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-gray-700/50"
                                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/70"
                                }`}
            >
              <span>{category}</span>
              <motion.span
                animate={{
                  rotate: isCategoryExpanded(category) ? 0 : -90,
                }}
                transition={{ duration: 0.2 }}
              >
                <FiChevronRight className="w-4 h-4" />
              </motion.span>
            </button>

            <AnimatePresence>
              {isCategoryExpanded(category) && (
                <motion.div
                  initial={{ opacity: 0, height: 0, overflow: "hidden" }}
                  animate={{
                    opacity: 1,
                    height: "auto",
                    transition: {
                      opacity: { duration: 0.2 },
                      height: { duration: 0.2 },
                    },
                  }}
                  exit={{
                    opacity: 0,
                    height: 0,
                    transition: {
                      opacity: { duration: 0.1 },
                      height: { duration: 0.2 },
                    },
                  }}
                  className="pl-6"
                >
                  <div className="py-1 space-y-1">
                    {items.map((item, index) => (
                      <NavLink
                        key={index}
                        to={`/notes/javascript/${item
                          .toLowerCase()
                          .replace(/\s+/g, "-")}`}
                        onClick={handleNavClick}
                        className={({ isActive }) => `
                                                    block px-3 py-2 text-sm rounded-md transition-colors duration-200 ${
                                                      isActive
                                                        ? "text-white bg-primary-600 dark:bg-primary-900 font-medium"
                                                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/50 hover:text-gray-900 dark:hover:text-white"
                                                    }`}
                      >
                        {item}
                      </NavLink>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>

      <div className="p-4 mt-auto border-t border-gray-200 dark:border-gray-700">
        <a
          href="https://github.com/abhisek2004/Dev-Elevate.git"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center text-gray-600 transition-colors dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400"
        >
          <FiGithub className="w-4 h-4 mr-2" />
          Star on GitHub
        </a>
      </div>
    </div>
  );
};

export default JavaScriptNotesSidebar;
