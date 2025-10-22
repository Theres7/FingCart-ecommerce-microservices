import React from 'react'
import DashboardTable from './DashboardTable';

function ProductTable() {
  const products = [
    {
      "id": 3,
      "name": "Safari Bags",
      "description": "Popular, Best quality",
      "price": 3000.00,
      "quantity": 20,
      "imageUrl": "https://placehold.co/600x400",
      "categoryId": "68ca4d2b17556094354be368",
      "createdAt": "2025-09-17T10:53:31.535446",
      "updatedAt": "2025-09-17T11:25:28.687886"
  },
  
  {
    "id": 4,
    "name": "Dell Bags",
    "description": "Popular, Best quality",
    "price": 3000.6990,
    "quantity": 20,
    "imageUrl": "https://placehold.co/600x400",
    "categoryId": "68ca4d2b17556094354be368",
    "createdAt": "2025-09-17T10:53:31.535446",
    "updatedAt": "2025-09-17T12:25:28.687886"
}
]

const columns = [
  { 
    field: 'id', 
    headerName: 'ID', 
    width: 50, 
    numeric: true 
  },
  {
    field: 'name',
    headerName: 'Name',
    width: 100
  },
  {
    field: 'description',
    headerName: 'Description',
    width: 300
  },
  {
    width: 100,
    headerName: 'Price (\u20B9)',
    field: 'price',
  },
  {
    width: 100,
    headerName: 'Quantity',
    field: 'quantity',
  },
  {
    width: 100,
    headerName: 'Image Url',
    field: 'imageUrl',
  },
  {
    width: 100,
    headerName: 'Category Id',
    field: 'categoryId',
  },
  {
    width: 150,
    headerName: 'Created Date',
    field: 'createdAt',
  },

  {
    width: 150,
    headerName: 'Updated Date',
    field: 'updatedAt',
  },

];

  return (
    <DashboardTable tableData={products} columns={columns}/>
  )
}

export default ProductTable;