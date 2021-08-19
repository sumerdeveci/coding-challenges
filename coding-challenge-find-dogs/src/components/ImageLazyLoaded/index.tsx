import { useState } from 'react';
import { useContext } from 'react';
import { FC } from 'react';
// @ts-ignore
import LazyLoad from 'react-lazy-load';
import { ResponsiveContext } from '../../providers/Responsive';
import style from './style.module.sass';

interface Props {
  src: string;
  height?: number | string;
  alt?: string;
}

const MOBILE_HEIGHT = 'auto';
const MOBILE_WIDTH = '100%';

// offset={100} height={height} style={{ marginRight: 4, marginBottom: 4 }} once

/**
 * !!! Dependent on `ResponsiveProvider`
 * 
 * Lazy load the image for the given src.
 * Loading is activated by the distance between the component's location and the current viewport.
 */
export const ImageLazyLoaded: FC<Props> = ({
  src,
  height: heightArg = 'unset',
  alt = 'image',
}) => {
  /**
   * Use `loaded` state to manage `width` and `height`.
   *
   * Because when there is no `width` the `LazyLoad` component does not work as expected. Set a dummy width before, and
   * set the `width` as `auto` when laoded (for mobile it should be `'100%'`)
   *
   * And if height is `auto` `LazyLoad` loads all the images in the list, so there should be a different state before
   * being loaded on mobile (on mobile we want images to be shown in auto heights)
   */
  const [loaded, setLoaded] = useState(false);
  const { isMobile } = useContext(ResponsiveContext);

  let height = heightArg;
  if (isMobile && loaded) {
    height = MOBILE_HEIGHT;
  }

  // 200 is dummy
  let width: string | number = 200;
  if (loaded) {
    width = 'auto';
    if (isMobile) {
      width = MOBILE_WIDTH;
    }
  }

  const onLoad = () => setLoaded(true);

  return (
    <LazyLoad height={height} width={width} offset={100} debounce={false}>
      <img className={style.imageLazyLoaded} src={src} alt={alt} style={{ height }} onLoad={onLoad} />
    </LazyLoad>
  );
};
