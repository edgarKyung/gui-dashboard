import React, {useState} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './Tabs.module.scss';

const cx = classNames.bind(styles); 

const Tab = ({children}) => {
  return (
    <>{children}</>
  )
};

const Tabs = ({children}) => {
  const [active, setActive] = useState(0);

  const handleClickTab = (index) => {
    setActive(index);
  };

  return (
    <div className={cx('tabs-wrap')}>
      <ul className={cx('tabs-title')}>
        {
          children.map((child, index) => (
            <li key={`tabs-title-${index}`} className={cx(active === index && 'on')} onClick={()=> handleClickTab(index)}>{child.props.title}</li>
          ))
        }
      </ul>
      <div className={cx('tabs-content')}>
        {children[active].props.children}
      </div>
    </div>
  )
}

Tabs.propTypes = {
    children: PropTypes.oneOfType([PropTypes.element, PropTypes.array, PropTypes.string]),
};

Tabs.defaultProps = {
    children: '',
};

Tabs.Header = Tab;

export default Tabs;
