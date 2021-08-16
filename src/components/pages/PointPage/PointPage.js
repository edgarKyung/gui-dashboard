import React from 'react';

import classNames from 'classnames/bind';
import styles from './PointPage.module.scss';
import { PageTitle, Button, Icon, SwitchButton } from '../../atoms';
import { PageTemplate, ControlContentTemplate, MainContentTemplate, Tabs } from '../../templates';
import { RobotStatusBar, PointEditPannel } from '../../organisms';
import { CanvasMapContainer } from '../../../containers';
const cx = classNames.bind(styles);

const PointEditList = ({points, onClickPoint}) => (
  <div className={cx('point-wrap')}>
    <PageTitle title='거점 목록' />
    <ul className={cx('list-wrap')}>
      {points.map(data => (
        <li key={data.id}>
          <Button type='menu' />
          <Button type='default' className={cx('point-button')} onClick={() => onClickPoint(data.id)}>
            {data.name}
            <Icon type='star'/>
          </Button> 
          <SwitchButton value={true} />
          <Button type='circle'>X</Button>
        </li>
      ))}
    </ul>
  </div>
);

const PointPage = ({
  showEdit,
  editPointId,
  points,
  onClickEditClose,
  onClickAddPoint,
  onClickPoint,
}) => {  
  console.log(points);
  return(
  <PageTemplate>
    <MainContentTemplate title={'거점/가상벽 추가'}>
      <CanvasMapContainer
      canvasWidth={1185}
      canvasHeight={1069}
      />
    </MainContentTemplate>

    <ControlContentTemplate>
      <Tabs>
        <Tabs.Header title="거점관리">
          <div className={cx('point-pannel-wrap')}>
            <PointEditList 
              points={points}
              onClickPoint={onClickPoint}
            />
            <Button type={'gradiant-col'} onClick={onClickAddPoint}>추가하기</Button>
            { showEdit && 
              <PointEditPannel 
                editPointId={editPointId}
                className={cx('edit-pannel-wrap')}
                onClickClose={onClickEditClose} 
              />
            }
          </div>
        </Tabs.Header>
        <Tabs.Header title="가상벽관리">
          가상벽관리
        </Tabs.Header>
      </Tabs>
      <RobotStatusBar status='로딩중' />
    </ControlContentTemplate>
  </PageTemplate>
  );
};

export default PointPage;