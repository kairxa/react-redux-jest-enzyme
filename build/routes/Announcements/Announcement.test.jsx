/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-undef */

import React from 'react';
import renderer from 'react-test-renderer';

import Announcement from './Announcement';

test('should render equal to snapshot', () => {
  const owner = {
    name: 'Putra Prawira Tanzil',
    id: '123456789abcdef',
    picture: 'http://placehold.it/320x320',
  };
  const content = {
    title: '# This is a content\n\nLorem ipsum dolor sit amet lalala this is just a text for testing.\n\nOkay thanks.',
    cover: 'http://placehold.it/1600x900',
    createdAt: '2016-11-27T14:16:00.000Z',
  };
  const container = renderer.create(
    <Announcement
      owner={owner}
      content={content}
    />
  );
  const tree = container.toJSON();
  expect(tree).toMatchSnapshot();
});
