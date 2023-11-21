import { render, screen } from '@testing-library/react';
import Navbar from '../src/components/Navbar.tsx';

describe('Unit testing React Navbar', () => {
  const setFilter = jest.fn();
  const navbar = render(<Navbar { setFilter }/>);
})