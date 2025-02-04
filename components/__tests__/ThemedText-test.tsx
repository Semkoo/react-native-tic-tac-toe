import * as React from 'react';
import renderer from 'react-test-renderer';

import { ThemedText } from '../ThemedText';

// Mock the useThemeColor hook
jest.mock('../../hooks/useThemeColor', () => ({
  useThemeColor: () => '#000000', // Mock return value - black color
}));

it(`renders correctly`, () => {
  const tree = renderer.create(<ThemedText>Snapshot test!</ThemedText>).toJSON();

  expect(tree).toMatchSnapshot();
});
