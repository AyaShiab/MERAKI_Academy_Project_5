import { createSlice } from "@reduxjs/toolkit";

export const posts = createSlice({
  name: "posts",

  initialState: {
    posts: [],
    likes: [],
    homePosts: [],
  },
  reducers: {
    setPosts: (state, action) => {
      state.posts = action.payload;
      //   state.articles.map((elem)=>{
      //     console.log("SETArticles",elem)
      //   })
    },
    addpost: (state, action) => {
      state.posts.push(action.payload);
      //   state.articles.map((elem)=>{
      //     console.log("ADDArticles",elem)
      //   })
    },
    updatePost: (state, action) => {
      state.posts.map((elem, i) => {
        if (elem.post_id == action.payload.updatedpost.post_id) {
          return state.posts.splice(i, 1, action.payload.updatedpost);
        }
        return elem;
        //dont forget return please
      });
    },
    removePost: (state, action) => {
      state.posts.forEach((elem, idx) => {
        if (elem.post_id === action.payload) {
          state.posts.splice(idx, 1);
        }
      });
      
    },
    setComments: (state, action) => {
      // state.articles = action.payload.comments;
      console.log(state.posts);
      state.posts.map((elem, i) => {
        if (elem.post_id === action.payload.id) {
          elem.comments = action.payload.comments;
        }
      });
      console.log("*****************", state.posts);
    },
    addComment: (state, action) => {
      console.log(action.payload);
      state.posts.map((elem, i) => {
        if (elem.post_id === action.payload.id) {
          elem.comments.push(action.payload.newComment);
        }
      });
    },


    removeComment: (state, action) => {
      console.log(action.payload);
      state.posts.forEach((elem, idx) => {
        console.log(elem);
        let found = state.posts.find((elem) => {
       return elem.post_id === action.payload.post_id;
        });
        console.log("found",found)
        if (elem.comment_id === action.payload) {
          state.posts.comments.splice(idx, 1);
        }
      });
    },
<<<<<<< HEAD
    
=======

>>>>>>> ddc7af66d88ab6b9ba05a8e6385df0ee549daa7e
    setLike: (state, action) => {
      state.likes = [action.payload];

    },

    addLike: (state, action) => {
      state.likes.push(action.payload);
    },

    removeLike: (state, action) => {
      state.likes = state.likes.filter((elem) => {
        return elem.post_id !== action.payload;
      });
    },

    setHomePosts: (state, action) => {
      console.log(action.payload);
      state.homePosts = action.payload;
    },
  },
});
export const {
  setPosts,
  addpost,
  updatePost,
  removePost,
  setComments,
  addComment,
  addLike,
  setLike,

  updateComment,
  removeComment,
  removeLike,
  setHomePosts,
} = posts.actions;

export default posts.reducer;
