/*
 * cloudbeaver - Cloud Database Manager
 * Copyright (C) 2020 DBeaver Corp and others
 *
 * Licensed under the Apache License, Version 2.0.
 * you may not use this file except in compliance with the License.
 */

import { RowSelection } from './TableSelection/RowSelection';

export type AgGridRow = any[];

export type SortMode = 'asc' | 'desc' | null;

export type SortModel = {
  colId: string;
  sort: SortMode;
}[];

export interface IRequestDataOptions {
  sorting?: SortModel;
}

export interface IAgGridModel {
  chunkSize: number;
  enableRangeSelection?: boolean;

  actions: IAgGridActions | null;
  // hooks
  onRequestData(rowOffset: number, count: number, options?: IRequestDataOptions): Promise<IRequestedData>;
  onCellEditingStopped?(rowNumber: number, column: string, value: any): void;
  onSortChanged?(sorting: SortModel): void;
  onEditSave(): void;
  onEditCancel(): void;
}

export interface IAgGridActions {
  changeChunkSize(chunkSize: number): void;
  resetData(columns?: IAgGridCol[], rows?: AgGridRow[]): void;
  updateCellValue(rowNumber: number, column: string, value: any): void;
  updateRowValue(rowNumber: number, value: any[]): void;
  getSelectedRows(): RowSelection[];
}

export interface IAgGridCol {
  icon?: string;
  label?: string;
  name?: string;
  position?: number;
  dataKind?: string;
}

export interface IRequestedData {
  rows: AgGridRow[];
  columns?: IAgGridCol[];
  isFullyLoaded: boolean;
}
