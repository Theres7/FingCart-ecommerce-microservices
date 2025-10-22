import React from 'react';
import DashboardTable from './DashboardTable';

function CategoryTable() {

  const categories = [
    {
      "id": 3,
      "name": "Camera",
      "description": "Highly Quality, popular",
      "createdAt": "2025-08-04T18:29:49.6754",
      "updatedAt": "2025-08-04T18:48:23.207217"
  },
  {
      "id": 4,
      "name": "Earphones",
      "description": "Durable, Better Bass Earphones",
      "createdAt": "2025-08-04T19:02:16.170383",
      "updatedAt": "2025-08-04T19:02:16.17041"
  },
  {
      "id": 5,
      "name": "Jeans",
      "description": "Stretchable, skinny, straight fit and wide leg Jeans",
      "createdAt": "2025-08-04T19:03:17.463577",
      "updatedAt": "2025-08-04T19:03:17.463604"
  },
  {
      "id": 2,
      "name": "Laptops",
      "description": "Highly Efficient",
      "createdAt": "2025-08-04T17:17:04.371084",
      "updatedAt": "2025-08-04T17:17:04.37111"
  },
  {
      "id": 6,
      "name": "Shirts",
      "description": "Formal, casual and party wear shirts",
      "createdAt": "2025-08-04T19:03:44.1415",
      "updatedAt": "2025-08-04T19:03:44.141526"
  }
  ]
  
  const columns = [
    { 
      field: 'id', 
      headerName: 'ID', 
      type: 'number',
      width: 50
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
      field: 'createdAt',
      headerName: 'Created on',
      width: 150
    },
  
    {
      field: 'updatedAt',
      headerName: 'Updated on',
      width: 150
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 180,
    }
  
  ];

  return (
    <>
      <DashboardTable tableData={categories} columns={columns}/>
    </>
  )
}

export default CategoryTable