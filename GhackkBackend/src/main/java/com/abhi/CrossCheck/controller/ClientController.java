package com.abhi.CrossCheck.controller;

import com.abhi.CrossCheck.dto.UpdateNotesRequest;
import com.abhi.CrossCheck.model.Client;
import com.abhi.CrossCheck.service.ClientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDate;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@RestController
@RequestMapping("api")
@CrossOrigin(origins = "http://localhost:3000")
public class ClientController {

    @Autowired
    private ClientService service;

    @GetMapping("/clients")
    public List<Client> getAllClients() {
        return service.getAll();
    }

    @GetMapping("/clients/{id}")
    public ResponseEntity<Client> getClientById(@PathVariable Integer id) {
        Client client = service.getByClientId(id);
        if (client != null) {
            return ResponseEntity.ok(client);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @GetMapping("/clients/name/{name}")
    public ResponseEntity<Client> getClientByName(@PathVariable String name) {
        Client client = service.getByClientName(name);
        if (client != null) {
            return ResponseEntity.ok(client);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @DeleteMapping("/clients/{id}")
    public ResponseEntity<Void> deleteClient(@PathVariable Integer id) {
        try {
            service.delete(id); // Call service to delete the client
            return ResponseEntity.noContent().build(); // Return 204 No Content on success
        } catch (NoSuchElementException e) {
            return ResponseEntity.notFound().build(); // Return 404 Not Found if client doesn't exist
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build(); // Return 500 Internal Server Error for other exceptions
        }
    }

    @PostMapping("/create")
    public ResponseEntity<Client> createClient(
            @RequestParam("file") MultipartFile file,
            @RequestParam("clientId") Integer clientId,
            @RequestParam("clientName") String clientName,
            @RequestParam("contactInfo") String contactInfo,
            @RequestParam("receivedDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate receivedDate,
            @RequestParam("inventoryReceived") String inventoryReceived,
            @RequestParam("reportedIssues") String reportedIssues,
            @RequestParam("clientNotes") String clientNotes,
            @RequestParam("assignedTechnician") String assignedTechnician,
            @RequestParam("estimatedAmount") Double estimatedAmount,
            @RequestParam("deadline") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate deadline,
            @RequestParam("status") String status) throws IOException {

        try {
            // Create and set Client object
            Client client = new Client();
            client.setClientId(clientId);
            client.setClientName(clientName);
            client.setContactInfo(contactInfo);
            client.setReceivedDate(receivedDate);
            client.setInventoryReceived(inventoryReceived);
            client.setReportedIssues(reportedIssues);
            client.setClientNotes(clientNotes);
            client.setAssignedTechnician(assignedTechnician);
            client.setEstimatedAmount(estimatedAmount);
            client.setDeadline(deadline);
            client.setStatus(status);
            client.setImage(file.getBytes());

            // Save client and return response
            Client savedClient = service.saveJobSheet(client);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedClient);
        } catch (IOException e) {
            e.printStackTrace(); // For debugging
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @GetMapping("/clients/image/{id}")
    public ResponseEntity<ByteArrayResource> getImage(@PathVariable("id") Integer id) {
        Optional<Object> imageResource = service.getImageByClientId(id);

        if (imageResource.isPresent()) {
            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_TYPE, "image/jpeg") // Adjust the content type if needed
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=image.jpg")
                    .body((ByteArrayResource) imageResource.get());
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @PutMapping("/clients/{id}")
    public ResponseEntity<Client> updateClient(
            @PathVariable("id") Integer id,
            @RequestParam(value = "file", required = false) MultipartFile file,
            @RequestParam("clientName") String clientName,
            @RequestParam("contactInfo") String contactInfo,
            @RequestParam("receivedDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate receivedDate,
            @RequestParam("inventoryReceived") String inventoryReceived,
            @RequestParam("reportedIssues") String reportedIssues,
            @RequestParam("clientNotes") String clientNotes,
            @RequestParam("assignedTechnician") String assignedTechnician,
            @RequestParam("estimatedAmount") Double estimatedAmount,
            @RequestParam("deadline") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate deadline,
            @RequestParam("status") String status) throws IOException {

        try {
            // Create and set Client object
            Client client = new Client();
            client.setClientName(clientName);
            client.setContactInfo(contactInfo);
            client.setReceivedDate(receivedDate);
            client.setInventoryReceived(inventoryReceived);
            client.setReportedIssues(reportedIssues);
            client.setClientNotes(clientNotes);
            client.setAssignedTechnician(assignedTechnician);
            client.setEstimatedAmount(estimatedAmount);
            client.setDeadline(deadline);
            client.setStatus(status);

            if (file != null) {
                client.setImage(file.getBytes());
            }

            // Update client and return response
            Client updatedClient = service.updateClient(id, client);
            return ResponseEntity.ok(updatedClient);
        } catch (IOException e) {
            e.printStackTrace(); // For debugging
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @PutMapping("/{clientId}/notes")
    public ResponseEntity<String> updateClientNotes(@PathVariable Integer clientId,
                                                    @RequestBody UpdateNotesRequest request) {
        service.updateClientNotes(clientId, request.getNotes());
        return ResponseEntity.ok("Client notes updated successfully.");
    }


}
