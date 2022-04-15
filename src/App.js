import './App.css';

import React, { useCallback, useMemo, useRef, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import Navbar from './Components/Navbar';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

function App() {
  let productList = [
    {id: 1, name: 'Vestido 1', price: 100.00, quantity: 5},
    {id: 2, name: 'Vestido 2', price: 150.00, quantity: 3},
    {id: 3, name: 'Vestido 3', price: 200.00, quantity: 1},
    {id: 4, name: 'Remera 1', price: 70.75, quantity: 5},
    {id: 5, name: 'Remera 2', price: 30.15, quantity: 3},
    {id: 6, name: 'Remera 3', price: 150.55, quantity: 15},
    {id: 7, name: 'Remera 4', price: 60.75, quantity: 3},
    {id: 8, name: 'Pantalon 1', price: 50.75, quantity: 5},
    {id: 9, name: 'Pantalon 2', price: 150.20, quantity: 10},
    {id: 10, name: 'Pantalon 3', price: 250.00, quantity: 8},
  ]

  const gridRef = useRef();

  const priceComponent = (cell) => {
    return '$' + cell.value
  }

  const [rowData, setRowData] = useState(productList);

  const defaultColDef = useMemo( () => ({
    flex: 1,
    filterParams: {
      buttons: ['reset']
    },
    cellStyle: {justifyContent: 'center'}
  }), [])

  const [columnDefs, setColumnDefs] = useState([
    {
    checkboxSelection: true,
    maxWidth: 50,
    },
    {
    headerName: "Producto", 
    field: "name", 
    sortable: true,
    cellStyle: {justifyContent: 'center'}
    },
    {
    headerName: "Cantidad", 
    field: "quantity", 
    sortable: true
    },
    {
    headerName: "Precio", 
    field: "price", 
    sortable: true, 
    filter: "agNumberColumnFilter",
    cellRenderer: priceComponent
    },
  ]);  
  
  const cellClickedListener = useCallback(e => {
    console.log('CellClicked', e.data.name)
  })
  
  const deselectAllHandler = useCallback(e => {
    gridRef.current.api.getSelectedNodes()
  })

  const [showNewItemMenu, setShowNewItemMenu] = useState(false)
  const handleshowNewItemMenu = (() => {
    setShowNewItemMenu(!showNewItemMenu)
  })

  return (
    <div className="App">
      <Navbar></Navbar>

      <div id="grid-options">
        <button type="button" id="new-item-btn" onClick={handleshowNewItemMenu}>Agregar Producto</button>
        {/* <button type="button" id="" onClick={deselectAllHandler}>Deselect</button> */}
      </div>
      
      {showNewItemMenu && 
      <div id="add-new-item-menu">
        <input id="new-item-name" type="text" placeholder="Nombre del producto"/>
        <input id="new-item-quantity" type="number" placeholder="Cantidad"/>
        <input id="new-item-price" type="number" placeholder="Precio"/>
        <button id="confirm-new-item-btn" type='button'>Confirmar</button>
        <button id="cancel-new-item-btn" type='button'>Cancelar</button>
      </div>}

      <div className="ag-theme-alpine" style={{height: 500, width: '90%', margin: 'auto', marginTop: 30}}>
           <AgGridReact
              ref={gridRef}
              onCellClicked={cellClickedListener}
              rowData={rowData}
              columnDefs={columnDefs}
              defaultColDef={defaultColDef}
              animateRows={true}
              singleClickEdit
              rowSelection='multiple'
            />
       </div>
    </div>
  );
}

export default App;
