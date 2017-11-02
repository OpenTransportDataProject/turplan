import React from 'react';
import Header from '../Header.js';
import renderer from 'react-test-renderer';

test('Renders correctly', () => {
  const mockFn = jest.fn();
  const component = renderer.create(
    <Header swapComponent={mockFn}/>
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
