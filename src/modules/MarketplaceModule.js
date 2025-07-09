import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, ScrollView } from 'react-native';

export default function MarketplaceModule() {
  const [products, setProducts] = useState([
    {
      id: 1,
      title: 'iPhone 12 Pro',
      description: 'Excellent condition, 128GB, comes with original box',
      price: 599,
      category: 'Electronics',
      seller: 'John Doe',
      image: 'https://via.placeholder.com/150',
      status: 'available',
      createdAt: '2024-12-20',
    },
    {
      id: 2,
      title: 'Coffee Table',
      description: 'Wooden coffee table, perfect for living room',
      price: 120,
      category: 'Furniture',
      seller: 'Jane Smith',
      image: 'https://via.placeholder.com/150',
      status: 'available',
      createdAt: '2024-12-19',
    }
  ]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newProduct, setNewProduct] = useState({
    title: '',
    description: '',
    price: '',
    category: '',
  });

  const handleCreateListing = () => {
    if (!newProduct.title || !newProduct.price || !newProduct.category) return;
    setProducts([
      {
        id: Date.now(),
        title: newProduct.title,
        description: newProduct.description,
        price: parseFloat(newProduct.price),
        category: newProduct.category,
        seller: 'Current User',
        image: 'https://via.placeholder.com/150',
        status: 'available',
        createdAt: new Date().toISOString().split('T')[0],
      },
      ...products,
    ]);
    setNewProduct({ title: '', description: '', price: '', category: '' });
    setShowCreateForm(false);
  };

  const handleBuyProduct = (productId) => {
    setProducts(products.map(product =>
      product.id === productId
        ? { ...product, status: 'sold' }
        : product
    ));
  };

  const handleDeleteListing = (productId) => {
    setProducts(products.filter(p => p.id !== productId));
  };

  const categories = ['Electronics', 'Furniture', 'Clothing', 'Books', 'Sports', 'Other'];

  return (
    <View style={{ padding: 8 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
        <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Marketplace</Text>
        <TouchableOpacity 
          onPress={() => setShowCreateForm(!showCreateForm)}
          style={{ backgroundColor: '#0284c7', borderRadius: 6, padding: 8 }}
        >
          <Text style={{ color: '#fff', fontWeight: 'bold' }}>
            {showCreateForm ? 'Cancel' : 'Sell Item'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Create Listing Form */}
      {showCreateForm && (
        <View style={{ backgroundColor: '#fff', padding: 12, borderRadius: 6, marginBottom: 12, elevation: 1 }}>
          <Text style={{ fontWeight: 'bold', marginBottom: 8 }}>Create New Listing</Text>
          <TextInput
            value={newProduct.title}
            onChangeText={text => setNewProduct({ ...newProduct, title: text })}
            placeholder="Item Title"
            style={{ backgroundColor: '#f3f4f6', borderRadius: 6, padding: 8, marginBottom: 8 }}
          />
          <TextInput
            value={newProduct.description}
            onChangeText={text => setNewProduct({ ...newProduct, description: text })}
            placeholder="Description"
            multiline
            style={{ backgroundColor: '#f3f4f6', borderRadius: 6, padding: 8, marginBottom: 8 }}
          />
          <TextInput
            value={newProduct.price}
            onChangeText={text => setNewProduct({ ...newProduct, price: text })}
            placeholder="Price ($)"
            keyboardType="numeric"
            style={{ backgroundColor: '#f3f4f6', borderRadius: 6, padding: 8, marginBottom: 8 }}
          />
          <View style={{ marginBottom: 8 }}>
            <Text style={{ marginBottom: 4 }}>Category:</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {categories.map(category => (
                <TouchableOpacity
                  key={category}
                  onPress={() => setNewProduct({ ...newProduct, category })}
                  style={{
                    backgroundColor: newProduct.category === category ? '#0284c7' : '#f3f4f6',
                    paddingHorizontal: 12,
                    paddingVertical: 6,
                    borderRadius: 6,
                    marginRight: 8,
                  }}
                >
                  <Text style={{ 
                    color: newProduct.category === category ? '#fff' : '#000',
                    fontWeight: 'bold'
                  }}>
                    {category}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
          <TouchableOpacity onPress={handleCreateListing} style={{ backgroundColor: '#059669', borderRadius: 6, padding: 10 }}>
            <Text style={{ color: '#fff', fontWeight: 'bold', textAlign: 'center' }}>Create Listing</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Products List */}
      <FlatList
        data={products}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={{ marginBottom: 12, padding: 12, backgroundColor: '#fff', borderRadius: 6, elevation: 1 }}>
            <View style={{ flexDirection: 'row', marginBottom: 8 }}>
              <View style={{ width: 80, height: 80, backgroundColor: '#f3f4f6', borderRadius: 6, marginRight: 12 }} />
              <View style={{ flex: 1 }}>
                <Text style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 4 }}>{item.title}</Text>
                <Text style={{ color: '#666', marginBottom: 4 }}>{item.description}</Text>
                <Text style={{ fontWeight: 'bold', color: '#059669', fontSize: 18 }}>${item.price}</Text>
              </View>
            </View>
            
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
              <Text style={{ color: '#666' }}>Seller: {item.seller}</Text>
              <Text style={{ color: '#666' }}>Category: {item.category}</Text>
            </View>
            
            <View style={{ flexDirection: 'row', marginBottom: 8 }}>
              {item.status === 'available' ? (
                <TouchableOpacity 
                  onPress={() => handleBuyProduct(item.id)}
                  style={{ backgroundColor: '#059669', borderRadius: 6, padding: 8, marginRight: 8 }}
                >
                  <Text style={{ color: '#fff', fontWeight: 'bold' }}>Buy Now</Text>
                </TouchableOpacity>
              ) : (
                <View style={{ backgroundColor: '#dc2626', borderRadius: 6, padding: 8, marginRight: 8 }}>
                  <Text style={{ color: '#fff', fontWeight: 'bold' }}>Sold</Text>
                </View>
              )}
              {item.seller === 'Current User' && (
                <TouchableOpacity 
                  onPress={() => handleDeleteListing(item.id)}
                  style={{ backgroundColor: '#dc2626', borderRadius: 6, padding: 8 }}
                >
                  <Text style={{ color: '#fff', fontWeight: 'bold' }}>Delete</Text>
                </TouchableOpacity>
              )}
            </View>
            
            <Text style={{ color: '#888', fontSize: 12 }}>Listed on {item.createdAt}</Text>
          </View>
        )}
        ListEmptyComponent={<Text style={{ color: '#888' }}>No items for sale yet.</Text>}
      />
    </View>
  );
} 