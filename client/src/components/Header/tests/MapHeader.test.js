import React from 'react';
import Header from '../MapHeader.js';
import renderer from 'react-test-renderer';

test('Renders correctly', () => {
  const component = renderer.create(
    <Header />
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
