import React from 'react';
import classNames from 'classnames/bind';
import { PageTemplate } from '../../templates';
import styles from './OperationPage.module.scss';
import {OperationContainer} from '../../../containers';
const cx = classNames.bind(styles);

const OperationPage = () => (
  <PageTemplate>
    <OperationContainer />
  </PageTemplate>
);

export default OperationPage;