

// installed --> npm i redux react-redux redux-thunk redux-logger

import React from "react";
import {connect} from 'react-redux';
// import posts from "../reducers/posts";
import {fetchPosts} from '../actions/posts';
import PostsList from "./postsList";
import Navbar from './navbar';
// function App() {
//   return (
//     <div className="App">
//      App
//     </div>
//   );
// }

class App extends React.Component{

  componentDidMount(){
    this.props.dispatch(fetchPosts());
  }

  render(){
    return(
      <div>
     


        <Navbar/>
        <PostsList posts={this.props.posts} />
      </div>
    )
  }
}


function mapStateToProps (state){  // WE AUTOMATICALLY GETS STATE AS ARGUMENT HERE, TO USE THIS STATE TO STORE DATA FROM THIS STATE/REDUX-STORE TO PROPS
     return {
    posts:state.posts
  }  
}

export default connect(mapStateToProps)(App); // CONNECT HAS NESTED FUNCTION FIRST OUTER FUNCTION TAKE mapStateToProps AS PARAMETER AND 2ND INNNER FUNCTION TAKEE App AS PARAMETER