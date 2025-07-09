import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { bills } from '../data/mockData';

export default function BillsModule({ connectorType = 'Apartment' }) {
  const [activeBills, setActiveBills] = useState(bills.filter(bill => bill.status === 'pending'));
  const [showAddBill, setShowAddBill] = useState(false);
  const [newBill, setNewBill] = useState({
    title: '',
    amount: '',
    dueDate: '',
    splitType: 'equal', // equal, custom, percentage
    description: ''
  });

  const handleAddBill = () => {
    if (!newBill.title || !newBill.amount) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    const bill = {
      id: `bill_${Date.now()}`,
      title: newBill.title,
      amount: parseFloat(newBill.amount),
      dueDate: newBill.dueDate,
      status: 'pending',
      createdBy: 'current_user',
      splitType: newBill.splitType,
      description: newBill.description,
      createdAt: new Date().toISOString(),
      paidBy: [],
      splitAmong: [] // Will be populated based on connector members
    };

    setActiveBills([bill, ...activeBills]);
    setNewBill({ title: '', amount: '', dueDate: '', splitType: 'equal', description: '' });
    setShowAddBill(false);
    Alert.alert('Success', 'Bill added successfully!');
  };

  const markAsPaid = (billId, userId = 'current_user') => {
    setActiveBills(prev => prev.map(bill => {
      if (bill.id === billId) {
        const updatedPaidBy = [...bill.paidBy, userId];
        return {
          ...bill,
          paidBy: updatedPaidBy,
          status: updatedPaidBy.length === bill.splitAmong.length ? 'completed' : 'pending'
        };
      }
      return bill;
    }));
  };

  const getBillStatusColor = (status) => {
    switch (status) {
      case 'pending': return '#f59e0b';
      case 'overdue': return '#ef4444';
      case 'completed': return '#10b981';
      default: return '#6b7280';
    }
  };

  const renderBillCard = (bill) => (
    <View key={bill.id} style={{
      backgroundColor: 'white',
      margin: 8,
      padding: 16,
      borderRadius: 12,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 3,
      elevation: 3,
      borderLeftWidth: 4,
      borderLeftColor: getBillStatusColor(bill.status)
    }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#1f2937' }}>
            {bill.title}
          </Text>
          <Text style={{ fontSize: 24, fontWeight: '600', color: '#059669', marginTop: 4 }}>
            ${bill.amount.toFixed(2)}
          </Text>
          {bill.description && (
            <Text style={{ color: '#6b7280', marginTop: 4 }}>
              {bill.description}
            </Text>
          )}
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 8 }}>
            <Ionicons name="calendar-outline" size={16} color="#6b7280" />
            <Text style={{ color: '#6b7280', marginLeft: 4 }}>
              Due: {new Date(bill.dueDate).toLocaleDateString()}
            </Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4 }}>
            <Ionicons name="people-outline" size={16} color="#6b7280" />
            <Text style={{ color: '#6b7280', marginLeft: 4 }}>
              Split {bill.splitType === 'equal' ? 'equally' : 'custom'} • {bill.paidBy.length}/{bill.splitAmong.length || 3} paid
            </Text>
          </View>
        </View>
        
        <View style={{ alignItems: 'center' }}>
          <View style={{
            backgroundColor: getBillStatusColor(bill.status),
            paddingHorizontal: 8,
            paddingVertical: 4,
            borderRadius: 12
          }}>
            <Text style={{ color: 'white', fontSize: 12, fontWeight: '600' }}>
              {bill.status.toUpperCase()}
            </Text>
          </View>
          
          {bill.status === 'pending' && !bill.paidBy.includes('current_user') && (
            <TouchableOpacity
              onPress={() => markAsPaid(bill.id)}
              style={{
                backgroundColor: '#10b981',
                paddingHorizontal: 12,
                paddingVertical: 6,
                borderRadius: 8,
                marginTop: 8
              }}
            >
              <Text style={{ color: 'white', fontWeight: '600', fontSize: 12 }}>
                Mark Paid
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: '#f3f4f6' }}>
      <ScrollView>
        <View style={{ padding: 16 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#1f2937' }}>
              {connectorType === 'Roommate' ? 'Shared Bills' : 'Building Bills'}
            </Text>
            <TouchableOpacity
              onPress={() => setShowAddBill(!showAddBill)}
              style={{
                backgroundColor: '#3b82f6',
                paddingHorizontal: 16,
                paddingVertical: 8,
                borderRadius: 8,
                flexDirection: 'row',
                alignItems: 'center'
              }}
            >
              <Ionicons name="add" size={20} color="white" />
              <Text style={{ color: 'white', fontWeight: '600', marginLeft: 4 }}>
                Add Bill
              </Text>
            </TouchableOpacity>
          </View>

          {showAddBill && (
            <View style={{
              backgroundColor: 'white',
              padding: 16,
              borderRadius: 12,
              marginBottom: 16,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 3,
              elevation: 3
            }}>
              <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 12 }}>
                Add New Bill
              </Text>
              
              <TextInput
                placeholder="Bill title (e.g., Electricity, Internet)"
                value={newBill.title}
                onChangeText={(text) => setNewBill(prev => ({ ...prev, title: text }))}
                style={{
                  borderWidth: 1,
                  borderColor: '#d1d5db',
                  borderRadius: 8,
                  padding: 12,
                  marginBottom: 12
                }}
              />
              
              <TextInput
                placeholder="Amount ($)"
                value={newBill.amount}
                onChangeText={(text) => setNewBill(prev => ({ ...prev, amount: text }))}
                keyboardType="numeric"
                style={{
                  borderWidth: 1,
                  borderColor: '#d1d5db',
                  borderRadius: 8,
                  padding: 12,
                  marginBottom: 12
                }}
              />
              
              <TextInput
                placeholder="Due date (YYYY-MM-DD)"
                value={newBill.dueDate}
                onChangeText={(text) => setNewBill(prev => ({ ...prev, dueDate: text }))}
                style={{
                  borderWidth: 1,
                  borderColor: '#d1d5db',
                  borderRadius: 8,
                  padding: 12,
                  marginBottom: 12
                }}
              />
              
              <TextInput
                placeholder="Description (optional)"
                value={newBill.description}
                onChangeText={(text) => setNewBill(prev => ({ ...prev, description: text }))}
                multiline
                style={{
                  borderWidth: 1,
                  borderColor: '#d1d5db',
                  borderRadius: 8,
                  padding: 12,
                  marginBottom: 16,
                  height: 80
                }}
              />
              
              <View style={{ flexDirection: 'row', justifyContent: 'flex-end', gap: 8 }}>
                <TouchableOpacity
                  onPress={() => setShowAddBill(false)}
                  style={{
                    paddingHorizontal: 16,
                    paddingVertical: 8,
                    borderRadius: 8,
                    borderWidth: 1,
                    borderColor: '#d1d5db'
                  }}
                >
                  <Text style={{ color: '#6b7280' }}>Cancel</Text>
                </TouchableOpacity>
                
                <TouchableOpacity
                  onPress={handleAddBill}
                  style={{
                    backgroundColor: '#3b82f6',
                    paddingHorizontal: 16,
                    paddingVertical: 8,
                    borderRadius: 8
                  }}
                >
                  <Text style={{ color: 'white', fontWeight: '600' }}>Add Bill</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}

          <View style={{
            backgroundColor: 'white',
            padding: 16,
            borderRadius: 12,
            marginBottom: 16,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 3,
            elevation: 3
          }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 12 }}>
              Bill Summary
            </Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <View style={{ alignItems: 'center' }}>
                <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#f59e0b' }}>
                  {activeBills.filter(b => b.status === 'pending').length}
                </Text>
                <Text style={{ color: '#6b7280', fontSize: 12 }}>Pending</Text>
              </View>
              <View style={{ alignItems: 'center' }}>
                <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#059669' }}>
                  ${activeBills.reduce((sum, bill) => sum + bill.amount, 0).toFixed(2)}
                </Text>
                <Text style={{ color: '#6b7280', fontSize: 12 }}>Total Amount</Text>
              </View>
              <View style={{ alignItems: 'center' }}>
                <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#3b82f6' }}>
                  ${(activeBills.reduce((sum, bill) => sum + bill.amount, 0) / 3).toFixed(2)}
                </Text>
                <Text style={{ color: '#6b7280', fontSize: 12 }}>Your Share</Text>
              </View>
            </View>
          </View>

          <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 8, color: '#1f2937' }}>
            Active Bills
          </Text>
          
          {activeBills.length === 0 ? (
            <View style={{
              backgroundColor: 'white',
              padding: 32,
              borderRadius: 12,
              alignItems: 'center',
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 3,
              elevation: 3
            }}>
              <Ionicons name="receipt-outline" size={48} color="#d1d5db" />
              <Text style={{ color: '#6b7280', marginTop: 8, textAlign: 'center' }}>
                No bills yet. Add your first bill to start tracking expenses.
              </Text>
            </View>
          ) : (
            activeBills.map(renderBillCard)
          )}
        </View>
      </ScrollView>
    </View>
  );
}