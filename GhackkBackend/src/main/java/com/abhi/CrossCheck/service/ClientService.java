package com.abhi.CrossCheck.service;


import com.abhi.CrossCheck.model.Client;
import com.abhi.CrossCheck.repository.ClientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ClientService {
    @Autowired
    private ClientRepository repo;

    public Client saveJobSheet(Client client) {
        return repo.save(client);
    }


    public List<Client> getAll() {
        return repo.findAll();
    }

    public void delete(Integer id) {
        repo.deleteById(id);
    }

    public Client getByClientName(String clientName) {
        return repo.findByClientName(clientName);
    }

    public Client getByClientId(Integer id) {
        return repo.findById(id).get();
    }

    public Optional<Object> getImageByClientId(Integer id) {
        return repo.findById(id)
                .map(client -> new ByteArrayResource(client.getImage()));
    }

    public Client updateClient(Integer id, Client updatedClient) {
        return repo.findById(id)
                .map(existingClient -> {
                    existingClient.setClientName(updatedClient.getClientName());
                    existingClient.setContactInfo(updatedClient.getContactInfo());
                    existingClient.setReceivedDate(updatedClient.getReceivedDate());
                    existingClient.setInventoryReceived(updatedClient.getInventoryReceived());
                    existingClient.setReportedIssues(updatedClient.getReportedIssues());
                    existingClient.setClientNotes(updatedClient.getClientNotes());
                    existingClient.setAssignedTechnician(updatedClient.getAssignedTechnician());
                    existingClient.setEstimatedAmount(updatedClient.getEstimatedAmount());
                    existingClient.setDeadline(updatedClient.getDeadline());
                    existingClient.setStatus(updatedClient.getStatus());
                    existingClient.setImage(updatedClient.getImage());
                    return repo.save(existingClient);
                })
                .orElseThrow(() -> new RuntimeException("Client not found with id " + id));
    }


    public void updateClientNotes(Integer clientId, String notes) {
        // Fetch client by ID
        Client client = repo.findById(clientId)
                .orElseThrow(() -> new RuntimeException("Client not found with ID: " + clientId));

        // Update client notes
        client.setClientNotes(notes);

        // Save updated client
        repo.save(client);
    }
}
