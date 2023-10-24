import React from 'react';
import { render, screen, fireEvent, act, waitForElementToBeRemoved} from '@testing-library/react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from './Main';
import UserContext from '../auth/UserContext';
import Login from '../auth/Login';
import '@testing-library/jest-dom'
import { userList } from '../../../UserList';


const mockSetUser = jest.fn();
const mockedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate:() => mockedNavigate
  }));

  const mockUser =  userList[0];

describe('Unit tests for Validate Authentication(Log out)', () => {

    beforeEach(() => {
        jest.resetAllMocks();
        jest.clearAllMocks();
    });


    beforeAll(() => {
        global.fetch = jest.fn();
        
    });

    it('should log out a user (login state should be cleared)', async () => {
        fetch.mockResolvedValueOnce({
            ok: true,
            json: () => Promise.resolve(
              mockUser
            ),
        });

        localStorage.setItem('user', JSON.stringify(mockUser));

        render(
            <Router>
                <UserContext.Provider value={{ setUser: jest.fn() }}>
                    {/* <Login /> */}
                    <Main user={mockUser} />
                </UserContext.Provider>
            </Router>
        );
        

            
        const logoutButton = screen.getByText('Logout');
        await act(async () => {
        fireEvent.click(logoutButton);
        });
        expect(localStorage.removeItem).toHaveBeenCalled();
        expect(localStorage.removeItem).toHaveBeenCalledWith('user');
        expect(mockedNavigate).toHaveBeenCalledWith('/');

        

    });
});



