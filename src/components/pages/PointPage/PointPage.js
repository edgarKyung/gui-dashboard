import React from 'react';
// import ReactDragListView  from 'react-drag-listview';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import classNames from 'classnames/bind';
import styles from './PointPage.module.scss';
import { PageTitle, Button, Icon, SwitchButton } from '../../atoms';
import { PageTemplate, ControlContentTemplate, MainContentTemplate, Tabs } from '../../templates';
import { RobotStatusBar, PointEditPannel } from '../../organisms';
import { CanvasMapContainer } from '../../../containers';
const cx = classNames.bind(styles);

const PointEditList = ({
  className, 
  points, 
  onClickPoint,
  onClickRemove,
  onDragPointEnd,
}) => {
  return (
  <div className={cx('point-wrap', className)}>
    <PageTitle title='거점 목록' />
    <DragDropContext onDragEnd={onDragPointEnd}>
      <Droppable droppableId="droppable">
        {(provided, snapshot) => (
          <ul 
            className={cx('list-wrap')}
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {points.map((data, index) => (
              <Draggable key={data.id} draggableId={data.id} index={index}>
                {(provided, snapshot) => (
                  <li 
                    key={data.id}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                  >
                    <span {...provided.dragHandleProps}><Icon type='menu' /></span>
                    <Button type='default' className={cx('point-button')} onClick={() => onClickPoint(data.id)}>
                      {data.name}
                      <Icon type='star'/>
                    </Button> 
                    <SwitchButton value={true} />
                    <Button type='circle' onClick={()=> onClickRemove(data)}>X</Button>
                  </li>
                )}
              </Draggable>
            ))}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  </div>
  )
};

const PointPage = ({
  activeAddMove,
  showEdit,
  selectedPoint,
  points,
  onClickEditClose,
  onClickAddPoint,
  onClickPoint,
  onClickRemove,
  onMovePoint,
  onMoveRotation,
  onClickCanvas,
  onMovePointStart,
  onMovePointEnd,
  onDragPointEnd,
  
  onChangeEditPoint,
  onChangeEditPointName,
  onChangeEditPointPosition,
}) => {  
  return(
  <PageTemplate>
    <MainContentTemplate title={'거점/가상벽 추가'}>
      <CanvasMapContainer
        points={points}
        canvasWidth={1185}
        canvasHeight={1137}
        disabledDrag={activeAddMove}
        onClickCanvas={onClickCanvas}
        onClickPoint={onClickPoint}
        onMovePointStart={onMovePointStart}
        onMovePointEnd={onMovePointEnd}
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
                onClickRemove={onClickRemove}
                onDragPointEnd={onDragPointEnd}
              />
              <div className={cx('point-btn-wrap')}>
                <Button type={activeAddMove ? 'gradiant-col' : 'default'} onClick={onClickAddPoint}>추가하기</Button>
              </div>
            </div>
            { showEdit && 
                <PointEditPannel 
                  selectedPoint={selectedPoint}
                  className={cx('edit-pannel-wrap')}
                  onClickClose={onClickEditClose} 
                  onMovePoint={onMovePoint}
                  onMoveRotation={onMoveRotation}
                  onChangeEditPoint={onChangeEditPoint}
                  onChangeEditPointName={onChangeEditPointName}
                  onChangeEditPointPosition={onChangeEditPointPosition}
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