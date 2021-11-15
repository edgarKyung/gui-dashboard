import React from 'react';

import classNames from 'classnames/bind';
import styles from './PointPage.module.scss';
import { PageTitle, Button } from '../../atoms';
import { PageTemplate, ControlContentTemplate, MainContentTemplate, Tabs } from '../../templates';
import { RobotStatusBar, PointEditPannel, PointEditList, WallEditList } from '../../organisms';
import { CanvasMapContainer, RobotStatusBarContainer } from '../../../containers';
const cx = classNames.bind(styles);

const PointPage = ({
  canvasRef,
  activeMove,
  selectedPoint,
  points,
  onClickEditClose,
  onClickAddPoint,
  onClickPoint,
  onClickCanvasPoint,
  onClickFavorite,
  onClickToggleDisable,

  onClickRemove,
  onMovePoint,
  onMoveRotation,

  onClickCanvas,
  onClickCanvasImage,

  onMovePointStart,
  onMovePointEnd,
  onDragPointEnd,

  onChangeEditPoint,
  onChangeEditPointName,
  onChangeEditPointPosition,
  onClickSave,

  onClickWall,
  activeWallId,
  showWallList,
  virtualWall,
  virtualWallList,
  onClickAddWall,
  onClickFirstPoint,
  onDragWallEnd,
}) => {
  return (
    <PageTemplate>
      <MainContentTemplate title={'거점/가상벽 추가'}>
        <CanvasMapContainer
          pageType='point'
          canvasRef={canvasRef}
          canvasWidth={1180}
          canvasHeight={1125}
          points={points.filter(point => !point.disabled)}
          activeMove={activeMove}
          disabledDrag={activeMove !== ''}
          onClickCanvas={onClickCanvas}
          onClickCanvasImage={onClickCanvasImage}
          onClickPoint={onClickCanvasPoint}
          onMovePointStart={onMovePointStart}
          onMovePointEnd={onMovePointEnd}
          selectedPoint={selectedPoint}
          margin={75}
          drawOneTime={true}
          virtualWall={virtualWall}
          virtualWallList={virtualWallList.filter(data => !data.disabled)}
          onClickFirstPoint={onClickFirstPoint}
          activeWallId={activeWallId}
        />
      </MainContentTemplate>

      <ControlContentTemplate>
        <Tabs>
          <Tabs.Header title="거점관리">
            <div className={cx('point-edit-pannel-wrap')}>
              <div className={cx('point-pannel-wrap')}>
                <PointEditList
                  className={cx('point-edit-list')}
                  points={points}
                  onClickPoint={onClickPoint}
                  onClickFavorite={onClickFavorite}
                  onClickToggleDisable={onClickToggleDisable}
                  onClickRemove={onClickRemove}
                  onDragPointEnd={onDragPointEnd}
                  selectedPoint={selectedPoint}
                />
                <div className={cx('point-btn-wrap')}>
                  <Button type='default' onClick={onClickSave}>저장하기</Button>
                  <Button type={activeMove === 'point' ? 'gradiant-col' : 'default'} onClick={onClickAddPoint}>추가하기</Button>
                </div>
              </div>
              <div className={cx('edit-pannel-wrap')}>
                <PageTitle title='수정' />
                <PointEditPannel
                  selectedPoint={selectedPoint}
                  className={cx('')}
                  onClickClose={onClickEditClose}
                  onMovePoint={onMovePoint}
                  onMoveRotation={onMoveRotation}
                  onChangeEditPoint={onChangeEditPoint}
                  onChangeEditPointName={onChangeEditPointName}
                  onChangeEditPointPosition={onChangeEditPointPosition}
                />
              </div>
            </div>
          </Tabs.Header>
          <Tabs.Header title="가상벽관리">
            <div className={cx('wall-edit-pannel-wrap')}>
              <WallEditList
                className={cx('wall-edit-list')}
                virtualWallList={virtualWallList}
                onClickWall={onClickWall}
                showWallList={showWallList}

                onClickToggleDisable={onClickToggleDisable}
                onClickRemove={onClickRemove}
                onDragWallEnd={onDragWallEnd}
              />
              <div className={cx('virtual-btn-wrap')}>
                <Button type={activeMove === 'wall' ? 'gradiant-col' : 'default'} onClick={onClickAddWall}>추가하기</Button>
              </div>
            </div>
          </Tabs.Header>
        </Tabs>
        <RobotStatusBarContainer />
      </ControlContentTemplate>
    </PageTemplate>
  );
};

export default PointPage;