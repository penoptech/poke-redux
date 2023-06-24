import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { createRoot } from 'react-dom/client';
import { AgGridReact } from 'ag-grid-react'; // the AG Grid React Component
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { selectSearchedPokemon } from '../search/searchSlice';

import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-alpine.css'; // Optional theme CSS
import { ColDef, GridOptions, ICellRendererParams } from 'ag-grid-community';
import { fetchPokemonDetailsAsync, selectLoadingStatus, selectSelectedPokemon } from '../detail/detailSlice';
import Detail from '../detail/Detail';

const Table = () => {
    const dispatch = useAppDispatch();
    const searchedPokemon = useAppSelector(selectSearchedPokemon);
    const gridRef = useRef<any>(); // Optional - for accessing Grid's API

    interface ActionButtonRendererProps extends ICellRendererParams {
        handleButtonClick: (value: any) => void;
    }

    const ActionButtonRenderer: React.FC<ActionButtonRendererProps> = ({
        value,
        handleButtonClick
    }) => {
        return (
            <button type="button" className="btn btn-info text-white" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample" onClick={() => handleButtonClick(value)}>View Details</button>
        );
    };

    const titleCaseRenderer: React.FC<ICellRendererParams> = (params) => {
        const value = params.value as string; // Assuming the data is of string type
        const titleCaseValue = value.toLowerCase().replace(/(?:^|\s)\w/g, (match) => match.toUpperCase());
        return <span>{titleCaseValue}</span>;
    };

    const gridOptions: GridOptions = {
        // Other grid options...
        getRowHeight: () => 45, // Set the desired row height (in pixels)
    };

    const getRowStyle = () => {
        return 'full-width-row';
    };

    // Each Column Definition results in one Column.
    const [columnDefs, setColumnDefs] = useState<ColDef[]>([
        { field: 'id', filter: true, resizable: true, flex: 1 },
        { field: 'name', filter: true, resizable: true, cellRenderer: titleCaseRenderer, flex: 1 },
        {
            field: 'id', headerName: 'Details', filter: true, cellRenderer: ActionButtonRenderer,
            cellRendererParams: {
                handleButtonClick: (value: any) => {
                    dispatch(fetchPokemonDetailsAsync(value));
                }
            },
            flex: 1
        }
    ]);

    // DefaultColDef sets props common to all Columns
    const defaultColDef = useMemo(() => ({
        sortable: true
    }), []);

    return (
        <div>
            {/* On div wrapping Grid a) specify theme CSS Class Class and b) sets Grid size */}
            <div className="ag-theme-alpine" style={{ width: '100%', height: 500 }}>
                <AgGridReact
                    ref={gridRef} // Ref for accessing Grid's API
                    rowData={searchedPokemon} // Row Data for Rows
                    getRowClass={getRowStyle}
                    columnDefs={columnDefs} // Column Defs for Columns
                    defaultColDef={defaultColDef} // Default Column Properties
                    gridOptions={gridOptions} // Grid Options
                    animateRows={true} // Optional - set to 'true' to have rows animate when sorted
                    rowSelection='multiple' // Options - allows click selection of rows
                />
            </div>
            <div className="offcanvas offcanvas-end" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
                <div className="offcanvas-header">
                    <h5 className="offcanvas-title" id="offcanvasExampleLabel">Pokemon Detail</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body">
                    <Detail />
                </div>
            </div>
        </div>
    );
};

export default Table;