import './style.sass';
import style from './style.module.sass';

export const ButtonPrimary = ({ children, className, onClick = () => {}, type = 'button', disabled = false }) => (
  <button className={`button is-primary ${style.buttonPrimary} ${className ?? ''}`} onClick={onClick} type={type} disabled={disabled}>
    {children}
  </button>
);
