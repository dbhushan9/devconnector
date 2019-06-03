import axios from 'axios';

import {ADD_POST, GET_ERRORS, POST_LOADING,GET_POST, GET_POSTS,DELETE_POST} from './types';

//Add POST
export const addPost = postData => dispatch =>{
    axios
    .post('/api/posts',postData)
    .then(res=>
        dispatch({
            type: ADD_POST,
            payload: res.data
        }) 
    )
    .catch(err =>
        dispatch({
            type:GET_ERRORS,
            payload: err.response.data
        })    
    )
}

//Get POSTS
export const getPosts = () => dispatch =>{
    dispatch(setPostLoadingState());
    axios
    .get('/api/posts')
    .then(res=>
        dispatch({
            type: GET_POSTS,
            payload: res.data
        }) 
    )
    .catch(err =>
        dispatch({
            type:GET_POSTS,
            payload: null
        })    
    )
}

//Get POST
export const getPost = (id) => dispatch =>{
    dispatch(setPostLoadingState());
    axios
    .get(`/api/posts/${id}`)
    .then(res=>
        dispatch({
            type: GET_POST,
            payload: res.data
        }) 
    )
    .catch(err =>
        dispatch({
            type:GET_POST,
            payload: null
        })    
    )
}
//DeletePost
export const deletePost = id => dispatch =>{
    axios
    .delete(`/api/posts/${id}`)
    .then(res=>
        dispatch({
            type: DELETE_POST,
            payload: id
        }) 
    )
    .catch(err =>
        dispatch({
            type:GET_ERRORS,
            payload: err.response.data
        })    
    )
}

//Add Like
export const addLike = id => dispatch =>{
    axios
    .post(`/api/posts/like/${id}`)
    .then( res=>dispatch( getPosts() ) )
    .catch(err =>
        dispatch({
            type:GET_ERRORS,
            payload: err.response.data
        })    
    )
}

//Remove Like
export const removeLike = id => dispatch =>{
    axios
    .post(`/api/posts/unlike/${id}`)
    .then( res=>dispatch( getPosts() ) )
    .catch(err =>
        dispatch({
            type:GET_ERRORS,
            payload: err.response.data
        })    
    )
}


//Add Comment
export const addComment = (postId, commentData) => dispatch =>{
    axios
    .post(`/api/posts/comment/${postId}`,commentData)
    .then(res=>
        dispatch({
            type: GET_POST,
            payload: res.data
        }) 
    )
    .catch(err =>
        dispatch({
            type:GET_ERRORS,
            payload: err.response.data
        })    
    )
}


//set Loading state
export const setPostLoadingState = () =>{
    return {
        type: POST_LOADING
    }
}