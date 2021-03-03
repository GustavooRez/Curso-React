import React, { useMemo, useState, useEffect, useRef } from "react";

function Paginate({
  nextPage,
  previousPage,
  canPreviousPage,
  canNextPage,
  pageOptions,
  gotoPage,
  setPageSize,
}) {
  const [pageSize, pageIndex] = useState();
  const [curPage, setCurPage] = useState(1);

  const curPageCount = useRef(1);

  useEffect(() => {
    setCurPage(curPage);
  }, [curPage]);

  useEffect(() => {
    curPageCount.current.value = curPage;
  });

  return (
    <div className="paginate">
      {/* Botão de voltar*/}
      <div>
        <button
          className="button_nextprevius"
          onClick={function () {
            previousPage();
            setCurPage(curPage - 1);
          }}
          disabled={!canPreviousPage}
        >
          Anterior
        </button>{" "}
      </div>

      {/* Páginate do Meio*/}
      <div className="paginate-middle">
        <span>
          Página {/* Botão de mostrar número da página*/}
          <input
            className="input-middle"
            onChange={(e) => {
              const pageNumber = e.target.value
                ? Number(e.target.value) - 1
                : 0;
              gotoPage(pageNumber);
              setCurPage(parseInt(pageNumber, 10) + 1);
            }}
            ref={curPageCount}
          />{" "}
          de {pageOptions.length}
        </span>

        {/* Quantidade de Páginas*/}
        <select
          value={pageSize}
          onChange={(e) => setPageSize(Number(e.target.value))}
        >
          {[5, 10, 15, 20, 25, 30, 35, 40, 45, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              {pageSize} Páginas
            </option>
          ))}
        </select>
      </div>

      {/* Botão de Próximo*/}
      <div>
        <button
          className="button_nextprevius"
          onClick={function () {
            nextPage();
            setCurPage(curPage + 1);
          }}
          disabled={!canNextPage}
        >
          Próxima
        </button>{" "}
      </div>
    </div>
  );
}

export default Paginate;
