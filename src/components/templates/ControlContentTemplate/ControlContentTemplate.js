import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './ControlContentTemplate.module.scss';

const cx = classNames.bind(styles); 

const ControlContentTemplate = ({children}) => (
  <section className={cx('control-wrap')}>{children}</section>
);

ControlContentTemplate.propTypes = {
    children: PropTypes.oneOfType([PropTypes.element, PropTypes.array, PropTypes.string]),
};

ControlContentTemplate.defaultProps = {
    children: '',
};

export default ControlContentTemplate;
