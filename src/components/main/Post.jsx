import React, { useEffect, useState } from 'react';
import { Card, Form, Button } from 'react-bootstrap';

function Post() {

    const [posts, setPosts] = useState([]);
    const [newArticle, setNewArticle] = useState('');
    const [uploadedFile, setUploadedFile] = useState(null);
    const [newArticles, setNewArticles] = useState([]);
    const currentUserId = localStorage.getItem('user') ? Number(JSON.parse(localStorage.getItem('user')).id) : 1; 
    const [userStatus, setUserStatus] = useState('');
    const [tempStatus, setTempStatus] = useState('Users fun status');
    const [tempfollowUser, setTempFollowUser] = useState('');
    const [followUser, setFollowUser] = useState([]);
    const [loading, setLoading] = useState(true);
    const [visibleComments, setVisibleComments] = useState({});

    // const [userList, setuserlist] = useState([]);  

    const userList = JSON.parse(localStorage.getItem('userList') || "[]");
    const [allPosts, setAllPosts] = useState([]);
    // const [currentUser, setCurrentUser] = useState({});

    const currentUser = JSON.parse(localStorage.getItem('user') || "[]");

    const baseTime = Date.now();

    const toggleComments = (id) => {
        setVisibleComments(prev => ({ ...prev, [id]: !prev[id] }));
    }

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            // console.log(file);
            setUploadedFile(file);
        }
    }
    const handleArticalTextChange = (e) => {
        setNewArticle(e.target.value);
    }
    const handleCancel = () => {
        setUploadedFile(null);
        setNewArticle('');

    }

    const userExists = (userId, userList) => {
        return userList.some(user => user.id === userId);
    }
    
    

    useEffect(() => {
        const fetchPostResponse = async() => {
            try {
                const response = await fetch(`https://jsonplaceholder.typicode.com/posts`);
                // const getUserResponse = await axios(`https://jsonplaceholder.typicode.com/users`);
                if (!response || !response.ok) {
                    throw new Error(`HTTP error!`);
                }
                // console.log("response", response.json());
                const rawData = await response.json();
                const data = Array.isArray(rawData) ? rawData : [rawData];
                // console.log("Data",data);

                const allPosts = data.map(post => ({
                    ...post,
                    timestamp: baseTime - post.id * 1000,
                }));

   
                // const currentUser = getUserResponse.data.find(user => user.id === currentUserId);
                // setCurrentUser(currentUser);

                const followedUserIds = followUser.map(f => f.id);
                followedUserIds.push(currentUserId);
   
                const userPosts = allPosts.filter(post => 
                    post.userId === currentUserId || followedUserIds.includes(post.userId)
                );
                const sortedPosts = userPosts.sort((a, b) => b.timestamp - a.timestamp);
                setPosts(sortedPosts);
                setAllPosts(allPosts);
   
                let localUsers = JSON.parse(localStorage.getItem('userList') || "[]");
                // let newUsers = getUserResponse.data.filter(user => !userExists(user.id, localUsers));
                // let combinedUserList = [...localUsers, ...newUsers];
                // setuserlist(combinedUserList);
                setLoading(false);
            }catch(err){
                console.log(err);
            }
        }
        fetchPostResponse();
    }, [followUser])
   

    useEffect(() => {
        let follower = [];
        if (currentUserId === 10) {

            follower = [
                {id: 1, username: getUserNameById(1), status: getUserStatusById(1), img:'img5.jpg', company: {catchPhrase: getUserStatusById(1)}},
                {id: 2, username: getUserNameById(2), status: getUserStatusById(2), img:'img6.jpg',company: {catchPhrase: getUserStatusById(2)}},
                {id: 3, username: getUserNameById(3), status: getUserStatusById(3), img:'img7.jpg',company: {catchPhrase: getUserStatusById(3)}},
            ]

        }
        else if (currentUserId != 11){
            follower = [
                {id: currentUserId + 1, username: getUserNameById(currentUserId + 1), status: getUserStatusById(currentUserId + 1), img:'img5.jpg',company: {catchPhrase: getUserStatusById(currentUserId + 1)}},
                {id: currentUserId + 2, username: getUserNameById(currentUserId + 2), status: getUserStatusById(currentUserId + 2), img:'img6.jpg',company: {catchPhrase: getUserStatusById(currentUserId + 2)}},
                {id: currentUserId + 3, username: getUserNameById(currentUserId + 3), status: getUserStatusById(currentUserId + 3), img:'img7.jpg',company: {catchPhrase: getUserStatusById(currentUserId + 3)}},
            ]
        }
        
        setFollowUser(follower);
    },[]);

    

    const getuserName = (userId) => {
        // console.log("userId", userId);
        const user = userList.find(user => user.id === Number(userId));
        return user ? user.username : 'Unknown';
    }

    
   

    const getUserIdByName = (userName) => {
        // console.log(userName);
        const user = userList.find(user => 
            (user.name && user.name.includes(userName)) || 
            (user.username && user.username.includes(userName))
        );
        return user ? user.id : null;
    }

    const getUserNameById = (userId) => {
        
        const user = userList.find(user => user.id === Number(userId));
        return user ? user.username : 'Unknown';
    }

    const getUserStatusById = (userId) => {
        const user = userList.find(user => user.id === Number(userId));
        return user ? user.company.catchPhrase : 'Unknown';
    }

    

    

    const [searchQuery, setSearchQuery] = useState('');
    const targetUserId = getUserIdByName(searchQuery);

    // console.log("targetUserId",targetUserId);

    
    const filteredPosts = allPosts.filter(post => 
        post && post.body && (post.body.includes(searchQuery) || (targetUserId && targetUserId === post.userId))
    );
        


    const postsToDisplay = searchQuery ? filteredPosts : posts;

    const handlePost = () => {
        const newPost = {
            id: Date.now(), 
            body: newArticle,
            image: uploadedFile,
            timestamp: Date.now()
        };
    
        setNewArticles(prevArticles => [newPost, ...prevArticles]);
    
        setUploadedFile(null);
        setNewArticle('');
    };

    const updateStatus = () => {
        setUserStatus(tempStatus);
        localStorage.setItem('user', JSON.stringify({...currentUser, status: tempStatus, company: {catchPhrase: tempStatus}}));
    }
    
    const handleStatusChange = (e) => {
        setTempStatus(e.target.value);
    }
    
    const handleTempFollowUser = (e) => {
        setTempFollowUser(e.target.value);
    }

    const updateFollowUser = () => {
        const newFollowUser = userList.find(user => user.username === tempfollowUser);
        if(!newFollowUser){
            alert('User not found');
            return;
        }
    
        setFollowUser(prevFriends => [...prevFriends, {id: newFollowUser.id, username: `${newFollowUser.username}`, status: newFollowUser.company.catchPhrase, img:'img1.jpg', company: {catchPhrase: newFollowUser.company.catchPhrase}}])
    }

    const handleUnfollow = (id) => {
        setFollowUser(prevFriends => prevFriends.filter(friend => friend.id !== id))
    }

    // if (loading) { 
    //     return <div>Loading...</div>;
    // }
    return (
        <div className='container-fluid'>
    <div className='row mt-4'>
        <div className="col-md-3 bg-light p-3">

            <div className="my-4 text-center">
                <img src="ValhallaArticle.jpg" alt="User" className="img-fluid mb-2" width="200"/>
                <h5>Username:</h5>{currentUser.username}
            </div>

            <div className="mb-2">User status:</div>
            <div className="mb-3">
                {userStatus ? userStatus : (currentUser && currentUser.company ? currentUser.company.catchPhrase : 'Loading...')}
            </div>

            <input type='text' className="form-control mb-2" placeholder='New Status' onChange={handleStatusChange} />
            <button className="btn btn-primary mb-4" onClick={updateStatus}>Update</button>

            <h6>Friends</h6>
            <ul className="list-unstyled">
                {followUser.map((user, index) => (
                    <li key={index} className="mb-3">
                        <img src={user.img} alt={user.username} className="img-fluid mb-2" width="150"/>
                        <div>Friend: {user.username}</div>
                        <div className="mb-2">{user.company ? user.company.catchPhrase : "status"}</div>
                        <button className="btn btn-secondary btn-sm" onClick={() => handleUnfollow(user.id)}>Unfollow</button>
                    </li>
                ))}
            </ul>

            <div className="mb-4">
                <input type="text" className="form-control mb-2" placeholder="New follow user name" onChange={handleTempFollowUser} value={tempfollowUser} />
                <button className="btn btn-primary" onClick={updateFollowUser}>Add</button>
            </div>
        </div>

        <div className="col-md-9 p-3">

            <Card className="mb-4"> 
                <Card.Body>
                    <Card.Title>Add New Article</Card.Title>
                    <Form>
                        <div className="row">
                            <div className="col-md-4">
                                <Form.Group>
                                    <Form.Label>Upload Image</Form.Label>
                                    <input type="file" className="form-control-file" onChange={handleImageUpload} value={uploadedFile ? undefined : ''}/>
                                </Form.Group>
                            </div>

                            <div className="col-md-8">
                                <Form.Group>
                                    <Form.Control as="textarea" rows={3} placeholder="Type your article here..." onChange={handleArticalTextChange} value={newArticle} />
                                </Form.Group>
                            </div>
                        </div>
                        
                        <Button variant="secondary" className="mr-2" onClick={handleCancel}>Cancel</Button>
                        <Button variant="primary" onClick={handlePost}>Post</Button>
                    </Form>
                </Card.Body>
            </Card>

            <input type="text" className="form-control mb-3" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Search..." />

            {newArticles.map(article => (
                <div key={article.id} className="mb-4">
                    <p>{article.body}</p>
                    {article.image && <img src={URL.createObjectURL(article.image)} alt="Uploaded" className="img-fluid mb-2" width={200} />}
                    <div className="mb-2">{new Date(article.timestamp).toLocaleString()}</div>
                    <div className="mb-2">Author: {getuserName(currentUserId)}</div>
                    <button className="btn btn-secondary btn-sm mr-2">Comment</button>
                    <button className="btn btn-secondary btn-sm">Edit</button>
                </div>
            ))}
            
            {postsToDisplay.map((post, index) => (
                <div key={post.id} className="mb-4">
                    <h3>{post.title}</h3>
                    <p>{post.body}</p>
                    <img src={`img1.jpg`} className="img-fluid mb-2" width={200} />
                    <div className="mb-2">{new Date(post.timestamp).toLocaleString()}</div>
                    <div className="mb-2">Author: {getuserName(post.userId)}</div>
                    <button className="btn btn-secondary btn-sm mr-2">Comment</button>
                    <button className="btn btn-secondary btn-sm mr-2" onClick={() => toggleComments(post.id)}>
                        {visibleComments[post.id] ? 'Hide Comments' : 'Show Comments'}
                    </button>
                    <button className="btn btn-secondary btn-sm">Edit</button>

                    {visibleComments[post.id] && (
                        <div className="mt-3">
                            <h5>Comments:</h5>
                            <ul>
                            
                                    <li key={index}>test comment</li>
                                    <li key={index}>test comment</li>
                                    <li key={index}>test comment</li>
                                    <li key={index}>test comment</li>

                            </ul>
                        </div>
                    )}

                </div>
            ))}
        </div>
    </div>
</div>

    )



}
export default Post;