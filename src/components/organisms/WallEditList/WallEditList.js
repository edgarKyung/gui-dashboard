import React from 'react';
import classNames from 'classnames/bind';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Stage, Graphics } from '@inlet/react-pixi';
import { PageTitle, Button, Icon, SwitchButton } from '../../atoms';
import styles from './WallEditList.module.scss';

const cx = classNames.bind(styles);

const WallEditList = ({
  className,
  virtualWallList,
  onClickWall,
  showWallList,

  onClickToggleDisable,
  onClickRemove,
  onDragWallEnd,
}) => {
  return (
    <div className={cx('wall-wrap', className)}>
      <PageTitle title='가상벽 목록' />
      <DragDropContext onDragEnd={onDragWallEnd}>
        <Droppable droppableId="droppable">
          {provided => (
            <ul
              className={cx('list-wrap')}
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {virtualWallList.map((data, index) => (
                <Draggable key={data.id} draggableId={data.id} index={index}>
                  {provided => (
                    <li
                      key={data.id}
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                    >
                      <div>
                        <span {...provided.dragHandleProps}><Icon type='menu' /></span>
                        <Button type='default' className={cx('wall-button')} onClick={() => onClickWall(data)}>
                          <span>{data.name}</span>
                          <div className={cx('wall-canvas')}>
                            <Stage width={110} height={100} options={{ backgroundAlpha: 0 }}>

                            </Stage>
                          </div>
                        </Button>
                        <SwitchButton value={!data.disabled} onClick={() => onClickToggleDisable(data, 'wall')} />
                        <Button type='circle' onClick={() => onClickRemove(data, 'wall')}>X</Button>
                      </div>
                      <div className={cx('wall-position-wrap')} style={{ display: showWallList.includes(data.id) ? 'block' : 'none'}}>
                        <ul>
                          {data.data.map((pose, index) => (
                            <li key={index}>
                              <span><i className={cx('icon')}/></span>
                              <span>X {pose.x.toFixed(2)}</span>
                              <span>Y {pose.y.toFixed(2)}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
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

WallEditList.defaultProps = {
  virtualWallList: [],
};

export default WallEditList;
