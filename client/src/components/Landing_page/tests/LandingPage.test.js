import React from 'react';
import LandingPage from '../LandingPage.js';
import renderer from 'react-test-renderer';

test('Renders correctly', () => {
  const mockFn = jest.fn();
  const component = renderer.create(
    <LandingPage swapComponent={mockFn}/>
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
