import * as React from 'react';
import renderer from 'react-test-renderer';

import Text from '../ui/Text';

it('renders correctly', () => {
  const tree = renderer.create(<Text>Test</Text>).toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders correctly with children', () => {
  const tree = renderer.create(<Text>Test</Text>).toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders correctly with children and style', () => {
  const tree = renderer.create(<Text style={{ color: 'red' }}>Test</Text>).toJSON();
  expect(tree).toMatchSnapshot();
});
