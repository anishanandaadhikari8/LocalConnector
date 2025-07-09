package com.neighborconnect.shared.enums;

public enum ModuleType {
    POSTS("Posts"),
    CHAT("Chat"),
    BILLS("Bill Splitting"),
    EVENTS("Events"),
    MARKETPLACE("Marketplace"),
    SAFETY("Safety Alerts"),
    ROOMMATE("Roommate Tools"),
    DATING("Dating Features"),
    DIRECTORY("Member Directory");
    
    private final String displayName;
    
    ModuleType(String displayName) {
        this.displayName = displayName;
    }
    
    public String getDisplayName() {
        return displayName;
    }
    
    public static ModuleType fromString(String module) {
        for (ModuleType moduleType : ModuleType.values()) {
            if (moduleType.name().equalsIgnoreCase(module) || 
                moduleType.displayName.equalsIgnoreCase(module)) {
                return moduleType;
            }
        }
        throw new IllegalArgumentException("Unknown module type: " + module);
    }
}