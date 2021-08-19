import { FC } from 'react';
import { Text } from '../typography/Text';
import { Title } from '../typography/Title';
import style from './style.module.sass';
import './style.sass';

interface Props {
  error?: Error;
  message?: string;
}

/**
 * Shows an error message box within the DOM structure
 */
export const ErrorPrimary: FC<Props> = ({ error, message }) => {
  if (error) console.error(error);
  return (
    <div className={`${style.errorPrimary} notification is-danger`}>
      <Title>Error!</Title>
      <Text>{message ?? error?.message ?? 'An error occured.'}</Text>
    </div>
  );
};
