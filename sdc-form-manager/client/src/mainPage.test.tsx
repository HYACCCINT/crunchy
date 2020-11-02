import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import { MainPage } from './mainPage';

const mockHistoryPush = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useHistory: () => ({
      push: mockHistoryPush,
    }),
  }));
  
  describe('MainPage', () => {
    it('Redirects to correct URL on click', () => {
      const { getByText } = render(
        <MemoryRouter>
          <MainPage />
        </MemoryRouter>,
      );
  
      fireEvent.click(getByText('Upload Form'));
      expect(mockHistoryPush).toHaveBeenCalledWith('/upload-form/new');

      fireEvent.click(getByText('Update Form'));
      expect(mockHistoryPush).toHaveBeenCalledWith('/upload-form/update');
    });

  });