import * as React from "react";
import { cn } from "../lib/cn";

export interface DataTableColumn<T> {
  key: string;
  header: React.ReactNode;
  accessor?: (row: T) => unknown;
  render?: (row: T, value: unknown, index: number) => React.ReactNode;
  className?: string;
  headerClassName?: string;
  align?: "left" | "center" | "right";
}

export interface DataTableProps<T> extends Omit<
  React.TableHTMLAttributes<HTMLTableElement>,
  "children"
> {
  columns: DataTableColumn<T>[];
  data: T[];
  emptyState?: React.ReactNode;
  rowKey?: (row: T, index: number) => string | number;
  caption?: React.ReactNode;
  renderExpandedRow?: (row: T, index: number) => React.ReactNode;
}

export function DataTable<T>({
  columns,
  data,
  emptyState,
  rowKey,
  className,
  caption,
  renderExpandedRow,
  ...props
}: DataTableProps<T>) {
  const resolveRowKey =
    rowKey ??
    ((row: T, index: number) => {
      if (typeof row === "object" && row !== null && "id" in row) {
        const id = (row as { id?: string | number }).id;
        if (id !== undefined && id !== null) {
          return String(id);
        }
      }
      return String(index);
    });

  const renderCellValue = (value: unknown): React.ReactNode => {
    if (value === null || value === undefined) {
      return "—";
    }

    if (
      typeof value === "string" ||
      typeof value === "number" ||
      typeof value === "boolean"
    ) {
      return value;
    }

    if (typeof value === "bigint") {
      return value.toString();
    }

    if (typeof value === "symbol") {
      return value.toString();
    }

    if (typeof value === "function") {
      return value.name || "Function";
    }

    if (React.isValidElement(value)) {
      return value;
    }

    if (typeof value === "object") {
      return JSON.stringify(value) ?? "[object Object]";
    }

    return "";
  };

  return (
    <div className="cs-table__container">
      <table className={cn("cs-table", className)} {...props}>
        {caption ? (
          <caption className="cs-table__caption">{caption}</caption>
        ) : null}
        <thead>
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                scope="col"
                className={cn(
                  "cs-table__header",
                  column.headerClassName,
                  column.align && `cs-table__header--${column.align}`,
                )}
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td className="cs-table__empty" colSpan={columns.length}>
                {emptyState ?? "No records available."}
              </td>
            </tr>
          ) : (
            data.map((row, index) => {
              const rowId = resolveRowKey(row, index);
              const expandedContent = renderExpandedRow?.(row, index);
              return (
                <React.Fragment key={rowId}>
                  <tr>
                    {columns.map((column) => {
                      const record =
                        typeof row === "object" && row !== null
                          ? (row as Record<string, unknown>)
                          : undefined;
                      const value =
                        typeof column.accessor === "function"
                          ? column.accessor(row)
                          : record && column.key in record
                            ? record[column.key]
                            : undefined;
                      const content: React.ReactNode =
                        typeof column.render === "function"
                          ? column.render(row, value, index)
                          : renderCellValue(value);

                      return (
                        <td
                          key={`${String(rowId)}-${column.key}`}
                          className={cn(
                            "cs-table__cell",
                            column.className,
                            column.align && `cs-table__cell--${column.align}`,
                          )}
                        >
                          {content}
                        </td>
                      );
                    })}
                  </tr>
                  {expandedContent !== null && expandedContent !== undefined ? (
                    <tr>
                      <td className="cs-table__cell" colSpan={columns.length}>
                        {expandedContent}
                      </td>
                    </tr>
                  ) : null}
                </React.Fragment>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}
