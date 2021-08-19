import { FC } from 'react';
import { Text } from '../../components/typography/Text';
import style from './style.module.sass';

export const PageNotFoundPage: FC = () => (
  <div className={style.pageNotFoundPage}>
    <Text>Page Not Found</Text>
  </div>
);
