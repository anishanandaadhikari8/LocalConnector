import React, { useState } from 'react';
import { View, FlatList, StyleSheet, TouchableOpacity, Image, ScrollView, Dimensions } from 'react-native';
import { 
  Text, 
  Card, 
  Avatar, 
  Chip, 
  Button, 
  Searchbar, 
  useTheme,
  FAB,
  SegmentedButtons,
  Surface,
  Badge
} from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { format } from 'date-fns';

import { 
  connectors, 
  currentUser, 
  connectorTypes 
} from '../data/mockData';
import { getConnectorColor, getElevationStyle } from '../theme/theme';

const { width } = Dimensions.get('window');

const ConnectorsScreen = ({ navigation }) => {
  const theme = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [filteredConnectors, setFilteredConnectors] = useState(connectors);
  const [viewMode, setViewMode] = useState('grid'); // grid or list
  // 1. Add loading skeleton state
  const [loading, setLoading] = useState(false);

  const handleSearch = (query) => {
    setSearchQuery(query);
    filterConnectors(selectedType, query);
  };

  const handleTypeFilter = (type) => {
    setSelectedType(type);
    filterConnectors(type, searchQuery);
  };

  const filterConnectors = (type, search) => {
    let filtered = connectors;

    // Filter by type
    if (type !== 'all') {
      filtered = filtered.filter(connector => 
        connector.type.toLowerCase() === type.toLowerCase()
      );
    }

    // Filter by search query
    if (search.trim()) {
      const searchLower = search.toLowerCase();
      filtered = filtered.filter(connector =>
        connector.name.toLowerCase().includes(searchLower) ||
        connector.description.toLowerCase().includes(searchLower) ||
        connector.tags.some(tag => tag.toLowerCase().includes(searchLower))
      );
    }

    setFilteredConnectors(filtered);
  };

  const isUserMember = (connectorId) => {
    return currentUser.joinedConnectors.includes(connectorId);
  };

  const handleJoinLeave = (connectorId) => {
    // Mock join/leave functionality
    console.log(isUserMember(connectorId) ? 'Leave' : 'Join', connectorId);
  };

  const handleConnectorPress = (connector) => {
    navigation.navigate('CommunityDetails', { community: connector });
  };

  const handleCreateConnector = () => {
    navigation.navigate('CreateCommunity');
  };

  const getFeaturedConnectors = () => {
    return connectors
      .filter(c => c.membersCount > 50 || c.verifiedRequired)
      .slice(0, 5);
  };

  const renderFeaturedCard = ({ item: connector }) => {
    const isMember = isUserMember(connector.connectorId);
    
    return (
      <TouchableOpacity 
        onPress={() => handleConnectorPress(connector)}
        activeOpacity={0.9}
      >
        <Card style={[styles.featuredCard, getElevationStyle('md', theme)]}>
          <View style={styles.featuredImageContainer}>
            <Image 
              source={{ uri: connector.image }} 
              style={styles.featuredImage}
              resizeMode="cover"
            />
            <View style={styles.featuredOverlay}>
              <View style={styles.featuredBadges}>
                <Chip
                  icon={() => (
                    <MaterialCommunityIcons 
                      name={connectorTypes.find(ct => ct.id.toLowerCase() === connector.type.toLowerCase())?.icon || 'account-group'} 
                      size={12} 
                      color="white" 
                    />
                  )}
                  style={[styles.featuredTypeChip, { backgroundColor: getConnectorColor(connector.type, theme) }]}
                  textStyle={[styles.featuredTypeText, theme.typography.labelSmall]}
                  compact
                >
                  {connector.type}
                </Chip>
                {connector.verifiedRequired && (
                  <Chip
                    icon={() => (
                      <MaterialCommunityIcons 
                        name="shield-check" 
                        size={12} 
                        color="white" 
                      />
                    )}
                    style={[styles.verifiedChip, { backgroundColor: theme.colors.primary }]}
                    textStyle={[styles.verifiedText, theme.typography.labelSmall]}
                    compact
                  >
                    Verified
                  </Chip>
                )}
              </View>
            </View>
          </View>
          
          <View style={styles.featuredContent}>
            <Text style={[styles.featuredName, theme.typography.titleMedium, { color: theme.colors.onSurface }]} numberOfLines={1}>
              {connector.name}
            </Text>
            <Text style={[styles.featuredDescription, theme.typography.bodySmall, { color: theme.colors.onSurfaceVariant }]} numberOfLines={2}>
              {connector.description}
            </Text>
            
            <View style={styles.featuredStats}>
              <View style={styles.featuredStat}>
                <MaterialCommunityIcons 
                  name="account-group" 
                  size={14} 
                  color={theme.colors.onSurfaceVariant} 
                />
                <Text style={[styles.featuredStatText, theme.typography.bodySmall, { color: theme.colors.onSurfaceVariant }]}>
                  {connector.membersCount}
                </Text>
              </View>
              <View style={styles.featuredStat}>
                <MaterialCommunityIcons 
                  name="map-marker" 
                  size={14} 
                  color={theme.colors.onSurfaceVariant} 
                />
                <Text style={[styles.featuredStatText, theme.typography.bodySmall, { color: theme.colors.onSurfaceVariant }]}>
                  {connector.locationRadius}
                </Text>
              </View>
            </View>
            
            <Button
              mode={isMember ? "contained" : "outlined"}
              onPress={() => handleJoinLeave(connector.connectorId)}
              style={styles.featuredButton}
              contentStyle={styles.featuredButtonContent}
              labelStyle={[theme.typography.labelMedium, { fontWeight: '600' }]}
              compact
            >
              {isMember ? '✓ Joined' : 'Join'}
            </Button>
          </View>
        </Card>
      </TouchableOpacity>
    );
  };

  // 2. Add empty state illustration (simple SVG or emoji for now)
  const renderEmptyState = () => (
    <View style={{ alignItems: 'center', marginTop: 48 }}>
      <Text style={{ fontSize: 48, marginBottom: 8 }}>🔍</Text>
      <Text style={[theme.typography.titleMedium, { color: theme.colors.onSurfaceVariant, marginBottom: 4 }]}>No connectors found</Text>
      <Text style={[theme.typography.bodySmall, { color: theme.colors.onSurfaceVariant }]}>Try adjusting your search or filters.</Text>
    </View>
  );

  // 3. Add loading skeleton (simple placeholder for now)
  const renderLoadingSkeleton = () => (
    <View style={{ padding: 24 }}>
      {[...Array(4)].map((_, i) => (
        <Surface key={i} style={{ height: 120, borderRadius: 16, marginBottom: 16, backgroundColor: theme.colors.surfaceVariant, opacity: 0.5 }} />
      ))}
    </View>
  );

  // 4. Enhance renderConnectorCard with badges, tags, microinteractions, accessibility
  const renderConnectorCard = ({ item: connector }) => {
    const isMember = isUserMember(connector.connectorId);
    const isPopular = connector.membersCount > 30;
    const isNew = new Date(connector.createdAt) > new Date(Date.now() - 1000 * 60 * 60 * 24 * 14); // last 14 days

    return (
      <TouchableOpacity
        onPress={() => handleConnectorPress(connector)}
        activeOpacity={0.92}
        accessibilityLabel={`View details for ${connector.name}`}
        accessibilityRole="button"
        style={{
          transform: [{ scale: 1 }],
          transition: 'transform 0.1s',
        }}
      >
        <Card style={[
          styles.connectorCard,
          getElevationStyle('sm', theme),
          { borderRadius: 16, overflow: 'hidden', marginBottom: 16 },
        ]}>
          <View style={styles.connectorImageContainer}>
            <Image
              source={{ uri: connector.image }}
              style={styles.connectorImage}
              resizeMode="cover"
              accessibilityLabel={`${connector.name} banner`}
            />
            <View style={styles.connectorBadgesRow}>
              <Chip
                icon={() => (
                  <MaterialCommunityIcons
                    name={connectorTypes.find(ct => ct.id.toLowerCase() === connector.type.toLowerCase())?.icon || 'account-group'}
                    size={12}
                    color="white"
                  />
                )}
                style={[styles.typeChip, { backgroundColor: getConnectorColor(connector.type, theme) }]}
                textStyle={[styles.typeText, theme.typography.labelSmall]}
                compact
                accessibilityLabel={`Type: ${connector.type}`}
              >
                {connector.type}
              </Chip>
              {connector.verifiedRequired && (
                <Badge style={{ backgroundColor: theme.colors.primary, marginLeft: 6 }} accessibilityLabel="Verified connector">✔</Badge>
              )}
              {isPopular && (
                <Badge style={{ backgroundColor: theme.colors.secondary, marginLeft: 6 }} accessibilityLabel="Popular connector">🔥</Badge>
              )}
              {isNew && (
                <Badge style={{ backgroundColor: theme.colors.tertiary, marginLeft: 6 }} accessibilityLabel="New connector">🆕</Badge>
              )}
            </View>
          </View>
          <View style={{ padding: 16 }}>
            <Text style={[theme.typography.titleMedium, { color: theme.colors.onSurface }]} numberOfLines={1}>
              {connector.name}
            </Text>
            <Text style={[theme.typography.bodySmall, { color: theme.colors.onSurfaceVariant, marginBottom: 4 }]} numberOfLines={2}>
              {connector.description}
            </Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginBottom: 6 }}>
              {connector.tags.map(tag => (
                <Chip
                  key={tag}
                  style={{ marginRight: 4, marginBottom: 2, backgroundColor: theme.colors.surfaceVariant }}
                  textStyle={{ color: theme.colors.primary }}
                  compact
                  accessibilityLabel={`Tag: ${tag}`}
                >
                  #{tag}
                </Chip>
              ))}
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
              <MaterialCommunityIcons name="account-group" size={14} color={theme.colors.onSurfaceVariant} />
              <Text style={[theme.typography.bodySmall, { color: theme.colors.onSurfaceVariant, marginLeft: 2, marginRight: 8 }]}>{connector.membersCount}</Text>
              <MaterialCommunityIcons name="map-marker" size={14} color={theme.colors.onSurfaceVariant} />
              <Text style={[theme.typography.bodySmall, { color: theme.colors.onSurfaceVariant, marginLeft: 2 }]}>{connector.locationRadius}</Text>
            </View>
            <Button
              mode={isMember ? 'contained' : 'outlined'}
              onPress={() => handleJoinLeave(connector.connectorId)}
              style={{ borderRadius: 8, marginTop: 2 }}
              contentStyle={{ height: 32 }}
              labelStyle={[theme.typography.labelMedium, { fontWeight: '600' }]}
              compact
              accessibilityLabel={isMember ? 'Joined' : 'Join'}
            >
              {isMember ? '✓ Joined' : 'Join'}
            </Button>
          </View>
        </Card>
      </TouchableOpacity>
    );
  };

  const renderTypeFilter = () => (
    <View style={styles.filterContainer}>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filterScrollContent}
      >
        <TouchableOpacity
          onPress={() => handleTypeFilter('all')}
          style={styles.filterButton}
          activeOpacity={0.8}
        >
          <Chip
            style={[
              styles.filterChip,
              getElevationStyle('sm', theme),
              selectedType === 'all' 
                ? { backgroundColor: theme.colors.primary }
                : { backgroundColor: theme.colors.surface }
            ]}
            textStyle={[
              theme.typography.labelMedium,
              { 
                color: selectedType === 'all' 
                  ? theme.colors.onPrimary 
                  : theme.colors.onSurfaceVariant,
                fontWeight: '600'
              }
            ]}
            compact={false}
          >
            All Types
          </Chip>
        </TouchableOpacity>
        
        {connectorTypes.map((type) => (
          <TouchableOpacity
            key={type.id}
            onPress={() => handleTypeFilter(type.id)}
            style={styles.filterButton}
            activeOpacity={0.8}
          >
            <Chip
              icon={() => (
                <MaterialCommunityIcons 
                  name={type.icon} 
                  size={16} 
                  color={selectedType === type.id ? 'white' : theme.colors.onSurfaceVariant} 
                />
              )}
              style={[
                styles.filterChip,
                getElevationStyle('sm', theme),
                selectedType === type.id 
                  ? { backgroundColor: getConnectorColor(type.id, theme) }
                  : { backgroundColor: theme.colors.surface }
              ]}
              textStyle={[
                theme.typography.labelMedium,
                { 
                  color: selectedType === type.id 
                    ? 'white'
                    : theme.colors.onSurfaceVariant,
                  fontWeight: '600'
                }
              ]}
              compact={false}
            >
              {type.name}
            </Chip>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );

  const renderHeader = () => (
    <View style={[styles.header, { backgroundColor: theme.colors.surface }]}>
      <View style={styles.headerTop}>
        <View style={styles.headerTitleSection}>
          <Text style={[styles.headerTitle, theme.typography.headlineMedium, { color: theme.colors.onSurface }]}>
            Connectors
          </Text>
          <Text style={[styles.headerSubtitle, theme.typography.bodyMedium, { color: theme.colors.onSurfaceVariant }]}>
            Connect with your community
          </Text>
        </View>
        <TouchableOpacity 
          onPress={() => navigation.navigate('Search')}
          style={[styles.searchButton, getElevationStyle('sm', theme), { backgroundColor: theme.colors.surfaceVariant }]}
          activeOpacity={0.8}
        >
          <MaterialCommunityIcons 
            name="magnify" 
            size={24} 
            color={theme.colors.onSurfaceVariant} 
          />
        </TouchableOpacity>
      </View>

      <Searchbar
        placeholder="Search connectors by name, type, or tags..."
        onChangeText={handleSearch}
        value={searchQuery}
        style={[styles.searchBar, getElevationStyle('sm', theme), { backgroundColor: theme.colors.surfaceVariant }]}
        iconColor={theme.colors.onSurfaceVariant}
        inputStyle={[theme.typography.bodyMedium, { color: theme.colors.onSurface }]}
        placeholderTextColor={theme.colors.onSurfaceVariant}
      />
    </View>
  );

  // 6. In the main render, show loading skeleton, empty state, or FlatList as appropriate
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {renderHeader()}
      
      {/* Featured Connectors */}
      <View style={styles.featuredSection}>
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, theme.typography.titleLarge, { color: theme.colors.onSurface }]}>
            ⭐ Featured Connectors
          </Text>
        </View>
        <FlatList
          data={getFeaturedConnectors()}
          renderItem={renderFeaturedCard}
          keyExtractor={(item) => `featured-${item.connectorId}`}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.featuredList}
          snapToInterval={240}
          decelerationRate="fast"
        />
      </View>

      {/* Type Filters */}
      {renderTypeFilter()}

      {/* Connectors Grid */}
      <View style={styles.connectorsSection}>
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, theme.typography.titleLarge, { color: theme.colors.onSurface }]}>
            {selectedType === 'all' ? '🌟 All Connectors' : `${connectorTypes.find(t => t.id === selectedType)?.name || selectedType} Connectors`}
          </Text>
          <Text style={[styles.resultCount, theme.typography.bodySmall, { color: theme.colors.onSurfaceVariant }]}>
            {filteredConnectors.length} found
          </Text>
        </View>
        
        {loading ? renderLoadingSkeleton() :
          filteredConnectors.length === 0 ? renderEmptyState() : (
            <FlatList
              data={filteredConnectors}
              renderItem={renderConnectorCard}
              keyExtractor={item => item.connectorId}
              numColumns={viewMode === 'grid' ? 2 : 1}
              contentContainerStyle={{ padding: 16, paddingBottom: 120 }}
              showsVerticalScrollIndicator={false}
              accessibilityLabel="Connectors list"
            />
          )
        }
      </View>

      {/* Enhanced Floating Action Button */}
      <FAB
        icon="plus"
        label="Create Connector"
        style={{
          position: 'absolute',
          right: 24,
          bottom: 32,
          backgroundColor: theme.colors.primary,
          zIndex: 10,
        }}
        onPress={handleCreateConnector}
        accessibilityLabel="Create a new connector"
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 20,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  headerTitleSection: {
    flex: 1,
    marginRight: 16,
  },
  headerTitle: {
    fontWeight: '700',
    marginBottom: 4,
  },
  headerSubtitle: {
    lineHeight: 22,
  },
  searchButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchBar: {
    borderRadius: 16,
    elevation: 0,
  },
  featuredSection: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  sectionTitle: {
    fontWeight: '700',
  },
  resultCount: {
    fontWeight: '500',
  },
  featuredList: {
    paddingHorizontal: 20,
  },
  featuredCard: {
    width: 240,
    marginRight: 16,
    borderRadius: 20,
    overflow: 'hidden',
  },
  featuredImageContainer: {
    position: 'relative',
    height: 120,
  },
  featuredImage: {
    width: '100%',
    height: '100%',
  },
  featuredOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    padding: 12,
  },
  featuredBadges: {
    flexDirection: 'row',
    gap: 8,
  },
  featuredTypeChip: {
    borderRadius: 12,
  },
  featuredTypeText: {
    color: 'white',
    fontWeight: '600',
  },
  verifiedChip: {
    borderRadius: 12,
  },
  verifiedText: {
    color: 'white',
    fontWeight: '600',
  },
  featuredContent: {
    padding: 16,
  },
  featuredName: {
    fontWeight: '700',
    marginBottom: 4,
  },
  featuredDescription: {
    marginBottom: 12,
    lineHeight: 18,
  },
  featuredStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  featuredStat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  featuredStatText: {
    fontSize: 12,
  },
  featuredButton: {
    borderRadius: 12,
  },
  featuredButtonContent: {
    paddingVertical: 4,
  },
  filterContainer: {
    paddingVertical: 16,
    marginBottom: 8,
  },
  filterScrollContent: {
    paddingHorizontal: 20,
  },
  filterButton: {
    marginRight: 12,
  },
  filterChip: {
    borderRadius: 20,
    paddingHorizontal: 4,
  },
  connectorsSection: {
    flex: 1,
    paddingHorizontal: 20,
  },
  connectorsList: {
    paddingBottom: 100,
  },
  row: {
    justifyContent: 'space-between',
    paddingHorizontal: 4,
  },
  connectorCard: {
    width: (width - 56) / 2, // Account for padding and gap
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 16,
  },
  connectorImageContainer: {
    position: 'relative',
    height: 100,
  },
  connectorImage: {
    width: '100%',
    height: '100%',
  },
  connectorBadgesRow: {
    position: 'absolute',
    top: 8,
    left: 8,
    right: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  typeChip: {
    borderRadius: 10,
  },
  typeText: {
    color: 'white',
    fontWeight: '600',
  },
  privateIndicator: {
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: 12,
    padding: 4,
  },
  connectorContent: {
    padding: 12,
  },
  connectorHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  connectorName: {
    flex: 1,
    fontWeight: '700',
    marginRight: 4,
  },
  verifiedIcon: {
    marginLeft: 4,
  },
  connectorDescription: {
    marginBottom: 8,
    lineHeight: 18,
  },
  connectorStats: {
    marginBottom: 8,
    gap: 4,
  },
  statRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statText: {
    fontSize: 11,
  },
  connectorTags: {
    flexDirection: 'row',
    gap: 4,
    marginBottom: 12,
    flexWrap: 'wrap',
  },
  tagChip: {
    borderRadius: 8,
  },
  tagText: {
    fontSize: 10,
  },
  connectorButton: {
    borderRadius: 12,
  },
  connectorButtonContent: {
    paddingVertical: 2,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
    paddingVertical: 60,
  },
  emptyStateText: {
    fontWeight: '700',
    textAlign: 'center',
    marginTop: 24,
    marginBottom: 8,
  },
  emptyStateSubtext: {
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 32,
  },
  emptyStateButton: {
    borderRadius: 16,
    paddingHorizontal: 24,
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 30,
    borderRadius: 28,
  },
});

export default ConnectorsScreen; 