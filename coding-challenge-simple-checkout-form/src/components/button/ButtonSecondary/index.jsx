import './style.sass';
import style from './style.module.sass';

export const ButtonSecondary = ({ children, className, onClick = () => {}, type = 'button', disabled = false }) => (
  <button className={`button ${style.buttonSecondary} ${className ?? ''}`} onClick={onClick} type={type} disabled={disabled}>
    {children}
  </button>
);
