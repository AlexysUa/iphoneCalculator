import React from 'react';
import renderer from 'react-test-renderer';

import MainScreen from './MainScreen';
import Button from '../components/Button';

describe('<MainScreen />', () => {
  it('has 1 child', () => {
    const tree = renderer.create(<MainScreen />).toJSON();
    expect(tree.children.length).toBe(2);
  });
});

it("renders Button", () => {
  const tree = renderer.create(<Button />).toJSON();

  expect(tree).toMatchSnapshot();
});
