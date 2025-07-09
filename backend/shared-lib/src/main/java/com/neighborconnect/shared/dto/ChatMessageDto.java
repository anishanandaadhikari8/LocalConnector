package com.neighborconnect.shared.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ChatMessageDto {
    private UUID id;
    private UUID connectorId;
    private UUID conversationId;
    private String content;
    private String messageType; // text, image, file, system
    private UserDto author;
    private LocalDateTime createdAt;
    private Boolean isRead;
    private Boolean isEdited;
    private LocalDateTime editedAt;
    private String attachmentUrl;
    private String attachmentType;
    private UUID replyToId;
    private ChatMessageDto replyTo;
}