import { Routes, Route } from 'react-router-dom';

import UsersTable from './UsersTable';

const UsersManagement = () => {
    return (
        <Routes>
            <Route path="/" element={<UsersTable />} />
        </Routes>
    );
}

export default UsersManagement;
