import style from './style.module.sass';

export const Column = ({ children, className }) => (
  <div className={`${style.column} ${className ?? ''}`}>{children}</div>
);
