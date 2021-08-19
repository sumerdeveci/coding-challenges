import style from './style.module.sass';

export const Row = ({ children, className, w100 = false }) => (
  <div className={`${style.row} ${className ?? ''} ${w100 ? style.w100 : ''}`}>
    {children}
  </div>
);