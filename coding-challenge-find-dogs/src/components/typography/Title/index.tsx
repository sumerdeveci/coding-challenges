import { FC } from 'react';
import style from './style.module.sass';

/**
 * Displays a bigger font text
 */
export const Title: FC = ({ children }) => <span className={style.title}>{children}</span>;
