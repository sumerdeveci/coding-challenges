import { FC } from 'react';
import style from './style.module.sass';

/**
 * A loader with 3 horizontal dots which are going up and down
 */
export const ThreeDotsLoader: FC = () => (
  <div className={style.threeDotsLoader}>
    <div className={style.dot} />
    <div className={style.dot} />
    <div className={style.dot} />
  </div>
);
