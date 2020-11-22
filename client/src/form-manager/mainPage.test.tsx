import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import { MainPage } from './mainPage';

const mockHistoryPush = jest.fn();

window.prompt = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useHistory: () => ({
      push: mockHistoryPush,
    }),
  }));
  
    describe('MainPage', () => {
    it('Upload form redirects to correct URL on click', () => {
      const { getByText } = render(
        <MemoryRouter>
          <MainPage />
        </MemoryRouter>,
      );
  
      fireEvent.click(getByText('Upload Form'));
      expect(mockHistoryPush).toHaveBeenCalledWith('/upload-form/new');
    });

    it('Display form prompts user to enter formId', () => {
      window.prompt.mockClear();
      const { getByText } = render(
        <MemoryRouter>
          <MainPage />
        </MemoryRouter>,
      );
  
      fireEvent.click(getByText('Display Form'));
      expect(mockHistoryPush).toHaveBeenCalled();
    });

    it('Delete form is called', () => {
      const { getByText } = render(
        <MemoryRouter>
          <MainPage />
        </MemoryRouter>,
      );
  
      fireEvent.click(getByText('Delete Form'));
      expect(mockHistoryPush).toHaveBeenCalled();
    });

    it('Update form redirects to correct URL on click', () => {
      const { getByText } = render(
        <MemoryRouter>
          <MainPage />
        </MemoryRouter>,
      );

      fireEvent.click(getByText('Update Form'));
      expect(mockHistoryPush).toHaveBeenCalledWith('/upload-form/update');
    });

  });