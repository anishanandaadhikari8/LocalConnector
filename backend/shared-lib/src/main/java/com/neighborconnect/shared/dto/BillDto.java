package com.neighborconnect.shared.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class BillDto {
    private UUID id;
    private UUID connectorId;
    private String title;
    private String description;
    private BigDecimal totalAmount;
    private String category; // utilities, groceries, rent, entertainment, etc.
    private LocalDateTime dueDate;
    private String status; // pending, partial, paid, overdue
    private UserDto createdBy;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private Boolean isActive;
    private List<BillSplitDto> splits;
    private BigDecimal amountPaid;
    private BigDecimal amountRemaining;
    
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @JsonInclude(JsonInclude.Include.NON_NULL)
    public static class BillSplitDto {
        private UUID id;
        private UUID userId;
        private UserDto user;
        private BigDecimal amount;
        private String status; // pending, paid
        private LocalDateTime paidAt;
        private String paymentMethod;
    }
}