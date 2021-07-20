import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './MainContentTemplate.module.scss';
import { PageTitle } from '../../atoms';

const cx = classNames.bind(styles); 

const MainContentTemplate = ({title, classNames, children}) => (
  <section className={cx('content-section', classNames)}>
    <PageTitle title={title}/>
    <div className={cx('page-content')}>
      {children}
    </div>
  </section>
);

MainContentTemplate.propTypes = {
    children: PropTypes.oneOfType([PropTypes.element, PropTypes.array, PropTypes.string]),
};

MainContentTemplate.defaultProps = {
    children: '',
};

export default MainContentTemplate;
