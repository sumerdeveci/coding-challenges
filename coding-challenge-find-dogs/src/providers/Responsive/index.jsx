import React, { useEffect, useState, FC } from 'react';

const MOBILE_MAX_WIDTH = 767.98;

const ResponsiveContext = React.createContext({
  isMobile: window.innerWidth <= MOBILE_MAX_WIDTH,
});

/**
 * Provide information about either the current display is a "mobile" display or a "desktop" display.
 * Check on resize too.
 */
const ResponsiveProvider: FC = ({ children }) => {
  const [responsiveness, setResponsiveness] = useState({
    isMobile: window.innerWidth <= MOBILE_MAX_WIDTH,
  });

  const handleWindowSizeChange = () => {
    const { isMobile } = responsiveness;
    const hasMobileDiminsions = window.innerWidth <= MOBILE_MAX_WIDTH;
    if ((isMobile && !hasMobileDiminsions) || (!isMobile && hasMobileDiminsions)) {
      setResponsiveness({ isMobile: hasMobileDiminsions });
    }
  };

  useEffect(() => {
    window.addEventListener('resize', handleWindowSizeChange);
    return () => {
      window.removeEventListener('resize', handleWindowSizeChange);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [responsiveness]);

  return <ResponsiveContext.Provider value={responsiveness}>{children}</ResponsiveContext.Provider>;
};

export { ResponsiveProvider, ResponsiveContext };
