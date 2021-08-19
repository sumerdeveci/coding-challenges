import style from './style.module.sass';

export const MainLayout = ({ children }) => (
  <div className={style.mainLayout}>
    <div className={style.mainLayoutInner}>{children}</div>
  </div>
);
