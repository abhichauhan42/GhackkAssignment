import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";

const App = () => {
  const [clients, setClients] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch all clients initially
  useEffect(() => {
    axios.get("http://localhost:8080/api/clients")
      .then((response) => {
        setClients(response.data);
      })
      .catch((error) => {
        console.log("Error fetching clients:", error);
      });
  }, []);

  // Handle search input
  const handleSearch = () => {
    if (searchQuery !== "") {
      // Check if the search query is a number (for clientId) or string (for clientName)
      const isClientId = !isNaN(searchQuery);

      if (isClientId) {
        // Search by Client ID
        axios
          .get(`http://localhost:8080/api/clients/${searchQuery}`)
          .then((response) => {
            setClients([response.data]); // Set the client response as an array
          })
          .catch((error) => {
            console.log("Client not found:", error);
            setClients([]); // Clear results if no client is found
          });
      } else {
        // Search by Client Name
        axios
          .get(`http://localhost:8080/api/clients/name/${searchQuery}`)
          .then((response) => {
            // Handle both single and multiple clients responses
            setClients(Array.isArray(response.data) ? response.data : [response.data]);
          })
          .catch((error) => {
            console.log("No clients found with that name:", error);
            setClients([]); // Clear results if no client is found
          });
      }
    } else {
      // If search query is empty, fetch all clients
      axios.get("http://localhost:8080/api/clients")
        .then((response) => {
          setClients(response.data);
        })
        .catch((error) => {
          console.log("Error fetching clients:", error);
        });
    }
  };

  // Delete client function
  const handleDelete = (clientId) => {
    console.log(`Attempting to delete client with clientId: ${clientId}`);
    axios.delete(`http://localhost:8080/api/clients/${clientId}`)
      .then(() => {
        console.log(`Client with clientId ${clientId} deleted successfully`);
        setClients(clients.filter((client) => client.clientId !== clientId));
      })
      .catch((error) => {
        console.error("Error deleting client:", error);
      });
  };
  


  return (
    <div className="container mt-5" style={{ width: "100vw", maxWidth: "100vw", margin: "0 auto" }}>
      <h2 className="text-center card-header bg-primary text-white rounded mb-3 pt-3 pb-3 ">HARDIK TRADERS - CLIENT MANAGEMENT DASHBOARD</h2>

      {/* Search Bar */}
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control "
          placeholder="Search by Client Name or ID..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button className="btn btn-outline-secondary bg-primary text-white rounded" onClick={handleSearch}>
          Search
        </button>
      </div>

      {/* New Job Sheet Button */}
      <div style={{ textAlign: "center", marginTop: "20px", marginBottom: "20px" }}>
        <Link to="/new" className="btn btn-primary">
          New Job Sheet
        </Link>
      </div>

      {/* Clients Table */}
      <table className="table table-bordered">
        <thead className="table-primary">
          <tr>
            <th>#</th>
            <th>Client Id</th>
            <th>Client Name</th>
            <th>Contact Info</th>
            <th>Received Date</th>
            <th>Inventory Received</th>
            <th>Reported Issues</th>
            <th>Client Notes</th>
            <th>Assigned Technician</th>
            <th>Estimated Amount</th>
            <th>Deadline</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {clients.length > 0 ? (
            clients.map((client, index) => (
              <tr key={client.id}>
                <td>{index + 1}</td>
                <td>{client.clientId}</td>
                <td>{client.clientName}</td>
                <td>{client.contactInfo}</td>
                <td>{client.receivedDate}</td>
                <td>{client.inventoryReceived}</td>
                <td>{client.reportedIssues}</td>
                <td>{client.clientNotes}</td>
                <td>{client.assignedTechnician}</td>
                <td>{client.estimatedAmount}</td>
                <td>{client.deadline}</td>
                <td>{client.status}</td>
                <td style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
                  <Link to={`/view/${client.clientId}`} className="btn btn-primary btn-sm">View</Link>
                  <Link to={`/edit/${client.clientId}`} className="btn btn-primary btn-sm">Edit</Link>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(client.clientId)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="13" className="text-center">
                No clients found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <footer class="bg-primary text-center  text-white rounded py-3">
        <p class="mb-0">&copy; 2024 Hardik Traders - All rights reserved</p>
      </footer>
    </div>
  );
};

export default App;
