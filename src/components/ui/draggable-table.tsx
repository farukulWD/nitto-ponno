"use client";

import React from "react";
import { ReactSortable } from "react-sortablejs";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "./table";

export interface DraggableTableColumn<T> {
  key: keyof T | string;
  header: React.ReactNode;
  render?: (row: T, index: number) => React.ReactNode;
  className?: string;
}

export interface DraggableTableProps<T> {
  columns: DraggableTableColumn<T>[];
  data: T[];
  setData: (data: T[]) => void;
  dragHandle?: boolean;
  rowKey?: (row: T, index: number) => string | number;
  className?: string;
}

export function DraggableTable<T extends { id?: string | number } = any>({
  columns,
  data,
  setData,
  dragHandle = true,
  rowKey,
  className,
}: DraggableTableProps<T>) {
  return (
    <Table className={className}>
      <TableHeader>
        <TableRow>
          {dragHandle && <TableHead style={{ width: 32 }}></TableHead>}
          {columns.map((col) => (
            <TableHead key={col.key as string} className={col.className}>
              {col.header}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <ReactSortable
        tag={TableBody as any}
        list={data}
        setList={setData}
        animation={200}
        handle={dragHandle ? ".drag-handle" : undefined}
      >
        {data.map((row, rowIndex) => (
          <TableRow key={rowKey ? rowKey(row, rowIndex) : row.id ?? rowIndex}>
            {dragHandle && (
              <TableCell className="drag-handle cursor-grab select-none text-gray-400 text-center" style={{ width: 32 }}>
                <svg width="16" height="16" fill="none" viewBox="0 0 16 16"><circle cx="5" cy="4" r="1"/><circle cx="5" cy="8" r="1"/><circle cx="5" cy="12" r="1"/><circle cx="11" cy="4" r="1"/><circle cx="11" cy="8" r="1"/><circle cx="11" cy="12" r="1"/></svg>
              </TableCell>
            )}
            {columns.map((col, colIndex) => (
              <TableCell key={col.key as string} className={col.className}>
                {col.render ? col.render(row, rowIndex) : (row as any)[col.key]}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </ReactSortable>
    </Table>
  );
}

export default DraggableTable; 