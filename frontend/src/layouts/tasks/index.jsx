import React from 'react';
import { Routes, Route } from 'react-router-dom';

import TasksView from './TasksView';
import TasksForm from './TasksForm';

const TasksRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<TasksView />} />
            
            <Route path="/new" element={<TasksForm />} />
            
            <Route path="/:id/edit" element={<TasksForm />} />
        </Routes>
    );
};

export default TasksRoutes;