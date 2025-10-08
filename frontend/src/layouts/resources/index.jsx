import { Routes, Route } from 'react-router-dom';
import ResourcesView from './ResourcesView';
import ResourcesForm from './ResourcesForm';

const ResourcesRoutes = () => {
    return (
        <Routes>
            <Route index element={<ResourcesView />} />
            <Route path="new" element={<ResourcesForm />} />
            <Route path=":id/edit" element={<ResourcesForm />} />
        </Routes>
    );
};

export default ResourcesRoutes;