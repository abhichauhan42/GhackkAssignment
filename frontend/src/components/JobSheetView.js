import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { jsPDF } from 'jspdf';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';

const JobSheetView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [clients, setClients] = useState([]);
  const [client, setClient] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [newNote, setNewNote] = useState(''); 
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    axios.get(`http://localhost:8080/api/clients/${id}`)
      .then((response) => {
        setClient(response.data);
        setImageUrl(`http://localhost:8080/api/clients/image/${id}`);
      })
      .catch((error) => {
        console.log("Error fetching client details", error);
      });
  }, [id]);

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.text(`Client ID: ${client.clientId}`, 10, 10);
    doc.text(`Client Name: ${client.clientName}`, 10, 20);
    doc.text(`Contact Info: ${client.contactInfo}`, 10, 30);
    doc.text(`Received Date: ${client.receivedDate}`, 10, 40);
    doc.text(`Inventory Received: ${client.inventoryReceived}`, 10, 50);
    doc.text(`Reported Issues: ${client.reportedIssues}`, 10, 60);
    doc.text(`Client Notes: ${client.clientNotes}`, 10, 70);
    doc.text(`Assigned Technician: ${client.assignedTechnician}`, 10, 80);
    doc.text(`Estimated Amount: ${client.estimatedAmount}`, 10, 90);
    doc.text(`Deadline: ${client.deadline}`, 10, 100);
    doc.text(`Status: ${client.status}`, 10, 110);
    doc.save('jobsheet.pdf');
  };

  const handleBack = () => {
    navigate('/');
  };

  const handleDelete = (clientId) => {
    console.log(`Attempting to delete client with clientId: ${clientId}`);
    axios.delete(`http://localhost:8080/api/clients/${clientId}`)
      .then(() => {
        console.log(`Client with clientId ${clientId} deleted successfully`);
        setClients(clients.filter((client) => client.clientId !== clientId));
        navigate('/');
      })
      .catch((error) => {
        console.error("Error deleting client:", error);
      });
  };

  // Function to handle note update
  const handleSaveNotes = () => {
    if (client && newNote.trim() !== '') {
      // Trim the new note before sending
      const trimmedNote = newNote.trim();
  
      // Send the note as a JSON object
      axios.put(`http://localhost:8080/api/${client.clientId}/notes`, {
        notes: trimmedNote  // Wrapping the trimmed note in a JSON object
      })
      .then(response => {
        setClient(prevClient => ({
          ...prevClient,
          clientNotes: trimmedNote
        }));
        setNewNote('');
        setSuccessMessage('Notes updated successfully!');
        setTimeout(() => setSuccessMessage(''), 3000);
      })
      .catch(error => {
        console.error("Error updating client notes:", error);
      });
    }
  };
  


  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-header text-center bg-primary text-white">
          <h4>VIEW JOB SHEET</h4>
        </div>
        <div className="card-body">
          {client ? (
            <div>
              <table className="table table-bordered">
                <tbody className="table-header">
                  <tr>
                    <th>Client Name:</th>
                    <td>{client.clientName}</td>
                  </tr>
                  <tr>
                    <th>Contact Info:</th>
                    <td>{client.contactInfo}</td>
                  </tr>
                  <tr>
                    <th>Received Date:</th>
                    <td>{client.receivedDate}</td>
                  </tr>
                  <tr>
                    <th>Inventory Received:</th>
                    <td>{client.inventoryReceived}</td>
                  </tr>
                  <tr>
                    <th>Inventory Image/Document/Video:</th>
                    <td><a href={imageUrl} target="_blank" rel="noreferrer">View File</a></td>
                  </tr>
                  <tr>
                    <th>Reported Issues:</th>
                    <td>{client.reportedIssues}</td>
                  </tr>
                  <tr>
                    <th>Client Notes:</th>
                    <td>{client.clientNotes}</td>
                  </tr>
                  <tr>
                    <th>Assigned Technician:</th>
                    <td>{client.assignedTechnician}</td>
                  </tr>
                  <tr>
                    <th>Estimated Amount:</th>
                    <td>{client.estimatedAmount ? client.estimatedAmount : "None"}</td>
                  </tr>
                  <tr>
                    <th>Deadline:</th>
                    <td>{client.deadline}</td>
                  </tr>
                  <tr>
                    <th>Status:</th>
                    <td>{client.status}</td>
                  </tr>
                </tbody>
              </table>

              {/* Add or update note section */}
              <div className="mb-3">
                <label htmlFor="addNote" className="form-label">Add or Update Note:</label>
                <input
                  type="text"
                  className="form-control custom-input"
                  id="addNote"
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                />
              </div>

              <div className="row mb-3">
                <div className="col-12">
                  <button
                    type="button"
                    className="btn btn-primary custom-btn w-100"
                    onClick={handleSaveNotes}
                    disabled={newNote.trim() === ''}  // Disable button when input is empty
                  >
                    Save Notes
                  </button>
                </div>
              </div>

              {/* Show success message */}
              {successMessage && (
                <div className="alert alert-success" role="alert">
                  {successMessage}
                </div>
              )}

              <div className="mb-3" style={{ marginTop: '0.5rem' }}>
                <Link to={`/edit/${client.clientId}`} className="btn btn-sm text-primary">Edit</Link>
                <button
                  className="btn btn-sm text-primary"
                  onClick={() => handleDelete(client.clientId)}
                >
                  Delete
                </button>
              </div>

              <button
                type="button"
                className="btn custom-btn w-100 text-primary"
                onClick={handleBack}
              >
                Back
              </button>

              {/* Save Note and action buttons */}
              <div className="d-flex justify-content-between">
                <button className="btn btn-secondary" onClick={handleDownloadPDF}>Save as PDF</button>

              </div>
            </div>
          ) : (
            <p>Loading client details...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobSheetView;
