/* eslint-disable no-undef */

import datePrettifier from './datePrettifier';

test('should render ISO Date to YYYY/MM/DD format in browser', () => {
  const ISODate = '2016-11-27T14:16:00.000Z';
  const renderedDate = datePrettifier(ISODate, 'yyyy/mm/dd', 'Asia/Jakarta');
  const newDate = new Date(ISODate);
  const testedDate = newDate.toLocaleDateString('en-GB', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  });

  expect(renderedDate).toBe(testedDate);
});

test('should render ISO Date to Sun, 27 Nov 2016 9:16 pm in browser', () => {
  const ISODate = '2016-11-27T14:16:00.000Z';
  const renderedDate = datePrettifier(ISODate, 'completeshort', 'Asia/Jakarta');
  const newDate = new Date(ISODate);
  const testedDate = newDate.toLocaleDateString('en-GB', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });

  expect(renderedDate).toBe(testedDate);
});

test('should render ISO Date to Sunday, 27 November 2016 9:16 pm in browser', () => {
  const ISODate = '2016-11-27T14:16:00.000Z';
  const renderedDate = datePrettifier(ISODate, 'completelong');
  const newDate = new Date(ISODate);
  const testedDate = newDate.toLocaleDateString('en-GB', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });

  expect(renderedDate).toBe(testedDate);
});
