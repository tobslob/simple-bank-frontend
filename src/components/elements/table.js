import {
  Fragment,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { classNames } from "app/lib/utils";
import { useTable, usePagination } from "react-table";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/solid";
import { Menu, Transition } from "@headlessui/react";
import { ChartPieIcon } from "@heroicons/react/24/outline";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  Battery50Icon,
} from "@heroicons/react/20/solid";

function ItemMenu({ items = [], obj }) {
  return (
    <Menu as="div" className="relative">
      <Menu.Button
        type="button"
        onClick={(e) => e.stopPropagation()} // necessary to stop event propagation
        className="flex z-5 justify-center h-6 w-6 items-center p-1 rounded-full text-gray-400 hover:text-primary hover:bg-white hover:border-white"
      >
        <EllipsisHorizontalIcon className="w-5 h-5" />
      </Menu.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute z-20 right-1 mt-2 max-w-60 origin-top-right overflow-hidden rounded-sm overflow-auto bg-white text-sm sm:text-xs shadow-lg shadow-gray-300 ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="divide-y divide-gray-100">
            {items.map((item, idx) => {
              return (
                <Menu.Item key={idx}>
                  {({ active }) => {
                    const { label, func } = item;
                    return (
                      <a
                        onClick={(e) => {
                          e.stopPropagation();
                          func && func(obj);
                        }}
                        className={classNames(
                          active ? "bg-primary text-white" : "text-gray-900",
                          "block relative cursor-pointer select-none font-medium py-3 pl-3 pr-10 whitespace-nowrap"
                        )}
                      >
                        {label}
                      </a>
                    );
                  }}
                </Menu.Item>
              );
            })}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}

function DemoEmptyComponent() {
  return (
    <div className="w-full py-12 h-96 bg-white flex flex-col justify-center items-center">
      <div className="m-auto space-y-4">
        <div className="w-16 h-16 inline-flex justify-center items-center rounded bg-gray-100 text-gray-400">
          <ChartPieIcon className="w-8 h-8" />
        </div>
        <div className="space-y-1">
          <p className="text-lg font-bold">No records available</p>
          <p className="text-sm text-gray-400 max-w-sm">
            Use action above to create a record
          </p>
        </div>
      </div>
    </div>
  );
}
function LoadingComponent() {
  return (
    <div className="w-full py-12 h-96 bg-white flex flex-col justify-center items-center">
      <div className="m-auto space-y-4">
        <div className="w-16 h-16 inline-flex justify-center items-center rounded bg-gray-100 text-gray-400">
          <Battery50Icon width={30} />
        </div>
        <div className="space-y-1">
          <p className="text-lg font-bold">Loading.....</p>
          <p className="text-sm text-gray-400 max-w-sm">fetching Data .....</p>
        </div>
      </div>
    </div>
  );
}

export default function Component({
  objects = [],
  columnDefs = [],
  bulkActions = [],
  itemActions = [],
  showHeader = true,
  showCheckbox = true,
  onSelectionChanged,
  onRowClick,
  pageCount: controlledPageCount = 1,
  loading,
  isPaginated = false,
  fetchData,
  EmptyComponent = DemoEmptyComponent,
}) {
  const checkbox = useRef();
  const [checked, setChecked] = useState(false);
  const [indeterminate, setIndeterminate] = useState(false);
  const [selected, setSelected] = useState([]);
  const data = useMemo(() => objects, [objects]);
  const columns = useMemo(() => columnDefs, [columnDefs]);

  const tableInstance = useTable(
    {
      data,
      columns,
      manualPagination: true,
      pageCount: controlledPageCount,
      initialState: { pageIndex: 0, pageSize: 10 },
    },
    usePagination
  );

  useEffect(() => {
    const isIndeterminate =
      selected.length > 0 && selected.length < objects.length;
    setChecked(selected.length === objects.length);
    setIndeterminate(isIndeterminate);
    if (checkbox?.current) checkbox.current.indeterminate = isIndeterminate;
    onSelectionChanged && onSelectionChanged(selected);
  }, [selected]);

  const toggleAll = () => {
    setSelected(checked || indeterminate ? [] : objects);
    setChecked(!checked && !indeterminate);
    setIndeterminate(false);
  };

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    rows,
    prepareRow,
    pageOptions,
    canPreviousPage,
    previousPage,
    canNextPage,
    nextPage,
    state: { pageIndex, pageSize },
  } = tableInstance;
  console.log("others", pageIndex, pageOptions, canPreviousPage, canNextPage);
  const CallApi = useCallback(() => {
    fetchData &&
      fetchData({
        pageIndex: pageIndex + 1,
        pageSize,
      });
  }, [pageIndex, pageSize]);
  useEffect(CallApi, [pageIndex, pageSize]);

  if (loading) return <LoadingComponent />;
  if (objects?.length === 0) return <EmptyComponent />;

  return (
    <div className="w-full  bg-white rounded overflow-x-auto">
      {/* Bulk actions box might be implemented differently */}
      {/*{selected && selected.length > 0 && (*/}
      {/*    <div className="absolute bg-white w-full py-3.5 pl-12 sm:pl-20">*/}
      {/*        <p>Buttons</p>*/}
      {/*    </div>*/}
      {/*)}*/}
      <table
        className="min-w-full divide-y divide-gray-200 border-collapse "
        {...getTableProps()}
      >
        {showHeader && (
          <thead className="bg-gray-100">
            {headerGroups.map((headerGroup) => {
              return (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {showCheckbox && (
                    <th
                      scope="col"
                      className="relative w-12 pr-4 sm:w-16 sm:pr-6"
                    >
                      <input
                        type="checkbox"
                        className="absolute left-2 sm:left-2 lg:left-2 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                        ref={checkbox}
                        checked={checked}
                        onChange={toggleAll}
                      />
                    </th>
                  )}
                  {headerGroup.headers.map((column, idx) => {
                    return (
                      // Apply the header cell props
                      <th
                        key={idx}
                        scope="col"
                        className={classNames(
                          "py-3.5 pr-4 text-left sm:pr-6 font-normal text-xs text-gray-600 border-r border-l border-r-gray-200 border-l-gray-200  px-2",
                          column.headerClassName // adding support for introducing custom classes on each header
                        )}
                        {...column.getHeaderProps()}
                      >
                        {
                          // Render the header
                          column.render("Header")
                        }
                      </th>
                    );
                  })}
                  {itemActions && itemActions.length > 0 && (
                    <td className="w-4 relative overflow-visible pr-2"></td>
                  )}
                </tr>
              );
            })}
          </thead>
        )}
        <tbody
          className="divide-y divide-gray-100 bg-white"
          {...getTableBodyProps()}
        >
          {
            // Loop over the table rows
            page.map((row) => {
              // Prepare the row for display
              prepareRow(row);
              const { original } = row;

              return (
                // Apply the row props
                <tr
                  onClick={(e) => {
                    onRowClick && onRowClick(original);
                    e.stopPropagation();
                  }}
                  className={classNames(
                    selected.includes(original) ? "bg-gray-50" : undefined,
                    onRowClick ? "hover:bg-gray-50 cursor-pointer" : ""
                  )}
                  {...row.getRowProps()}
                >
                  {showCheckbox && (
                    <td className="relative w-12 py-4 pr-4 align-top sm:w-16 sm:pr-6 lg:pr-8 border-r  border-l border-r-gray-200 border-l-gray-200">
                      <input
                        type="checkbox"
                        className="absolute left-2 sm:left-2 top-4 lg:left-2 h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                        value={original}
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                        checked={selected.includes(original)}
                        onChange={(e) => {
                          setSelected(
                            e.target.checked
                              ? [...selected, original]
                              : selected.filter((p) => p !== original)
                          );
                        }}
                      />
                    </td>
                  )}
                  {
                    // Loop over the rows cells
                    row.cells.map((cell, idx) => {
                      // Apply the cell props
                      return (
                        <td
                          key={idx}
                          className={classNames(
                            "whitespace-nowrap py-4 pr-4 sm:pr-6 text-xs align-top border-r text-gray-500  border-l border-r-gray-200 border-l-gray-200 px-2",
                            cell.column.className // adding support for introducing custom classes on each cell
                          )}
                          {...cell.getCellProps()}
                        >
                          {
                            // Render the cell contents
                            cell.render("Cell")
                          }
                        </td>
                      );
                    })
                  }
                  {itemActions && itemActions.length > 0 && (
                    <td className="w-4 overflow-visible pr-2">
                      <ItemMenu items={itemActions} obj={original} />
                    </td>
                  )}
                </tr>
              );
            })
          }
        </tbody>
      </table>
      {Boolean(isPaginated) && (
        <div className="border flex justify-end cursor-pointer px-4 py-2">
          <div className="text-gray-400  text-sm flex justify-between items-center">
            {canPreviousPage && pageIndex > 0 ? (
              <div className="flex mr-2" onClick={() => previousPage()}>
                <ArrowLeftIcon width={15} />
                Back
              </div>
            ) : null}
            <div className="text-gray-400 text-xs">
              Page {pageIndex + 1} of {controlledPageCount}
            </div>{" "}
            {canNextPage ? (
              <div
                className="text-green-600  flex ml-2 text-sm"
                onClick={() => nextPage()}
              >
                Next <ArrowRightIcon width={15} />
              </div>
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
}
