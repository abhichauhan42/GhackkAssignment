package com.abhi.CrossCheck.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.*;

@Entity
public class Client {

    @Id
    private Integer clientId;
    private String clientName;
    private String contactInfo;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDate receivedDate;

    private String inventoryReceived;
    private String reportedIssues;
    private String clientNotes;
    private String assignedTechnician;
    private Double estimatedAmount;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDate deadline;

    private String status;

    @Lob
    @Column(name = "image", columnDefinition = "LONGBLOB")
    private byte[] image;


    public Integer getClientId() {
        return clientId;
    }

    public void setClientId(Integer clientId) {
        this.clientId = clientId;
    }

    public String getClientName() {
        return clientName;
    }

    public void setClientName(String clientName) {
        this.clientName = clientName;
    }

    public String getContactInfo() {
        return contactInfo;
    }

    public void setContactInfo(String contactInfo) {
        this.contactInfo = contactInfo;
    }



    public String getInventoryReceived() {
        return inventoryReceived;
    }

    public void setInventoryReceived(String inventoryReceived) {
        this.inventoryReceived = inventoryReceived;
    }

    public String getReportedIssues() {
        return reportedIssues;
    }

    public void setReportedIssues(String reportedIssues) {
        this.reportedIssues = reportedIssues;
    }

    public String getClientNotes() {
        return clientNotes;
    }

    public void setClientNotes(String clientNotes) {
        this.clientNotes = clientNotes;
    }

    public String getAssignedTechnician() {
        return assignedTechnician;
    }

    public void setAssignedTechnician(String assignedTechnician) {
        this.assignedTechnician = assignedTechnician;
    }

    public Double getEstimatedAmount() {
        return estimatedAmount;
    }

    public void setEstimatedAmount(Double estimatedAmount) {
        this.estimatedAmount = estimatedAmount;
    }

    public LocalDate getReceivedDate() {
        return receivedDate;
    }

    public void setReceivedDate(LocalDate receivedDate) {
        this.receivedDate = receivedDate;
    }

    public LocalDate getDeadline() {
        return deadline;
    }

    public void setDeadline(LocalDate deadline) {
        this.deadline = deadline;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public byte[] getImage() {
        return image;
    }

    public void setImage(byte[] image) {
        this.image = image;
    }

    @Override
    public String toString() {
        return "Client{" +
                ", clientId='" + clientId + '\'' +
                ", clientName='" + clientName + '\'' +
                ", contactInfo='" + contactInfo + '\'' +
                ", receivedDate=" + receivedDate +
                ", inventoryReceived='" + inventoryReceived + '\'' +
                ", reportedIssues='" + reportedIssues + '\'' +
                ", clientNotes='" + clientNotes + '\'' +
                ", assignedTechnician='" + assignedTechnician + '\'' +
                ", estimatedAmount=" + estimatedAmount +
                ", deadline=" + deadline +
                ", status='" + status + '\'' +
                ", image=" + Arrays.toString(image) +
                '}';
    }

}

