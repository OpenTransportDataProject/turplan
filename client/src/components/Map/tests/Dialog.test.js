import React from 'react';
import Dialog from '../Dialog.js';
import renderer from 'react-test-renderer';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

test('Renders correctly', () => {
  const component = renderer.create(
    <MuiThemeProvider><Dialog /></MuiThemeProvider>
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
