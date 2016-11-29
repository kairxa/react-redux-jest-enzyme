/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-undef */

import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import { Map as map } from 'immutable';
import { normalize, Schema, arrayOf } from 'normalizr';

import { Announcements, mapStateToProps } from './index';
import Actions from './Actions';
import Announcement from './Announcement';

const announcementSchema = new Schema('announcements');
const commentSchema = new Schema('comments');
const authorSchema = new Schema('author');
authorSchema.define({});
commentSchema.define({
  author: authorSchema,
});
announcementSchema.define({
  author: authorSchema,
  comments: arrayOf(commentSchema),
});

const mockAnnouncement = {
  announcements: [
    {
      id: 1,
      title: '# Lorem Ipsum Dolor Sit Amet',
      createdAt: '2016-11-27T14:16:00.000Z',
      editedAt: '2016-11-27T14:16:00.000Z',
      author: {
        id: 25,
        name: 'Putra Prawira Tanzil',
        picture: 'http://placehold.it/320x320',
      },
      comments: [
        {
          id: 5,
          title: '# Yet another lorem ipsum',
          createdAt: '2016-11-27T14:16:03.000Z',
          editedAt: '2016-11-27T14:16:05.000Z',
          author: {
            id: 25,
            name: 'Putra Prawira Tanzil',
            picture: 'http://placehold.it/320x320',
          },
        },
      ],
    },
    {
      id: 2,
      title: '# Lorem Ipsum Dolor Sit Amet',
      createdAt: '2016-11-27T14:16:00.000Z',
      editedAt: '2016-11-27T14:16:00.000Z',
      author: {
        id: 25,
        name: 'Putra Prawira Tanzil',
        picture: 'http://placehold.it/320x320',
      },
      comments: [
        {
          id: 5,
          title: '# Yet another lorem ipsum',
          createdAt: '2016-11-27T14:16:03.000Z',
          editedAt: '2016-11-27T14:16:05.000Z',
          author: {
            id: 25,
            name: 'Putra Prawira Tanzil',
            picture: 'http://placehold.it/320x320',
          },
        },
      ],
    },
  ],
};

test('should be equal to snapshot', () => {
  const mock = jest.fn();
  const announcements = [];
  let container = renderer.create(
    <Announcements dispatch={mock} announcements={announcements} />
  );
  let tree = container.toJSON();
  expect(tree).toMatchSnapshot();
  container = renderer.create(
    <Announcements dispatch={mock} />
  );
  tree = container.toJSON();
  expect(tree).toMatchSnapshot();
});

test('should only have Actions as children when announcements length is 0', () => {
  const mock = jest.fn();
  const announcements = [];
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
  const wrapper = shallow(<Announcements dispatch={mock} announcements={announcements} />);
  expect(wrapper.contains([
    <Actions
      onChangeSearchString={wrapper.instance().handleChangeSearchString}
      onChangeSearchDate={wrapper.instance().handleChangeSearchDate}
      onSubmitSearchString={wrapper.instance().handleSubmitSearchString}
      onSubmitSearchDate={wrapper.instance().handleSubmitSearchDate}
    />,
  ])).toBe(true);
  expect(wrapper.contains([<Announcement owner={owner} content={content} />])).toBe(false);
});

test('should have Announcements as children when announcements length is > 0', () => {
  const mock = jest.fn();
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
  const announcements = [
    {
      owner,
      content,
    },
  ];
  const wrapper = shallow(<Announcements dispatch={mock} announcements={announcements} />);
  expect(wrapper.contains([
    <Actions
      onChangeSearchString={wrapper.instance().handleChangeSearchString}
      onChangeSearchDate={wrapper.instance().handleChangeSearchDate}
      onSubmitSearchString={wrapper.instance().handleSubmitSearchString}
      onSubmitSearchDate={wrapper.instance().handleSubmitSearchDate}
    />,
  ])).toBe(true);
  expect(wrapper.contains([<Announcement owner={owner} content={content} />])).toBe(true);
});

test('should change state.searchString if handleChangeSearchString is triggered', () => {
  const mock = jest.fn();
  const announcements = [];
  const wrapper = shallow(<Announcements dispatch={mock} announcements={announcements} />);
  const event = { target: { value: 'string' } };
  wrapper.instance().handleChangeSearchString(event);
  expect(wrapper.state('searchString')).toBe('string');
});

test('should change state.searchDate if handleChangeSearchDate is triggered', () => {
  const mock = jest.fn();
  const announcements = [];
  const wrapper = shallow(<Announcements dispatch={mock} announcements={announcements} />);
  const event = { target: { value: '2016-11-27' } };
  wrapper.instance().handleChangeSearchDate(event);
  expect(wrapper.state('searchDate')).toBe('2016-11-27T00:00:00.000Z');
});

test('should call dispatch if forms are submitted', () => {
  const mock = jest.fn();
  const preventDefault = jest.fn();
  const announcements = [];
  const wrapper = shallow(<Announcements dispatch={mock} announcements={announcements} />);
  const event = { preventDefault };

  wrapper.instance().handleSubmitSearchString(event);
  expect(preventDefault).toBeCalled();
  expect(mock).toBeCalled();
  expect(mock.mock.calls.length).toBe(1);

  wrapper.instance().handleSubmitSearchDate(event);
  expect(preventDefault.mock.calls.length).toBe(2);
  expect(mock.mock.calls.length).toBe(2);
});

test('should return announcements as props from mapStateToProps', () => {
  const state = {
    getAnnouncements: {
      payload: map(normalize(mockAnnouncement, {
        announcements: arrayOf(announcementSchema),
      })),
    },
  };
  const announcements = mapStateToProps(state);
  expect(announcements).toEqual(mockAnnouncement);
});
