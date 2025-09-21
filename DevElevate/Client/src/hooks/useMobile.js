import { useState, useEffect } from 'react';

/**
 * Custom hook to detect if the viewport is mobile size
 * @param {number} breakpoint - The breakpoint in pixels to consider as mobile (default: 768px)
 * @returns {boolean} - True if viewport is mobile size, false otherwise
 */
const useMobile = (breakpoint = 768) => {
    const [isMobile, setIsMobile] = useState(() => window.innerWidth < breakpoint);

    useEffect(() => {
        const handleResize = () => {
            const isMobileView = window.innerWidth < breakpoint;
            if (isMobileView !== isMobile) {
                setIsMobile(isMobileView);
            }
        };

        // Set initial value
        handleResize();

        // Add event listener
        window.addEventListener('resize', handleResize);

        // Clean up
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [breakpoint, isMobile]);

    return isMobile;
};

export default useMobile;
