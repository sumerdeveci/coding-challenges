import style from './style.module.sass';

export const RowResponsive = ({ children, className }) => (
  <div className={`${style.rowResponsive} ${className ?? ''}`}>{children}</div>
);
