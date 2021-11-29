import React from 'react';
import classNames from 'classnames/bind';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { PageTitle, Button, Icon, SwitchButton } from '../../atoms';
import styles from './PointEditList.module.scss';

const cx = classNames.bind(styles);

const PointEditList = ({
  className,
  points,
  onClickPoint,
  onClickFavorite,
  onClickToggleDisable,
  onClickRemove,
  onDragPointEnd,
  selectedPoint,
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
              {points.map((data, index) => {
                const isActive = selectedPoint.id === data.id;
                return (
                  <Draggable key={data.id} draggableId={data.id} index={index}>
                    {(provided, snapshot) => (
                      <li
                        id={`point-${data.id}`}
                        key={data.id}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                      >
                        <span {...provided.dragHandleProps}><Icon type='menu' /></span>
                        <Button type='default' className={cx('point-button', isActive && 'active')} onClick={() => onClickPoint(data.id)}>
                          {data.name}
                          <Icon type='star' active={data.favorite} onClick={(e) => onClickFavorite(e, data)} />
                        </Button>
                        <SwitchButton value={!data.disabled} onClick={() => onClickToggleDisable(data, 'point')} />
                        <Button type='circle' onClick={() => onClickRemove(data, 'point')}>X</Button>
                      </li>
                    )}
                  </Draggable>
                )
              })}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  )
};

PointEditList.defaultProps = {
  points: [],
  selectedPoint: {},
};

export default PointEditList;
