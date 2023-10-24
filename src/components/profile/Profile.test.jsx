import React from 'react';
import { render, screen, fireEvent, act, waitForElementToBeRemoved, waitFor, cleanup, within } from '@testing-library/react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserContext from '../auth/UserContext';
import Profile from './Profile';
import '@testing-library/jest-dom'
import { userList } from '../../../UserList';

localStorage.setItem("userList", JSON.stringify(userList));

describe("Validate Profile action for user1", () => {
    const user = userList[0]
    const password = user.address.street;
    const savedUser = {...user, password1: password, password2: password};
    localStorage.setItem("user", JSON.stringify(savedUser));

    beforeEach(() => {
        jest.resetAllMocks();
        jest.clearAllMocks();
        
    });

    render(
        <Router>
            <UserContext.Provider value={{ setUser: jest.fn() }}>
                <Profile user={user} />
            </UserContext.Provider>
        </Router>
    )

    afterEach(cleanup);

    
    it("should fetch the logged in user's profile", async () => {
        await waitFor(() => {
            expect(screen.getByText(`${user.username}`)).toBeInTheDocument();
            expect(screen.getByText(`${user.email}`)).toBeInTheDocument();
            expect(screen.getByText(`${user.phone}`)).toBeInTheDocument();
            expect(screen.getByText(`${user.address.zipcode}`)).toBeInTheDocument();
        });
        

    });
    localStorage.removeItem("user");
});
