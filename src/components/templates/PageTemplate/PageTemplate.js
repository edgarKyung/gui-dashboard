import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './PageTemplate.module.scss';
import { AsideContainer } from '../../../containers';

const cx = classNames.bind(styles);

const PageTemplate = ({ children }) => (
  <div className={cx('page-wrapper')}>
    <div className={cx('aside')}>
      <AsideContainer />
    </div>
    <div className={cx('content')}>
      {children}
    </div>
  </div>
);

PageTemplate.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.array, PropTypes.string]),
};

PageTemplate.defaultProps = {
  children: '',
};

export default React.memo(PageTemplate);
