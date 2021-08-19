import { FC } from 'react';
import style from './style.module.sass';

/**
 * Standard text, the most common type of text will be this component
 */
export const Text: FC = ({ children }) => <span className={style.text}>{children}</span>;
