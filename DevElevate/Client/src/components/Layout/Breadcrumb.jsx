import React from 'react';
import { PanelLeftOpen, PanelLeftClose, ChevronRight, Home, Minus } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Breadcrumb = ({ isSidebarOpen, toggleSidebar, className = '' }) => {
    const location = useLocation();
    const pathnames = location.pathname.split('/').filter(Boolean);

    // Don't show breadcrumb on home page
    if (pathnames.length === 0) return null;

    return (
        <nav
            className={`flex items-center w-full py-3 px-4 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 ${className}`}
            aria-label="Breadcrumb"
        >
            <ol className="flex items-center space-x-1 text-sm md:text-base overflow-x-auto whitespace-nowrap hide-scrollbar">
                {/* Mobile Sidebar Toggle */}
                <div className='flex justify-center items-center md:hidden'>
                    <button
                        onClick={toggleSidebar}
                        className="p-1.5 mr-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors md:hidden"
                        aria-label={isSidebarOpen ? 'Close sidebar' : 'Open sidebar'}
                    >
                        {isSidebarOpen ? (
                            <PanelLeftClose className="size-4 text-gray-600 dark:text-gray-300" />
                        ) : (
                            <PanelLeftOpen className="size-4 text-gray-600 dark:text-gray-300" />
                        )}
                    </button>
                    <Minus className="w-4 h-4 text-gray-400 -rotate-90 mr-2 md:hidden" />
                </div>

                {/* Breadcrumb Items */}
                {pathnames.map((name, index) => {
                    const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
                    const isLast = index === pathnames.length - 1;
                    const displayName = name
                        .split('-')
                        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                        .join(' ');

                    return (
                        <React.Fragment key={name}>
                            {index > 0 && (  // Only show chevron after the first item
                                <li className="flex items-center text-gray-400 dark:text-gray-500">
                                    <ChevronRight className="w-4 h-4 mx-1" />
                                </li>
                            )}

                            <li className={`flex items-center ${isLast ? 'text-primary-600 dark:text-primary-400 font-medium' : 'text-gray-600 dark:text-gray-300'}`}>
                                {isLast ? (
                                    <span className="text-sm md:text-base truncate max-w-[120px] md:max-w-none">
                                        {displayName}
                                    </span>
                                ) : (
                                    <Link
                                        to={routeTo}
                                        className="text-sm md:text-base hover:text-primary-600 dark:hover:text-primary-400 transition-colors truncate max-w-[100px] md:max-w-none"
                                    >
                                        {displayName}
                                    </Link>
                                )}
                            </li>
                        </React.Fragment>
                    );
                })}
            </ol>

            <style jsx>{`
                .hide-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
                .hide-scrollbar::-webkit-scrollbar {
                    display: none;
                }
            `}</style>
        </nav>
    );
};

export default Breadcrumb;
