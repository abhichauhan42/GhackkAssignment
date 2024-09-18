import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const JobSheetForm = () => {
  const [formData, setFormData] = useState({
    clientId: '',
    clientName: '',
    contactInfo: '',
    receivedDate: '',
    inventoryReceived: '',
    reportedIssues: '',
    clientNotes: '',
    assignedTechnician: '',
    estimatedAmount: '',
    deadline: '',
    status: '',
    file: null,
  });

  const navigate = useNavigate();

  // Handle form data change
  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'file' ? files[0] : value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    for (const key in formData) {
      formDataToSend.append(key, formData[key]);
    }

    try {
      await axios.post('http://localhost:8080/api/create', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      navigate('/');
    } catch (error) {
      console.error('Error creating job sheet:', error);
    }
  };

  return (
    <div className="container mt-5 d-flex justify-content-center">
      <div className="card shadow-lg" style={{ width: '70%', borderRadius: '15px', padding: '20px' }}>
        <h2 className="text-center card-header bg-primary text-white rounded" style={{ borderRadius: '15px' }}>CREATE NEW JOB SHEET</h2>
        <form onSubmit={handleSubmit} className="p-4">
          <div className="mb-3">
            <label className="form-label">Client ID</label>
            <input
              type="text"
              className="form-control"
              name="clientId"
              value={formData.clientId}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Client Name</label>
            <input
              type="text"
              className="form-control"
              name="clientName"
              value={formData.clientName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Contact Info</label>
            <input
              type="text"
              className="form-control"
              name="contactInfo"
              value={formData.contactInfo}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Received Date</label>
            <input
              type="date"
              className="form-control"
              name="receivedDate"
              value={formData.receivedDate}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Inventory Received</label>
            <input
              type="text"
              className="form-control"
              name="inventoryReceived"
              value={formData.inventoryReceived}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Reported Issues</label>
            <input
              type="text"
              className="form-control"
              name="reportedIssues"
              value={formData.reportedIssues}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Client Notes</label>
            <input
              type="text"
              className="form-control"
              name="clientNotes"
              value={formData.clientNotes}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Assigned Technician</label>
            <input
              type="text"
              className="form-control"
              name="assignedTechnician"
              value={formData.assignedTechnician}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Estimated Amount</label>
            <input
              type="number"
              step="0.01"
              className="form-control"
              name="estimatedAmount"
              value={formData.estimatedAmount}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Deadline</label>
            <input
              type="date"
              className="form-control"
              name="deadline"
              value={formData.deadline}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Status</label>
            <select className="custom-input form-control" name="status" value={formData.status} onChange={handleChange} required>
              <option value="">Select Status</option>
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
          <div className="mb-3">
            <label className="form-label">Upload File</label>
            <input
              type="file"
              className="form-control"
              name="file"
              onChange={handleChange}
            />
          </div>
          <div className="text-center">
            <button type="submit" className="btn btn-primary btn-lg w-100">Save Job Sheet</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default JobSheetForm;
