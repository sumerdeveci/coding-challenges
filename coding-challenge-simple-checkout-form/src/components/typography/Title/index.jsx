import style from './style.module.sass';

export const Title = ({ children, className }) => <p className={`${style.title} ${className ?? ''}`}>{children}</p>;
