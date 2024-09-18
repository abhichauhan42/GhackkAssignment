import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './JobSheetEdit.css'; // Custom CSS for additional styling

const JobSheetEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [client, setClient] = useState({
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
        file: null
    });

    useEffect(() => {
        axios.get(`/api/clients/${id}`)
            .then(response => {
                setClient(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the client data!', error);
            });
    }, [id]);

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        if (type === 'file') {
            setClient(prevState => ({
                ...prevState,
                file: files[0]
            }));
        } else {
            setClient(prevState => ({
                ...prevState,
                [name]: value
            }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('file', client.file);
        formData.append('clientName', client.clientName);
        formData.append('contactInfo', client.contactInfo);
        formData.append('receivedDate', client.receivedDate);
        formData.append('inventoryReceived', client.inventoryReceived);
        formData.append('reportedIssues', client.reportedIssues);
        formData.append('clientNotes', client.clientNotes);
        formData.append('assignedTechnician', client.assignedTechnician);
        formData.append('estimatedAmount', client.estimatedAmount);
        formData.append('deadline', client.deadline);
        formData.append('status', client.status);

        axios.put(`http://localhost:8080/api/clients/${id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
            .then(response => {
                navigate(`/`);
            })
            .catch(error => {
                console.error('There was an error updating the client data!', error);
            });
    };

    const handleCancel = () => {
        navigate('/');
    };

    return (
        <div className="container mt-5">
            <div className="job-sheet-card card p-4 shadow">
                <h2 className="text-center card-header bg-primary text-white rounded">Edit Job Sheet</h2>
                <form onSubmit={handleSubmit}>

                    <div className="mb-3">
                        <label className="form-label">Client Name</label>
                        <input type="text" className="custom-input form-control" name="clientName" value={client.clientName} onChange={handleChange} required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Contact Info</label>
                        <input type="text" className="custom-input form-control" name="contactInfo" value={client.contactInfo} onChange={handleChange} required />
                    </div>



                    <div className="mb-3">
                        <label className="form-label">Received Date</label>
                        <input type="date" className="custom-input form-control" name="receivedDate" value={client.receivedDate} onChange={handleChange} required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Inventory Received</label>
                        <input type="text" className="custom-input form-control" name="inventoryReceived" value={client.inventoryReceived} onChange={handleChange} />
                    </div>


                    <div className="mb-3">
                        <label className="form-label">Reported Issues</label>
                        <input type="text" className="custom-input form-control" name="reportedIssues" value={client.reportedIssues} onChange={handleChange} />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Client Notes</label>
                        <textarea className="custom-input form-control" name="clientNotes" value={client.clientNotes} onChange={handleChange} />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Assigned Technician</label>
                        <input type="text" className="custom-input form-control" name="assignedTechnician" value={client.assignedTechnician} onChange={handleChange} />
                    </div>


                    <div className="mb-3">
                        <label className="form-label">Estimated Amount</label>
                        <input type="number" className="custom-input form-control" name="estimatedAmount" value={client.estimatedAmount} onChange={handleChange} required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Deadline</label>
                        <input type="date" className="custom-input form-control" name="deadline" value={client.deadline} onChange={handleChange} required />
                    </div>


                    <div className="mb-3">
                        <label className="form-label">Status</label>
                        <select className="custom-input form-control" name="status" value={client.status} onChange={handleChange} required>
                            <option value="">Select Status</option>
                            <option value="Pending">Pending</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Completed">Completed</option>
                        </select>
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Inventory Image/Document/Video</label>
                        <input type="file" className="custom-input form-control" name="file" onChange={handleChange} />
                    </div>

                


                    <div className="row mb-3">
                        <div className="col-12">
                            <button type="submit" className="btn btn-primary custom-btn w-100">Save Changes</button>
                        </div>
                    </div>

                    <button
                        type="button"
                        className="btn custom-btn w-100 text-primary"
                        onClick={handleCancel}
                    >
                        Cancel
                    </button>


                </form>
            </div>
        </div>
    );
};

export default JobSheetEdit;
