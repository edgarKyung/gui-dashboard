import React from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import classNames from 'classnames/bind';
import styles from './Slider.scss';
const cx = classNames.bind(styles);

const SliderWrap = (props) => (
  <div className={cx('slider-wrap')}>
    <Slider
      included={false}
      {...props}
    />
  </div>
);

export default React.memo(SliderWrap);
