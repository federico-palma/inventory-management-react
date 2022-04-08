import './App.css';

import React, { useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import Navbar from './Components/Navbar';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

function App() {
  const [rowData] = useState([
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
  ]);

  const [columnDefs] = useState([
    { field: "name", sortable: true },
    { field: "price", sortable: true, filter: true },
    { field: "quantity", sortable: true },
  ]);     

  return (
    <div className="App">
      <Navbar></Navbar>

      <div id="grid-options">
        <button id="add-item">Agregar Producto</button>
      </div>


      <div className="ag-theme-alpine" style={{height: 400, width: 650, margin: 'auto', marginTop: 100}}>
           <AgGridReact
               rowData={rowData}
               columnDefs={columnDefs}>
           </AgGridReact>
       </div>
    </div>
  );
}

export default App;
