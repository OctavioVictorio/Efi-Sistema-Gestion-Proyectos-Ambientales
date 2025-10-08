import { Routes, Route } from 'react-router-dom';
import ResourcesView from './ResourcesView';
import ResourcesForm from './ResourcesForm';
import { ResourceProvider } from '../../context/ResourceContext';

const ResourcesRoutes = () => {
    return (
        <ResourceProvider>
            <Routes>
                <Route index element={<ResourcesView />} />
                <Route path="new" element={<ResourcesForm />} />
                <Route path=":id/edit" element={<ResourcesForm />} />
            </Routes>
        </ResourceProvider>
    );
};

export default ResourcesRoutes;