package com.abhi.CrossCheck.repository;


import com.abhi.CrossCheck.model.Client;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ClientRepository extends JpaRepository<Client, Integer> {
    Client findByClientName(String clientName);
}
