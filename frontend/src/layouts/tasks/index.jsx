import { Routes, Route } from 'react-router-dom';
import TasksView from './TasksView';
import TasksForm from './TasksForm';
import { TaskProvider } from '../../context/TaskContext';

const TasksRoutes = () => {
    return (
        <TaskProvider>
            <Routes>
                <Route path="/" element={<TasksView />} />
                <Route path="/new" element={<TasksForm />} />
                <Route path="/:id/edit" element={<TasksForm />} />
            </Routes>
        </TaskProvider>
    );
};

export default TasksRoutes;