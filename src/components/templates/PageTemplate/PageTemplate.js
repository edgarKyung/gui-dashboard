import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './PageTemplate.css';
import {  HeaderContainer } from '../../../containers';
const cx = classNames.bind(styles);

const PageTemplate = ({ children }) => (
  <div className={cx('wrapper')}>
    <main className={cx('main')}>
      <HeaderContainer />
      {children}
    </main>
  </div>
);

PageTemplate.propTypes = {
    children: PropTypes.oneOfType([PropTypes.element, PropTypes.array, PropTypes.string]),
};

PageTemplate.defaultProps = {
    children: '',
};

export default PageTemplate;
