package com.neighborconnect.shared.enums;

public enum ConnectorType {
    APARTMENT("Apartment"),
    MARKETPLACE("Marketplace"), 
    SAFETY("Safety"),
    EVENT("Event"),
    ROOMMATE("Roommate"),
    DATING("Dating");
    
    private final String displayName;
    
    ConnectorType(String displayName) {
        this.displayName = displayName;
    }
    
    public String getDisplayName() {
        return displayName;
    }
    
    public static ConnectorType fromString(String type) {
        for (ConnectorType connectorType : ConnectorType.values()) {
            if (connectorType.name().equalsIgnoreCase(type) || 
                connectorType.displayName.equalsIgnoreCase(type)) {
                return connectorType;
            }
        }
        throw new IllegalArgumentException("Unknown connector type: " + type);
    }
}