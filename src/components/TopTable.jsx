import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import {  deleteDoc, collection, onSnapshot, doc } from 'firebase/firestore';
import { db } from '../firebase/firebase';

const TopTable = () => {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const fetchdata = onSnapshot(collection(db, 'topitem'), (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setRows(data);
    });

    return () => {
      fetchdata();
    };
  }, []);

  const handleDelete = async (row) => {
    try {
      const docRef = doc(db, 'topitem', row.id);
      await deleteDoc(docRef);
      console.log('Row deleted successfully:', row);
    } catch (error) {
      console.error('Error deleting row:', error);
    }
  };

  const columns = [
    { field: 'description', headerName: 'Description', width: 200, resizable: true, className: "column" },
    {
      field: 'imagelink',
      headerName: 'Image Url',
      width: 100, // Adjust the width as needed
      resizable: true,
      renderCell: (params) => (
        <img
          src={params.value}
          alt="topimage"
          width={50}
          height={50}
        />
      ),
    },
    {
      field: 'delete',
      headerName: 'Delete',
      width: 100,
      renderCell: (params) => (
        <button className='px-2 py-1 rounded-lg bg-red-600' onClick={() => handleDelete(params.row)}>Delete</button>
      ),
    },
  ];

  return (
    <div >
      <div  >
        <DataGrid
        
          rows={rows}
          columns={columns}
          pageSize={5}
        />
      </div>
    </div>
  );
};

export default TopTable;
