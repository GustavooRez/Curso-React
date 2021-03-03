import React, { useMemo, useState, useEffect, useRef } from "react";
import { Rnd } from "react-rnd";
import "./table.css";

import { useTable, usePagination, useSortBy } from "react-table";

import Paginate from "./paginate/paginate";

function Table({ data, col }) {

  const datas = useMemo(() => data, [data]);

  const sortTypes = useMemo(
    () => ({
      alphanumericFalsyLast(rowA, rowB, columnId, desc) {
        if (!rowA.values[columnId] && !rowB.values[columnId]) {
          return 0;
        }

        if (!rowA.values[columnId]) {
          return desc ? -1 : 1;
        }

        if (!rowB.values[columnId]) {
          return desc ? 1 : -1;
        }

        if (columnId === "data") {
          const a = rowA.values[columnId].split("/");
          const b = rowB.values[columnId].split("/");
          return (
            new Date(`${a[1]}/${a[0]}/${a[2]}`) -
            new Date(`${b[1]}/${b[0]}/${b[2]}`)
          );
        }

        return rowA.values[columnId] - rowB.values[columnId];
      },
    }),
    []
  );

  const columns = useMemo(
    () => [
      {
        Header: "Data",
        columns: [
          {
            Header: "",
            accessor: "data",
            sortType: "alphanumericFalsyLast",
          },
        ],
      },
      ...col.map((sensName) => {
        return {
          Header: sensName,
          columns: [
            {
              Header: "dX",
              accessor: `${sensName}dX`,
              sortType: "alphanumericFalsyLast",
            },
            {
              Header: "dY",
              accessor: `${sensName}dY`,
              sortType: "alphanumericFalsyLast",
            },
            {
              Header: "dZ",
              accessor: `${sensName}dZ`,
              sortType: "alphanumericFalsyLast",
            },
          ],
        };
      }),
    ],

    [col]
  ); // Colocando col como parâmetro do useMemo os Headers serão re atribuidos a cada alterção no valor de col

  const {
    nextPage,
    previousPage,
    canPreviousPage,
    canNextPage,
    pageOptions,
    gotoPage,
    setPageSize,
    prepareRow,
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 },
      sortTypes,
    },
    useSortBy,
    usePagination
  );
  const [width, setWidth] = useState(650);
  const [height, setHeight] = useState(560);
  const [x, setX] = useState(10);
  const [y, setY] = useState(40);
  const [buttonState, setButtonState] = useState(false);

  function handleChangeButtonState() {
    setButtonState(!buttonState);
  }

  return buttonState ? null : (
    <div className="tabela_geral">
      <Rnd
        className="rnd"
        size={{ width: width, height: height }}
        position={{ x: x, y: y }}
        bounds="window"
        minWidth={450}
        minHeight={300}
        onDragStop={(e, d) => {
          setX(d.x);
          setY(d.y);
        }}
        onResizeStop={(e, direction, ref, delta, position) => {
          setWidth(ref.offsetWidth);
          setHeight(ref.offsetHeight);
          setX(position.x);
          setY(position.y);
        }}
      >
        <button className="botao_close" onClick={handleChangeButtonState}>
          {" "}
          X{" "}
        </button>

        <>
          <table {...getTableProps()} className="tabela_expanse">
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                    >
                      {column.render("Header")}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {page.map((row) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map((cell) => {
                      return (
                        <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
          <Paginate
            nextPage={nextPage}
            previousPage={previousPage}
            canPreviousPage={canPreviousPage}
            canNextPage={canNextPage}
            pageOptions={pageOptions}
            gotoPage={gotoPage}
            setPageSize={setPageSize}
          />
        </>
      </Rnd>
    </div>
  );
}

export default Table;
