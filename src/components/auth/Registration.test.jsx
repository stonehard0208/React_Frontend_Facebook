import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Registration from './Registration';
import UserContext from './UserContext';

describe('<Registration />', () => {
    let mockNavigate;

    beforeEach(() => {
        mockNavigate = jest.fn();

        render(
            <Router>
                <UserContext.Provider value={{ setUser: jest.fn() }}>
                    <Registration />
                </UserContext.Provider>
            </Router>


        );
    });

    test('renders correctly', () => {
        expect(screen.getByPlaceholderText('Input Username')).toBeInTheDocument();
    });

    test('updates input value on change', () => {
        fireEvent.change(screen.getByPlaceholderText('Input Username'), {
            target: { value: 'testUser' }
        });
        expect(screen.getByPlaceholderText('Input Username').value).toBe('testUser');
    });

    test('alerts when the user is under 18', async () => {
        window.alert = jest.fn();
        fireEvent.change(screen.getByPlaceholderText('Date of Birth'), {
            target: { value: '2008-01-01' }
        });
        fireEvent.click(screen.getByText('Register'));
        await waitFor(() => {
            expect(window.alert).toHaveBeenCalledWith('User must be 18 years or older to register');
        });
    });

    test('alerts when passwords do not match', async () => {
        window.alert = jest.fn();
        fireEvent.change(screen.getByPlaceholderText('User Password'), {
            target: { value: 'password1' }
        });
        fireEvent.change(screen.getByPlaceholderText('Confirm Password'), {
            target: { value: 'password2' }
        });
        fireEvent.click(screen.getByText('Register'));
        await waitFor(() => {
            expect(window.alert).toHaveBeenCalledWith('Confirmation password does not match the input password');
        });
    });

   
});

