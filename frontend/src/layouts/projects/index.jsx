// layouts/projects/index.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import ProjectsView from "./ProjectsView";
import ProjectsForm from "./ProjectsForm";
import { ProjectProvider } from "../../context/ProjectContext";

const ProjectsRoutes = () => {
  return (
    <ProjectProvider>
      <Routes>
        <Route path="/" element={<ProjectsView />} />
        <Route path="/new" element={<ProjectsForm />} />
        <Route path="/:id/edit" element={<ProjectsForm />} />
      </Routes>
    </ProjectProvider>
  );
};

export default ProjectsRoutes;
