import React, { useState, useCallback } from 'react';
import classNames from 'classnames/bind';
import styles from './RobotList.module.scss';
import { Button, Input } from '../../atoms';
import { useTable, useSortBy } from 'react-table'

const cx = classNames.bind(styles);
function Table({ columns, data, onClickRobot }) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable(
    {
      columns,
      data,
      onClickRobot,
    },
    useSortBy
  )
  

  return (
    <>
      <table {...getTableProps()} className={cx('robot-table-wrap')}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                // Add the sorting props to control sorting. For this example
                // we can add them into the header props
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render('Header')}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? ' 🔽'
                        : ' 🔼'
                      : ''}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        
        <tbody {...getTableBodyProps()}>
          {rows.map(
            (row, i) => {
              prepareRow(row);
              const { id, name } = row.original;
              return (
                <>
                  <tr {...row.getRowProps()} onClick={onClickRobot.bind(this, id)}>
                    {row.cells.map(cell => {
                      return (
                        <td {...cell.getCellProps()}>
                          {cell.render('Cell')}
                        </td>
                      )
                    })}
                  </tr>
                </>
              )}
          )}
        </tbody>
      </table>
    </>
  )
}

const RobotList = ({
  robots,
  onClickRobot,
  onClickEdit,
}) => {
  console.log('render RobotList');
  const columns = React.useMemo(
    () => [
      {
        Header: '로봇 목록',
        columns: [
          {
            Header: '이름',
            accessor: 'name',
          },
          {
            Header: '상태',
            accessor: 'condition',
          },
          {
            Header: 'IP',
            accessor: 'ip',
          },
          {
            Header: '위치',
            accessor:(row) => {
              const { x, y} = row.status.pose;
              return `[${x.toFixed(2)}, ${y.toFixed(2)}]`;
            },
          },
          {
            Header: '수정',
            accessor:(row) => {
              return <Button type="edit" onClick={onClickEdit.bind(this, row.id, row.name)}/>
            },
          },
        ],
      },
    ],
    []
  )
  return (
    <Table 
      columns={columns} 
      data={robots} 
      onClickRobot={onClickRobot} 
    />
  )
  
};

RobotList.defaultProps = {
  robots : [],
  onClickRobot: () => { console.log('onClickRobot is not defined'); },
};



function propsAreEqual(prev, next){
  for(let key in prev){
    if(key === 'robots'){
      const prevR = JSON.stringify(prev[key]);
      const nextR = JSON.stringify(next[key]);
      if(prevR !== nextR) return false;
    } else if(prev[key] !== next[key]){
      console.log(key, prev[key], next[key]);
      return false;
    }

  }
  return true;
}
export default React.memo(RobotList, propsAreEqual);