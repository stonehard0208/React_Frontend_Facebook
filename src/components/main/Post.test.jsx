import React from 'react';
import { render, screen, fireEvent, act, waitForElementToBeRemoved, waitFor, cleanup, within } from '@testing-library/react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from './Main';
import UserContext from '../auth/UserContext';
import Login from '../auth/Login';
import Post from './Post';
import '@testing-library/jest-dom'
import { userList } from '../../../UserList';
import { mockPosts_1,mockPosts_2,mockPosts_3,mockPosts_4,mockPosts_5,mockPosts_6,mockPosts_7,mockPosts_8,mockPosts_9,mockPosts_10 } from '../../../PostList';


global.alert = jest.fn();

const mockedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate:() => mockedNavigate
}));


describe("Validate Article actions: show posts from current user and followed users", () => {

    beforeEach(() => {
        localStorage.clear();

    })

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("user1: should fetch all articles for current logged in user (posts state is set)", async() => {
        localStorage.setItem('user', JSON.stringify(userList[0]));

        render(
            <Router>
                <UserContext.Provider value={{ setUser: jest.fn() }}>
                    <Main user={[userList[0]]} />
                </UserContext.Provider>
            </Router>
        )
        const mockPosts = mockPosts_1.concat(mockPosts_2, mockPosts_3, mockPosts_4);
        mockPosts.forEach(post => {
            const normalizedTitle = post.title.replace(/\n/g, ' ');
            const normalizedBody = post.body.replace(/\n/g, ' ');
            waitFor(() => {
                const postTitleElements = screen.getByText(normalizedTitle);
                expect(postTitleElements).toBeInTheDocument();
                const postBodyElements = screen.getByText(normalizedBody);
                expect(postBodyElements).toBeInTheDocument();
            })
        });
        cleanup();
        
    })

    
});


describe("Validate Article actions: show posts by search query", () => {

    it("search by author name", async() => {
        localStorage.setItem('user', JSON.stringify(userList[0]));

        render(
            <Router>
                <UserContext.Provider value={{ setUser: jest.fn() }}>
                    <Main user={[userList[0]]} />
                </UserContext.Provider>
            </Router>
        )
        const searchInput = screen.getByPlaceholderText('Search...');
        const searchAuthorName = "Moriah.Stanton";
        const searchAuthorId = 10;
        const postsByAuthor = mockPosts_10;

        const notShownMockPosts = mockPosts_1.concat(mockPosts_2, mockPosts_3, mockPosts_4,mockPosts_5,mockPosts_6,mockPosts_7,mockPosts_8,mockPosts_9);
        fireEvent.change(searchInput, { target: { value: searchAuthorName } });

        postsByAuthor.forEach(post => {
            const normalizedTitle = post.title.replace(/\n/g, ' ');
            const normalizedBody = post.body.replace(/\n/g, ' ');
            waitFor(() => {
                const postTitleElements = screen.getByText(normalizedTitle);
                expect(postTitleElements).toBeInTheDocument();
                const postBodyElements = screen.getByText(normalizedBody);
                expect(postBodyElements).toBeInTheDocument();
            })
        });

        notShownMockPosts.forEach(post => {
            const normalizedTitle = post.title.replace(/\n/g, ' ');
            const normalizedBody = post.body.replace(/\n/g, ' ');
            waitFor(() => {
                const postTitleElements = screen.getByText(normalizedTitle);
                expect(postTitleElements).not.toBeInTheDocument();
                const postBodyElements = screen.getByText(normalizedBody);
                expect(postBodyElements).not.toBeInTheDocument();
            })
        });


        cleanup();
        
    })


    it("search by post title", async() => {
        localStorage.setItem('user', JSON.stringify(userList[9]));

        render(
            <Router>
                <UserContext.Provider value={{ setUser: jest.fn() }}>
                    <Main user={[userList[9]]} />
                </UserContext.Provider>
            </Router>
        )
        const searchInput = screen.getByPlaceholderText('Search...');
        const searchPostTitle = "non";
        const allPosts = mockPosts_1.concat(mockPosts_2, mockPosts_3, mockPosts_4,mockPosts_5,mockPosts_6,mockPosts_7,mockPosts_8,mockPosts_9, mockPosts_10);
        const postsByTitle = allPosts.filter(post => post.title.includes(searchPostTitle));

        const notShownMockPosts = allPosts.filter(post => !post.title.includes(searchPostTitle));
        
        fireEvent.change(searchInput, { target: { value: searchPostTitle } });

        postsByTitle.forEach(post => {
            const normalizedTitle = post.title.replace(/\n/g, ' ');
            const normalizedBody = post.body.replace(/\n/g, ' ');
            waitFor(() => {
                const postTitleElements = screen.getByText(normalizedTitle);
                expect(postTitleElements).toBeInTheDocument();
                const postBodyElements = screen.getByText(normalizedBody);
                expect(postBodyElements).toBeInTheDocument();
            })
        });

        notShownMockPosts.forEach(post => {
            const normalizedTitle = post.title.replace(/\n/g, ' ');
            const normalizedBody = post.body.replace(/\n/g, ' ');
            waitFor(() => {
                const postTitleElements = screen.getByText(normalizedTitle);
                expect(postTitleElements).not.toBeInTheDocument();
                const postBodyElements = screen.getByText(normalizedBody);
                expect(postBodyElements).not.toBeInTheDocument();
            })
        });


        cleanup();
        
    })

}, 100000);

describe("Validate Article actions: add followers", () => {
    beforeEach(() => {
        localStorage.clear();

    })

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should add articles when adding a follower (posts state is larger )", async() => {
        localStorage.setItem('user', JSON.stringify(userList[0]));
        localStorage.setItem('userList', JSON.stringify(userList));


        render(
            <Router>
                <UserContext.Provider value={{ setUser: jest.fn() }}>
                    <Main user={[userList[0]]} />
                </UserContext.Provider>
            </Router>
        )

        const followInput = screen.getByPlaceholderText('New follow user name');
        const followButton = screen.getByText('Add');
        const followName = "Moriah.Stanton";


        await Promise.all(
            mockPosts_10.map(async post => {
                const normalizedTitle = post.title.replace(/\n/g, ' ');
                const normalizedBody = post.body.replace(/\n/g, ' ');

            
                const postTitleElements = screen.queryByText(normalizedTitle);
                expect(postTitleElements).not.toBeInTheDocument();
    
                const postBodyElements = screen.queryByText(normalizedBody);
                expect(postBodyElements).not.toBeInTheDocument();
                
            })
        );

       
        fireEvent.change(followInput, { target: { value: followName } });
        fireEvent.click(followButton);

       
        await waitFor(() => {
            mockPosts_10.map(async post => {
                const normalizedTitle = post.title.replace(/\n/g, ' ');
                const normalizedBody = post.body.replace(/\n/g, ' ');

                await waitFor(() => {
                    const postTitleElements = screen.getByText(normalizedTitle);
                    expect(postTitleElements).toBeInTheDocument();
                    const postBodyElements = screen.findByText(normalizedBody);
                    expect(postBodyElements).toBeInTheDocument();
                });
                
                
            })
        }
            
        );

    });
});


describe("Validate Article actions: remove followers", () => {
    beforeEach(() => {
        localStorage.clear();

    })

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should remove articles when removing a follower (posts state is smaller)", async() => {
        localStorage.setItem('user', JSON.stringify(userList[0]));
        localStorage.setItem('userList', JSON.stringify(userList));


        render(
            <Router>
                <UserContext.Provider value={{ setUser: jest.fn() }}>
                    <Main user={[userList[0]]} />
                </UserContext.Provider>
            </Router>
        )

        
        const unfollowUser = screen.getByText(`Friend: ${userList[1].username}`);
        const parentListItem = unfollowUser.closest('li');
        const unfollowButton = within(parentListItem).getByText('Unfollow');
        fireEvent.click(unfollowButton);


        await Promise.all(
            mockPosts_2.map(async post => {
                const normalizedTitle = post.title.replace(/\n/g, ' ');
                const normalizedBody = post.body.replace(/\n/g, ' ');

                await waitFor(() => {
                    const postTitleElements = screen.queryByText(normalizedTitle);
                    expect(postTitleElements).not.toBeInTheDocument();
        
                    const postBodyElements = screen.queryByText(normalizedBody);
                    expect(postBodyElements).not.toBeInTheDocument();
                });

            
                
                
            })
        );


    });
});

