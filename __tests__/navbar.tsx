import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Navbar from '../src/components/Navbar.tsx';
import React from 'react';
import '@testing-library/jest-dom';

describe('Unit testing React Navbar', () => {
  const setFilter = jest.fn();
  beforeEach(() => {
    render(<Navbar setFilter={setFilter} />);
  });

  test('It should have 6 buttons', () => {
    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toEqual(6);
    expect(buttons[0]).toHaveTextContent('Bookmarked 📖');
  });
  test('The function passed down should be invoked on click', () => {
    const buttons = screen.getAllByRole('button');
    userEvent.click(buttons[0]);
    expect(setFilter).toHaveBeenCalled();
  });
});
