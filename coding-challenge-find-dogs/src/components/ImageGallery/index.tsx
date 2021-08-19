import { FC } from 'react';
import { ImageLazyLoaded } from '../ImageLazyLoaded';
import style from './style.module.sass';

interface Props {
  images: { url: string; alt?: string }[];
  rowHeight?: string | number;
}

/**
 * Lists the images on a flex row basis and with a fixed height.
 * 
 * The need for implementing a custom image library component is the following:
 * To be able to use `LazyLoad` freely (wrap it around img tag), we need a custom implementation
 */
export const ImageGallery: FC<Props> = ({ images, rowHeight = 180 }) => (
  <div className={style.imageGallery}>
    {images.map((image) => (
      <ImageLazyLoaded src={image.url} alt={image.alt} height={rowHeight} key={Math.random()} />
    ))}
  </div>
);
