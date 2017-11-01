import React from 'react';
import Footer from '../Footer.js';
import renderer from 'react-test-renderer';

test('Renders correctly', () => {
  const component = renderer.create(
    <Footer />
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
