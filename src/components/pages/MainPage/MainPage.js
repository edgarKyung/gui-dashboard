import React from 'react';
import classNames from 'classnames/bind';
import { PageTemplate } from '../../templates';
import styles from './MainPage.scss';
import {MainContainer} from '../../../containers';
const cx = classNames.bind(styles);

const MainPage = () => (
  <PageTemplate>
    <MainContainer />
  </PageTemplate>
);

export default MainPage;