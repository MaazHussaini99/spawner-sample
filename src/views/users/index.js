import React, { useState, useEffect } from 'react';
import { Container, IconButton } from '@mui/material';
import axiosInstance from '../../utils/axiosInstance';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import MUIDataTable from 'mui-datatables';
import { MainCard } from 'ui-component/cards';

const fetchUsers = async () => {
  try {
    const response = await axiosInstance.get('/api/dash/users');
    return response.data.users;
  } catch (error) {
    console.error('Error fetching users:', error);
    return [];
  }
};

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const usersData = await fetchUsers();
      setUsers(usersData);
    };

    loadData();
  }, []);

  const handleEdit = (user) => {
    // Implement edit functionality here
    console.log('Edit user', user);
  };

  const handleDelete = async (empId) => {
    // Implement delete functionality here
    console.log('Delete user with empId', empId);
    try {
      await axiosInstance.delete(`/api/dash/users/${empId}`);
      setUsers(users.filter((user) => user.EmpId !== empId));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const columns = [
    {
      name: 'EmpId',
      label: 'Employee ID',
      options: {
        sort: true
      }
    },
    {
      name: 'FirstName',
      label: 'First Name',
      options: {
        sort: true
      }
    },
    {
      name: 'LastName',
      label: 'Last Name',
      options: {
        sort: true
      }
    },
    {
      name: 'Designation',
      label: 'Designation',
      options: {
        sort: true
      }
    },
    {
      name: 'ResetPasswordRequired',
      label: 'Reset Password Required',
      options: {
        sort: true,
        customBodyRender: (value) => (value ? 'Yes' : 'No')
      }
    },
    {
      name: 'Action',
      label: 'Action',
      options: {
        sort: false,
        customBodyRender: (value, tableMeta) => {
          const user = users[tableMeta.rowIndex];
          return (
            <div>
              <IconButton color="secondary" onClick={() => handleEdit(user)}>
                <EditIcon />
              </IconButton>
              <IconButton color="error" onClick={() => handleDelete(user.EmpId)}>
                <DeleteIcon />
              </IconButton>
            </div>
          );
        }
      }
    }
  ];

  const options = {
    filterType: 'checkbox',
    selectableRows: 'none',
    responsive: 'standard',
    rowsPerPage: 5,
    rowsPerPageOptions: [5, 10, 25],
    pagination: true,
    stickyHeader: true
  };

  return (
    <Container component="main" maxWidth="xll" style={{ position: 'relative', top: '50px' }}>
      <MainCard title="Users" content={true} boxShadow={true}>
        <MUIDataTable title="" data={users} columns={columns} options={options} />
      </MainCard>
    </Container>
  );
};

export default Users;
