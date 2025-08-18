import { describe, it, expect, beforeEach } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react-native';

import AdminLayout from '../../app/(admin)/_layout';
import ResidentLayout from '../../app/(resident)/_layout';
import Kiosk from '../../app/kiosk/checkin';
import { useAuthStore } from '../store/auth';
import { useCircleStore } from '../store/circle';

beforeEach(() => {
  useAuthStore.setState({ token: null, user: null, circle: null, role: null });
  useCircleStore.setState({ circle: null, features: [] });
});

describe('Routing smoke tests', () => {
  it('renders Admin layout for admin roles', () => {
    useAuthStore.setState({
      token: 't',
      user: { id: 'u1', email: 'a@b.c', display_name: 'Admin' } as any,
      role: 'ADMIN' as any,
      circle: { id: 'c1', name: 'Test Circle', type: 'APARTMENT' } as any,
    });
    useCircleStore.setState({
      circle: { id: 'c1', name: 'Test Circle', type: 'APARTMENT' } as any,
      features: ['BOOKINGS','INCIDENTS','ANALYTICS','COMMS','MEMBERS'],
    });
    const { getByText } = render(<AdminLayout />);
    expect(getByText(/Test Circle/i)).toBeTruthy();
  });

  it('does not render Admin layout header for resident role (redirects)', () => {
    useAuthStore.setState({
      token: 't',
      user: { id: 'u2', email: 'r@b.c', display_name: 'Resident' } as any,
      role: 'RESIDENT' as any,
      circle: { id: 'c1', name: 'Test Circle', type: 'APARTMENT' } as any,
    });
    useCircleStore.setState({
      circle: { id: 'c1', name: 'Test Circle', type: 'APARTMENT' } as any,
      features: ['BOOKINGS'],
    });
    const { queryByText } = render(<AdminLayout />);
    expect(queryByText(/ADMIN/i)).toBeNull();
  });

  it('renders Resident layout and tabs for resident', () => {
    useAuthStore.setState({
      token: 't',
      user: { id: 'u3', email: 'r@b.c', display_name: 'Resident' } as any,
      role: 'RESIDENT' as any,
      circle: { id: 'c1', name: 'Test Circle', type: 'APARTMENT' } as any,
    });
    useCircleStore.setState({
      circle: { id: 'c1', name: 'Test Circle', type: 'APARTMENT' } as any,
      features: ['BOOKINGS','INCIDENTS','COMMS'],
    });
    const { getByText } = render(<ResidentLayout />);
    expect(getByText(/Test Circle/i)).toBeTruthy();
  });

  it('renders Kiosk check-in input', () => {
    const { getByPlaceholderText } = render(<Kiosk />);
    expect(getByPlaceholderText(/Enter booking id/i)).toBeTruthy();
  });
});


