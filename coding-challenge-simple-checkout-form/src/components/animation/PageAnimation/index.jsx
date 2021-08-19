import { useState } from 'react';
import style from './style.module.sass';

export const PageAnimation = ({ PageComponent }) => {
  const [isPageOut, setPageOut] = useState(false);

  const pageOutAnimationAndExitPage = (exitPage) => {
    setPageOut(true);
    setTimeout(() => exitPage(), 200);
  };

  return (
    <div className={`${style.pageAnimation} ${isPageOut ? style.pageOut : ''}`}>
      <PageComponent pageOutAnimationAndExitPage={pageOutAnimationAndExitPage} />
    </div>
  );
};
