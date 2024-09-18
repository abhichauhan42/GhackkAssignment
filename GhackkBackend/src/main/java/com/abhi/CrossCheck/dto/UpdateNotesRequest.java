package com.abhi.CrossCheck.dto;

public class UpdateNotesRequest {
    private String notes;

    public UpdateNotesRequest() {
    }

    public UpdateNotesRequest(String notes) {
        this.notes = notes;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }
}
