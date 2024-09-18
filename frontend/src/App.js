import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import JobSheetList from './components/JobSheetList';
import JobSheetForm from './components/JobSheetForm';
import JobSheetView from './components/JobSheetView';
import JobSheetEdit from './components/JobSheetEdit';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<JobSheetList />} />
        <Route path="/new" element={<JobSheetForm />} />
        <Route path="/view/:id" element={<JobSheetView />} />
        <Route path="/edit/:id" element={<JobSheetEdit />} />
      </Routes>
    </Router>
  );
}

export default App;
