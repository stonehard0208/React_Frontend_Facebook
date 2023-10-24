import React from 'react';
import { render, screen, fireEvent, act, waitForElementToBeRemoved} from '@testing-library/react';
import Login from './Login';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserContext from './UserContext';
import '@testing-library/jest-dom'
import { userList } from '../../../UserList';

global.alert = jest.fn();

const mockedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate:() => mockedNavigate
}));


describe('Unit tests for Validate Authentication', () => {
    
    beforeEach(() => {
        jest.resetAllMocks();
        jest.clearAllMocks();
    });


    beforeAll(() => {
        global.fetch = jest.fn();
       
        
    });
    
    it('should log in a previously registered user (not new users, login state should be set)', async () => {
        
        fetch.mockResolvedValueOnce({
            ok: true,
            json: () => Promise.resolve(
              userList
            ),
        });

        render(
            <Router>
                <UserContext.Provider value={{ setUser: jest.fn() }}>
                    <Login />
                </UserContext.Provider>
            </Router>
        );

        await waitForElementToBeRemoved(() => screen.getByText('Loading...'));
        const usernameInput = await screen.getByPlaceholderText('User name');
        const passwordInput = await screen.getByPlaceholderText('Password');
        const loginButton = await screen.getByRole('button', { name: /login/i });

        
        for (const user of userList){
          await act(async () => {
            fireEvent.change(usernameInput, { target: { value: user.username } });
            fireEvent.change(passwordInput, { target: { value: user.address.street } });
            fireEvent.click(loginButton);
          });
        }
        
        expect(fetch).toHaveBeenCalled();
        expect(localStorage.setItem).toHaveBeenCalledTimes(10);


        const call_1 = localStorage.setItem.mock.calls[0];
        expect(call_1[0]).toBe('user');
        const user_1 = JSON.parse(call_1[1]);
        expect(user_1.id).toBe(1);
        expect(user_1.username).toBe('Bret');

        const call_2 = localStorage.setItem.mock.calls[1];
        const user_2 = JSON.parse(call_2[1]);
        expect(user_2.id).toBe(2);
        expect(user_2.username).toBe('Antonette');

        const call_3 = localStorage.setItem.mock.calls[2];
        const user_3 = JSON.parse(call_3[1]);
        expect(user_3.id).toBe(3);
        expect(user_3.username).toBe('Samantha');

        const call_4 = localStorage.setItem.mock.calls[3];
        const user_4 = JSON.parse(call_4[1]);
        expect(user_4.id).toBe(4);
        expect(user_4.username).toBe('Karianne');


        const call_5 = localStorage.setItem.mock.calls[4];
        const user_5 = JSON.parse(call_5[1]);
        expect(user_5.id).toBe(5);
        expect(user_5.username).toBe('Kamren');

        const call_6 = localStorage.setItem.mock.calls[5];
        const user_6 = JSON.parse(call_6[1]);
        expect(user_6.id).toBe(6);
        expect(user_6.username).toBe('Leopoldo_Corkery');

        const call_7 = localStorage.setItem.mock.calls[6];
        const user_7 = JSON.parse(call_7[1]);
        expect(user_7.id).toBe(7);
        expect(user_7.username).toBe('Elwyn.Skiles');

        const call_8 = localStorage.setItem.mock.calls[7];
        const user_8 = JSON.parse(call_8[1]);
        expect(user_8.id).toBe(8);
        expect(user_8.username).toBe('Maxime_Nienow');

        const call_9 = localStorage.setItem.mock.calls[8];
        const user_9 = JSON.parse(call_9[1]);
        expect(user_9.id).toBe(9);
        expect(user_9.username).toBe('Delphine');

        const call_10 = localStorage.setItem.mock.calls[9];
        const user_10 = JSON.parse(call_10[1]);
        expect(user_10.id).toBe(10);
        expect(user_10.username).toBe('Moriah.Stanton');

        expect(localStorage.setItem).toHaveBeenCalledWith('user', expect.any(String));
        
        expect(mockedNavigate).toHaveBeenCalled();
    });


    it("should not log in an invalid user (error state should be set)", async() => {
      fetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(
          userList
        ),
    });

      render(
        <Router>
            <UserContext.Provider value={{ setUser: jest.fn() }}>
                <Login />
            </UserContext.Provider>
        </Router>
    );

      await waitForElementToBeRemoved(() => screen.getByText('Loading...'));
      const usernameInput = await screen.getByPlaceholderText('User name');
      const passwordInput = await screen.getByPlaceholderText('Password');
      const loginButton = await screen.getByRole('button', { name: /login/i });

      await act(async () => {
        fireEvent.change(usernameInput, { target: { value: "fake user name" } });
        fireEvent.change(passwordInput, { target: { value: "fake user password" } });
        fireEvent.click(loginButton);
      });

      expect(window.alert).toHaveBeenCalledWith('User not found');
      expect(mockedNavigate).not.toHaveBeenCalled();
    })

    


});
