import React from 'react';
import { act } from 'react-dom/test-utils';
import { Provider } from 'urql';
import { makeSubject } from 'wonka';
import { mount } from 'enzyme';
import { FormDisplay } from '../form-manager/pages/FormDisplay';
import { MemoryRouter } from 'react-router-dom';

const { source: stream, next: pushResponse } = makeSubject();

const mockedClient = {
  executeQuery: jest.fn(() => stream),
};

it('shows notification on updated data', () => {
  const wrapper = mount(
    <MemoryRouter initialEntries={['/formdisplay/55555']}>
    <Provider value={mockedClient}>
      <FormDisplay />
    </Provider>
    </MemoryRouter>
  );
  // First response
  act(() => {
    pushResponse({
      data: {
        procedureID: "d290f1ee-6c54-4b01-90e6-d701748f0851",
        releaseDate: "2016-08-29T09:12:33.001Z",
        name: "Widget Adapter"
      },
    });
  });
  expect(wrapper.text().includes('d290f1ee-6c54-4b01-90e6-d701748f0851'))
  expect(wrapper.text().includes('2016-08-29T09:12:33.001Z'))
  expect(wrapper.text().includes('Widget Adapter'))

});