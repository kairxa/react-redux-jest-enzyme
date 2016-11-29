/* eslint-disable no-undef */

import numberPrettifier from './numberPrettifier';

test('should render 123456789 into 123 456 789', () => {
  expect(numberPrettifier(123456789)).toBe('123 456 789');
});

test('should render 123k to 123k', () => {
  expect(numberPrettifier('123k')).toBe('123k');
});
