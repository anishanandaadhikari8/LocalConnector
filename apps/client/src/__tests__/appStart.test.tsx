import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react-native';
import Health from '../../app/health';

describe('App start', () => {
  it('renders health route', () => {
    const { getByText } = render(<Health />);
    expect(getByText(/Health OK/i)).toBeTruthy();
  });
});
