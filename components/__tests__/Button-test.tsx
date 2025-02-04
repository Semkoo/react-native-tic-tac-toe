import * as React from 'react';
import renderer from 'react-test-renderer';

import Button from '../ui/Button';

it(`renders correctly`, () => {
  const tree = renderer.create(<Button title="Test" />).toJSON();

  expect(tree).toMatchSnapshot();
});

it('renders correctly with onPress', () => {
  const onPressMock = jest.fn();
  const tree = renderer.create(<Button title="Test" onPress={onPressMock} />).toJSON();

  expect(tree).toMatchSnapshot();
});

it('renders correctly with onPress and disabled', () => {
  const onPressMock = jest.fn();
  const tree = renderer.create(<Button title="Test" onPress={onPressMock} disabled />).toJSON();

  expect(tree).toMatchSnapshot();
});

it('renders correctly with onPress and loading', () => {
  const onPressMock = jest.fn();
  const tree = renderer.create(<Button title="Test" onPress={onPressMock} loading />).toJSON();

  expect(tree).toMatchSnapshot();
});

it('renders correctly with onPress and disabled and loading', () => {
  const onPressMock = jest.fn();
  const tree = renderer
    .create(<Button title="Test" onPress={onPressMock} disabled loading />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
