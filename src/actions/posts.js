import { APIUrls } from '../helpers/urls';
import {ADD_POST, UPDATE_POSTS} from './actionTypes';
import { getAuthTokenFromLocalStorage, getFormBody } from '../helpers/utils';

export function fetchPosts(){
    return (dispatch) => {
        // const url = "https://baconipsum.com/api/?callback=?";
        // const url = 'http://codeial.com:8000/api/v2/posts?page=1&limit=5'; // NOT WORKING
        // const url = 'http://codeial.codingninjas.com:8000/api/v2/posts?page=1&limit=5'  // WORKING
        const url = APIUrls.fetchPostsURL();
        fetch(url).then((response) => {
            // console.log(response); // NOT JSON OBJECT
            return response.json();
        }).then((data) => {
            console.log("data ", data);
            dispatch(update_posts(data.data.posts));
        })
    }
}


export function update_posts(posts){
    return {
        type:UPDATE_POSTS,  // INSTEAD OF TAKING IT AS STRING DIRECTLY OVER HERE , WE STORE IT IN A VARIABLE IN ACTIONTYPES AND USE THIS  VARIABLE OVER HERE, SINCE EASY TO CHANGE IN FUTURE
        posts
    }
}

export function addPost(post){
    return{
        type:ADD_POST,
        post
    }
}

export function createPost(content){  // NEW POST IS STORED IN DATABASE BY API, BUT WE ARE JUST STORING IT IN DATABSE BY API , NOT FECHING ALL POSTS AGAIN BY API (SINCE FROM API WE GET RANDOM POSTS, MAY OR MAY NOT GET OUR RECENTLY CREATED POSTS), HENCE WE ABLE TO SEE OUR RECENTLY POSTED POST BY STORIG AND GETTIG FROM REDUX STORE, SINCE WE ARE STORING EVERYTHING IN STORE AFTER FETCHING THROUGH API!
    return (dispatch) => {
        const url =  APIUrls.createPost();

        fetch(url,{
            method:'POST',
            headers:{
                'Content-Type':'application/x-www-form-urlencoded',
                 Authorization:`Bearer ${getAuthTokenFromLocalStorage()}`,

            }, 
            body:getFormBody({content})
          })
          .then((response) => response.json())
          .then((data) =>  {
            if(data.success){
                dispatch(addPost(data.data.post));
            }
        })
    }
}