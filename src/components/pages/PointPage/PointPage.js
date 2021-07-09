import React from 'react';
import classNames from 'classnames/bind';
import { PageTemplate } from '../../templates';
import styles from './PointPage.scss';
import {PointContainer} from '../../../containers';
const cx = classNames.bind(styles);

const PointPage = () => (
  <PageTemplate>
    <PointContainer />
  </PageTemplate>
);

export default PointPage;