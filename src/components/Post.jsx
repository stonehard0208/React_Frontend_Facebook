import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { Card, Form, Button } from 'react-bootstrap';

function Post() {

    const [posts, setPosts] = useState([]);
    const [newArticle, setNewArticle] = useState('');
    const [uploadedFile, setUploadedFile] = useState(null);
    const [newArticles, setNewArticles] = useState([]);
    const currentUserId = localStorage.getItem('userId') || 1;
    const [userStatus, setUserStatus] = useState('Users fun status');
    const [tempStatus, setTempStatus] = useState('Users fun status');
    const [tempfollowUser, setTempFollowUser] = useState('');
    const [followUser, setFollowUser] = useState([
        {id: 2, name: 'Friend 2', status: 'A fun status!', img:'img5.jpg'},
        {id: 3, name: 'Friend 3', status: 'A fun status!', img:'img6.jpg'},
        {id: 4, name: 'Friend 4', status: 'A fun status!', img:'img7.jpg'},
    ]);
    const [userList, setuserlist] = useState([]);  
    const [allPosts, setAllPosts] = useState([]);

    const baseTime = Date.now();

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            console.log(file);
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
    

    useEffect(() => {
        const fetchPostResponse = async() => {
            try {
                const response = await axios(`https://jsonplaceholder.typicode.com/posts`);
                const getUserResponse = await axios(`https://jsonplaceholder.typicode.com/users`);

                const allPosts = response.data.map(post => {
                    return{
                        ...post,
                        timestamp: baseTime - post.id * 1000,
                    };
                });
                
                const userPosts = allPosts.filter(post => post.userId === currentUserId);


                // console.log(response.data)
                const sortedPosts = userPosts.sort((a, b) => b.timestamp - a.timestamp);
                setPosts(sortedPosts);

                setAllPosts(allPosts);

                setuserlist(getUserResponse.data);
                console.log(userList)
                
            }catch(err){
                console.log(err);
            }
        }

        fetchPostResponse();
    }, [])

    const getuserName = (userId) => {
        console.log(userId);
        const user = userList.find(user => user.id === userId);
        return user ? user.name : 'Unknown';
    }

    const getUserIdByName = (userName) => {
        console.log(userName);
        const user = userList.find(user => user.name.includes(userName));
        return user ? user.id : null;
    }

    

    const [searchQuery, setSearchQuery] = useState('');
    const targetUserId = getUserIdByName(searchQuery);

    console.log(targetUserId);

    
    const filteredPosts = allPosts.filter(post => 
        post.body.includes(searchQuery) || targetUserId && targetUserId === post.userId);

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
    }
    
    const handleStatusChange = (e) => {
        setTempStatus(e.target.value);
    }
    
    const handleTempFollowUser = (e) => {
        setTempFollowUser(e.target.value);
    }

    const updateFollowUser = () => {
        setFollowUser(prevFriends => [...prevFriends, {id: tempfollowUser, name: `Friend ${tempfollowUser}`, status: 'A fun status!', img:'img1.jpg'}])
    }

    const handleUnfollow = (id) => {
        setFollowUser(prevFriends => prevFriends.filter(friend => friend.id !== id))
    }

    

    


    return (
        <div className='container-fluid'>
            <div className='row'>
            <div className="col-md-3 bg-light">
               
                <div className="my-4">
                    <img src="img4.jpg" alt="User" width="200"/>
                    <h5>Username:</h5>{currentUserId}
                </div>

                <div>User status:</div>
                <div>{userStatus}</div>
                <input type='text' placeholder='New Status' onChange={handleStatusChange}></input>
                <button onClick={updateStatus}>Update</button>

                <h6>Friends</h6>
                <ul>
                   {followUser.map((user, index) => (
                    <li key = {index}>
                        <img src={user.img} alt={user.name} width="150"/>
                        {user.name}
                        <div>{user.status}</div>
                        <button onClick={() => handleUnfollow(user.id)}>Unfollow</button>
                    </li>
                   ))}
                </ul>

                <div>
                    <input type="text" placeholder="User" onChange={handleTempFollowUser} value={tempfollowUser}></input>
                    <button onClick={updateFollowUser}>Add</button>
                </div>
            </div>

            <div className="col-md-9">
            <Card> 
                <Card.Body>
                    <Card.Title>Add New Article</Card.Title>
                    <Form>
                        <div className="row">
                            <div className="col-md-4">
                                <Form.Group>
                                    <Form.Label>Upload Image</Form.Label>
                                    <input type="file" onChange={handleImageUpload} value = {uploadedFile ? undefined: ''}/>
                                </Form.Group>
                            </div>


                            <div className="col-md-8">
                                <Form.Group>
                                    <Form.Control as="textarea" onChange = {handleArticalTextChange} rows={3} placeholder="Type your article here..." value = {newArticle}/>
                                </Form.Group>
                            </div>
                        </div>
                        
                        <Button variant="secondary" className="mr-2" onClick={handleCancel}>Cancel</Button>
                        <Button variant="primary" onClick={handlePost}>Post</Button>
                    </Form>
                </Card.Body>
            </Card>
            
            



            <input type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Search..." />

            {newArticles.map(article => (
                <div key={article.id}>
                    <p>{article.body}</p>
                    {article.image && <img src={URL.createObjectURL(article.image)} alt="Uploaded" width={200} />}
                    <div>{new Date(article.timestamp).toLocaleString()}</div>
                    <div>Author: {getuserName(currentUserId)}</div>
                    <button>Comment</button>
                    <button>Edit</button>
                </div>
            ))}
            
            {postsToDisplay.map((post, index) => (
                
                <div key={post.id}>
                    <h3>{post.title}</h3>
                    <p>{post.body}</p>
                    {post.id < 4 && <img src={`img${post.id}.jpg`} width={200}></img>}
                    <div>{new Date(post.timestamp).toLocaleString()}</div>
                    <div>Author: {getuserName(post.userId)}</div>
                    <button>Comment</button>
                    <button>Edit</button>
                </div>
))}
            </div>
            </div>
             
            

        </div>
    )



}
export default Post;