import React from 'react';
import { render, act, screen, waitFor } from '@testing-library/react';
import Landing from './Landing';
import { userList } from '../../../UserList';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Registration from './Registration';
import Login from './Login';

const mockedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate:() => mockedNavigate
  }));

describe('Landing component', () => {
    
    beforeAll(() => {
        global.fetch = jest.fn(() => Promise.resolve({
            ok: true,
            json: () => Promise.resolve(userList)
        }));
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('fetches user data on mount and sets it in the state', async () => {
        await act(async () => {
            render(<Landing />);
        });

        expect(fetch).toHaveBeenCalledTimes(2);
        expect(fetch).toHaveBeenCalledWith(`https://jsonplaceholder.typicode.com/users`);
    });

    it('sets user data in localStorage', async () => {
        await act(async () => {
            render(
                 <Router>
                 <Landing />
             </Router>
            );

            
            
        });

        const storedUserData = JSON.parse(localStorage.getItem("userList"));
        expect(storedUserData).toEqual(userList);
    });
});
