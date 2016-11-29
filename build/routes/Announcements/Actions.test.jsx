/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-undef */

import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

import Actions from './Actions';

test('should render equal to snapshot', () => {
  const mock = jest.fn();
  const container = renderer.create(
    <Actions
      onChangeSearchString={mock}
      onChangeSearchDate={mock}
      onSubmitSearchString={mock}
      onSubmitSearchDate={mock}
    />
  );
  const tree = container.toJSON();
  expect(tree).toMatchSnapshot();
});

// Testing isRequired props
test('should throw error when one or more function is not provided', () => {
  const mock = jest.fn();
  let container = renderer.create(<Actions />);
  let tree = container.toJSON();
  expect(tree).toThrowErrorMatchingSnapshot();

  container = renderer.create(
    <Actions
      onChangeSearchDate={mock}
      onSubmitSearchString={mock}
      onSubmitSearchDate={mock}
    />
  );
  tree = container.toJSON();
  expect(tree).toThrowErrorMatchingSnapshot();

  container = renderer.create(
    <Actions
      onChangeSearchString={mock}
      onSubmitSearchString={mock}
      onSubmitSearchDate={mock}
    />
  );
  tree = container.toJSON();
  expect(tree).toThrowErrorMatchingSnapshot();

  container = renderer.create(
    <Actions
      onChangeSearchString={mock}
      onChangeSearchDate={mock}
      onSubmitSearchDate={mock}
    />
  );
  tree = container.toJSON();
  expect(tree).toThrowErrorMatchingSnapshot();

  container = renderer.create(
    <Actions
      onChangeSearchString={mock}
      onChangeSearchDate={mock}
      onSubmitSearchString={mock}
    />
  );
  tree = container.toJSON();
  expect(tree).toThrowErrorMatchingSnapshot();
});

// Testing #search change event
test('should trigger onChangeSearchString when #search is changed', () => {
  const mock = jest.fn();
  const wrapper = shallow(
    <Actions
      onChangeSearchString={mock}
      onChangeSearchDate={mock}
      onSubmitSearchString={mock}
      onSubmitSearchDate={mock}
    />
  );

  wrapper.find('#search').simulate('change', 'string');
  expect(mock).toHaveBeenLastCalledWith('string');
  wrapper.find('#date').simulate('change', 'date');
  expect(mock).toHaveBeenLastCalledWith('date');
  wrapper.find('#searchAnnouncementsString').simulate('submit', 'searchString');
  expect(mock).toHaveBeenLastCalledWith('searchString');
  wrapper.find('#searchAnnouncementsDate').simulate('submit', 'searchDate');
  expect(mock).toHaveBeenLastCalledWith('searchDate');

  expect(mock.mock.calls.length).toBe(4);
});
