import { FC } from 'react';
import style from './style.module.sass';
import './style.sass';

interface Props {
  onChange: (e: any) => void;
  text?: string;
}

/**
 * Displays a button to upload images
 */
export const ImageUpload: FC<Props> = ({ onChange, text = 'Upload image' }) => {
  return (
    <div className={`${style.imageUpload} file is-primary`}>
      <label className="file-label">
        <input className="file-input" type="file" accept="image/*" onChange={onChange} />
        <span className="file-cta">
          <span className="file-label">{text}</span>
        </span>
      </label>
    </div>
  );
};
