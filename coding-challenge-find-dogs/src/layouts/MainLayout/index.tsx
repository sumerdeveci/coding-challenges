import { FC } from 'react';
import style from './style.module.sass';

/**
 * Main layout which is used in every page. Currently lives o top of `Router`
 */
export const MainLayout: FC = ({ children }) => (
  <div className={style.mainLayout}>
    <div className={style.mainLayoutHeader}>Find Dogs !!</div>
    <div className={style.mainLayoutBody}>
      <div className={style.mainLayoutInner}>{children}</div>
    </div>
  </div>
);
