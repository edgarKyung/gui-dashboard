import React from 'react';
import Loader from "react-loader-spinner";
import classNames from 'classnames/bind';
import styles from './LoadSpinner.module.scss';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

const cx = classNames.bind(styles);

const LoadSpinner = () => {
  return (
    <div className={cx('background-wrap')}>
      <div className={cx('loadpinner-wrap')}>
        <Loader
          type="ThreeDots"
          color="#8067C7"
          // secondaryColor="#4D84FB"
          height={100}
          width={100}
        />
      </div>
    </div>
  )
}

export default React.memo(LoadSpinner);
