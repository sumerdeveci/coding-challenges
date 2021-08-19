import { FC } from 'react';
import ReactDOM from 'react-dom';
import { Text } from '../../typography/Text';
import { ThreeDotsLoader } from '../ThreeDotsLoader';
import style from './style.module.sass';

interface Props {
  visible: boolean;
  message?: string;
}

/**
 * A loader which blocks the whole page with an overlay, containing a `ThreeDotsLoader` and a message
 */
export const FullPageLoader: FC<Props> = ({ visible, message = 'Loading..' }) => {
  if (!visible) return null;

  return ReactDOM.createPortal(
    <div className={style.fullPageLoader}>
      <div className={style.fullPageLoaderInner}>
        <ThreeDotsLoader />
        <div className={style.message}>
          <Text>{message}</Text>
        </div>
      </div>
    </div>,
    document.body
  );
};
