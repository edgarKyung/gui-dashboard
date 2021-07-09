import React from 'react';
import classNames from 'classnames/bind';
import { PageTemplate } from '../../templates';
import styles from './PolygonPage.scss';
import {PolygonContainer} from '../../../containers';
const cx = classNames.bind(styles);

const PolygonPage = () => (
  <PageTemplate>
    <PolygonContainer />
  </PageTemplate>
);

export default PolygonPage;