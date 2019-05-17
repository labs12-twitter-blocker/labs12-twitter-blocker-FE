import axios from "axios";
require('dotenv').config();


const url = process.env.REACT_APP_BACKEND_BASE_URL;

//<------GET HELLO------>

export const GET_HELLO = "GET_HELLO";
export const GET_HELLO_SUCCESS = "GET_HELLO_SUCCESS";
export const GET_HELLO_FAILURE = "GET_HELLO_FAILURE";

export const getHello = () => dispatch => {
  dispatch({ type: GET_HELLO });
  axios
    .get(`${url}`)
    .then(res => {
      console.log(res)
      dispatch({ type: GET_HELLO_SUCCESS, payload: res.data });
    })
    .catch(err => {
      console.log(err);
      dispatch({ type: GET_HELLO_FAILURE, payload: err.message });
    });
};

//<------LOGIN ACTIONS------->

export const GET_LOGIN = "GET_LOGIN";
export const GET_LOGIN_SUCCESS = "GET_LOGIN_SUCCESS";
export const GET_LOGIN_FAILURE = "GET_LOGIN_FAILURE";

export const getLogin = (response) => dispatch => {
  dispatch({ type: GET_LOGIN });
  const token = response.headers.get('x-auth-token');

  console.log("*************token: ", token)

  response.json()
    .then(user => {
      console.log("DISPATCH USER: _________________________________________________________________________________________________", user)
      console.log(user._json.profile_image_url_https)
      if (token) {
        localStorage.setItem("twitter_user_id", user.id)
        localStorage.setItem("token", token)
        localStorage.setItem("username", user.username)
        localStorage.setItem("displayName", user.displayName)
        localStorage.setItem("profile_img", user._json.profile_image_url_https)
        localStorage.setItem("banner_img", user._json.profile_banner_url)

        dispatch({ type: GET_LOGIN_SUCCESS, payload: user })
        // this.setState({isAuthenticated: true, user: user, token: token});
      }
    });
};
// export const getLogin = () => dispatch => {
//   dispatch({ type: GET_LOGIN });
//   axios
//     .get(`${url}/auth/twitter/login/success`)
//     .then(res => {
//       console.log(res)
//       dispatch({ type: GET_LOGIN_SUCCESS, payload: res.data });
//     })
//     .catch(err => {
//       console.log(err);
//       dispatch({ type: GET_LOGIN_FAILURE, payload: err.message });
//     });
// };


//<------USERS------->

// Requests the entire users array

export const GET_USERS = "GET_USERS";
export const GET_USERS_SUCCESS = "GET_USERS_SUCCESS";
export const GET_USERS_FAILURE = "GET_USERS_FAILURE";

export const getUsers = () => dispatch => {
  dispatch({ type: GET_USERS });
  axios
    .get(`${url}/users`)
    .then(res => {
      console.log(res);
      dispatch({ type: GET_USERS_SUCCESS, payload: res.data });
    })
    .catch(err => {
      console.log(err);
      dispatch({ type: GET_USERS_FAILURE, payload: err.message });
    });
};


// Requests the Users by user ID

export const GET_USER = "GET_USER";
export const GET_USER_SUCCESS = "GET_USER_SUCCESS";
export const GET_USER_FAILURE = "GET_USER_FAILURE";

export const getUser = user_id => dispatch => {
  dispatch({ type: GET_USER });
  axios
    .get(`${url}/users/${user_id}`)
    .then(res => {
      console.log(res);
      dispatch({ type: GET_USER_SUCCESS, payload: res.data });
    })
    .catch(err => {
      console.log(err);
      dispatch({ type: GET_USER_FAILURE, payload: err.message });
    });
};


// Requests the Users Ordered By Number of Points

export const GET_USERS_POINTS = "GET_USERS_POINTS";
export const GET_USERS_POINTS_SUCCESS = "GET_USERS_POINTS_SUCCESS";
export const GET_USERS_POINTS_FAILURE = "GET_USERS_POINTS_FAILURE";

export const getUsersPoints = () => dispatch => {
  dispatch({ type: GET_USERS_POINTS });
  axios
    .get(`${url}/users/points`)
    .then(res => {
      console.log(res);
      dispatch({ type: GET_USERS_POINTS_SUCCESS, payload: res.data });
    })
    .catch(err => {
      console.log(err);
      dispatch({ type: GET_USERS_POINTS_FAILURE, payload: err.message });
    });
};


// Requests the entire Premium users array

export const GET_PREMIUM_USERS = "GET_PREMIUM_USERS";
export const GET_PREMIUM_USERS_SUCCESS = "GET_PREMIUM_USERS_SUCCESS";
export const GET_PREMIUM_USERS_FAILURE = "GET_PREMIUM_USERS_FAILURE";

export const getPremiumUsers = () => dispatch => {
  dispatch({ type: GET_PREMIUM_USERS });
  axios
    .get(`${url}/users/premium`)
    .then(res => {
      console.log(res);
      dispatch({ type: GET_PREMIUM_USERS_SUCCESS, payload: res.data });
    })
    .catch(err => {
      console.log(err);
      dispatch({ type: GET_PREMIUM_USERS_FAILURE, payload: err.message });
    });
};


// Requests a specific user by id --> Similar to Get User above /users/:user_id
// export const GET_USER = "GET_USER";
// export const GET_USER_SUCCESS = "GET_USER_SUCCESS";
// export const GET_USER_FAILURE = "GET_USER_FAILURE";

// export const getUser = user_id => dispatch => {
//     dispatch({ type: GET_USER });
//     axios
//       .get(`${url}/${user_id}`)
//       .then(res => {
//         console.log(res);
//         dispatch({ type: GET_USER_SUCCESS, payload: res.data });
//       })
//       .catch(err => {
//         console.log(err);
//         dispatch({ type: GET_USER_FAILURE, payload: err.message });
//       });
//   };


// Add a new User
export const ADD_USER = "ADD_USER";
export const ADD_USER_SUCCESS = "ADD_USER_SUCCESS";
export const ADD_USER_FAILURE = "ADD_USER_FAILURE";

export const addUser = user => dispatch => {
  dispatch({ type: ADD_USER });
  axios
    .post(`${url}/users`, user)
    .then(res => {
      console.log(res);
      dispatch({ type: ADD_USER_SUCCESS, payload: res.data });
    })
    .catch(err => {
      console.log(err);
      dispatch({ type: ADD_USER_FAILURE, payload: err.message });
    });
};


// Edit a User
export const EDIT_USER = "EDIT_USER";
export const EDIT_USER_SUCCESS = "EDIT_USER_SUCCESS";
export const EDIT_USER_FAILURE = "EDIT_USER_FAILURE";

export const editUser = profile => dispatch => {
  dispatch({ type: EDIT_USER });
  axios
    .put(`${url}/users/${profile.user_id}`, profile)
    .then(res => {
      dispatch({ type: EDIT_USER_SUCCESS, payload: res.data });
    })
    .catch(err => {
      dispatch({ type: EDIT_USER_FAILURE, payload: err.message });
    });
};

// Delete a User
export const DELETE_USER = "DELETE_USER";
export const DELETE_USER_SUCCESS = "DELETE_USER_SUCCESS";
export const DELETE_USER_FAILURE = "DELETE_USER_FAILURE";

export const deleteUser = user_id => dispatch => {
  dispatch({ type: DELETE_USER });
  axios
    .delete(`${url}/users/${user_id}`)
    .then(res => {
      console.log(res);
      dispatch({ type: DELETE_USER_SUCCESS, payload: res.data });
    })
    .catch(err => {
      console.log(err);
      dispatch({ type: DELETE_USER_FAILURE, payload: err.message });
    });
};


//<------LISTS------->

//Getting ALL Lists
export const GET_LISTS = "GET_LISTS";
export const GET_LISTS_SUCCESS = "GET_LISTS_SUCCESS";
export const GET_LISTS_FAILURE = "GET_LISTS_FAILURE";

export const getLists = () => dispatch => {
  dispatch({ type: GET_LISTS });
  axios
    .get(`${url}/lists`)
    .then(res => {
      console.log(res);
      dispatch({ type: GET_LISTS_SUCCESS, payload: res.data });
    })
    .catch(err => {
      console.log(err);
      dispatch({ type: GET_LISTS_FAILURE, payload: err.message });
    });
};

//Getting Public Lists
export const GET_PUBLIC_LISTS = "GET_PUBLIC_LISTS";
export const GET_PUBLIC_LISTS_SUCCESS = "GET_PUBLIC_LISTS_SUCCESS";
export const GET_PUBLIC_LISTS_FAILURE = "GET_PUBLIC_LISTS_FAILURE";

export const getPublicLists = () => dispatch => {
  dispatch({ type: GET_PUBLIC_LISTS });
  axios
    .get(`${url}/lists/public`)
    .then(res => {
      console.log(res);
      dispatch({ type: GET_PUBLIC_LISTS_SUCCESS, payload: res.data });
    })
    .catch(err => {
      console.log(err);
      dispatch({ type: GET_PUBLIC_LISTS_FAILURE, payload: err.message });
    });
};

//Getting Private Lists
export const GET_PRIVATE_LISTS = "GET_PRIVATE_LISTS";
export const GET_PRIVATE_LISTS_SUCCESS = "GET_PRIVATE_LISTS_SUCCESS";
export const GET_PRIVATE_LISTS_FAILURE = "GET_PRIVATE_LISTS_FAILURE";

export const getPrivateLists = () => dispatch => {
  dispatch({ type: GET_PRIVATE_LISTS });
  axios
    .get(`${url}/lists/private`)
    .then(res => {
      console.log(res);
      dispatch({ type: GET_PRIVATE_LISTS_SUCCESS, payload: res.data });
    })
    .catch(err => {
      console.log(err);
      dispatch({ type: GET_PRIVATE_LISTS_FAILURE, payload: err.message });
    });
};

//Getting Block Lists
export const GET_BLOCK_LISTS = "GET_BLOCK_LISTS";
export const GET_BLOCK_LISTS_SUCCESS = "GET_BLOCK_LISTS_SUCCESS";
export const GET_BLOCK_LISTS_FAILURE = "GET_BLOCK_LISTS_FAILURE";

export const getBlockLists = () => dispatch => {
  dispatch({ type: GET_BLOCK_LISTS });
  axios
    .get(`${url}/lists/block`)
    .then(res => {
      console.log(res);
      dispatch({ type: GET_BLOCK_LISTS_SUCCESS, payload: res.data });
    })
    .catch(err => {
      console.log(err);
      dispatch({ type: GET_BLOCK_LISTS_FAILURE, payload: err.message });
    });
};

//Getting Cool Lists
export const GET_COOL_LISTS = "GET_COOL_LISTS";
export const GET_COOL_LISTS_SUCCESS = "GET_COOL_LISTS_SUCCESS";
export const GET_COOL_LISTS_FAILURE = "GET_COOL_LISTS_FAILURE";

export const getCoolLists = () => dispatch => {
  dispatch({ type: GET_COOL_LISTS });
  axios
    .get(`${url}/lists/cool`)
    .then(res => {
      console.log(res);
      dispatch({ type: GET_COOL_LISTS_SUCCESS, payload: res.data });
    })
    .catch(err => {
      console.log(err);
      dispatch({ type: GET_COOL_LISTS_FAILURE, payload: err.message });
    });
};


// Requests a specific List
export const GET_LIST = "GET_LIST";
export const GET_LIST_SUCCESS = "GET_LIST_SUCCESS";
export const GET_LIST_FAILURE = "GET_LIST_FAILURE";

export const getList = list_id => dispatch => {
  dispatch({ type: GET_LIST });
  axios
    .get(`${url}/lists/${list_id}`)
    .then(res => {
      console.log(res);
      dispatch({ type: GET_LIST_SUCCESS, payload: res.data });
    })
    .catch(err => {
      console.log(err);
      dispatch({ type: GET_LIST_FAILURE, payload: err.message });
    });
};

// Requests a User's Lists
export const GET_USER_LISTS = "GET_USER_LISTS";
export const GET_USER_LISTS_SUCCESS = "GET_USER_LISTS_SUCCESS";
export const GET_USER_LISTS_FAILURE = "GET_USER_LISTS_FAILURE";

export const getUserList = user_id => dispatch => {
  dispatch({ type: GET_USER_LISTS });
  axios
    .get(`${url}/lists/creator/${user_id}`)
    .then(res => {
      console.log(res);
      dispatch({ type: GET_USER_LISTS_SUCCESS, payload: res.data });
    })
    .catch(err => {
      console.log(err);
      dispatch({ type: GET_USER_LISTS_FAILURE, payload: err.message });
    });
};

// Requests a User's Public Lists
export const GET_USER_PUBLIC_LISTS = "GET_USER_PUBLIC_LISTS";
export const GET_USER_PUBLIC_LISTS_SUCCESS = "GET_USER_PUBLIC_LISTS_SUCCESS";
export const GET_USER_PUBLIC_LISTS_FAILURE = "GET_USER_PUBLIC_LISTS_FAILURE";

export const getUserPublicList = user_id => dispatch => {
  dispatch({ type: GET_USER_PUBLIC_LISTS });
  axios
    .get(`${url}/lists/creator/public/${user_id}`)
    .then(res => {
      console.log(res);
      dispatch({ type: GET_USER_PUBLIC_LISTS_SUCCESS, payload: res.data });
    })
    .catch(err => {
      console.log(err);
      dispatch({ type: GET_USER_PUBLIC_LISTS_FAILURE, payload: err.message });
    });
};

// Requests a User's Private Lists
export const GET_USER_PRIVATE_LISTS = "GET_USER_PRIVATE_LISTS";
export const GET_USER_PRIVATE_LISTS_SUCCESS = "GET_USER_PRIVATE_LISTS_SUCCESS";
export const GET_USER_PRIVATE_LISTS_FAILURE = "GET_USER_PRIVATE_LISTS_FAILURE";

export const getUserPrivateList = user_id => dispatch => {
  dispatch({ type: GET_USER_PRIVATE_LISTS });
  axios
    .get(`${url}/lists/creator/private/${user_id}`)
    .then(res => {
      console.log(res);
      dispatch({ type: GET_USER_PRIVATE_LISTS_SUCCESS, payload: res.data });
    })
    .catch(err => {
      console.log(err);
      dispatch({ type: GET_USER_PRIVATE_LISTS_FAILURE, payload: err.message });
    });
};

// Requests a User's Block Lists
export const GET_USER_BLOCK_LISTS = "GET_USER_BLOCK_LISTS";
export const GET_USER_BLOCK_LISTS_SUCCESS = "GET_USER_BLOCK_LISTS_SUCCESS";
export const GET_USER_BLOCK_LISTS_FAILURE = "GET_USER_BLOCK_LISTS_FAILURE";

export const getUserBlockList = user_id => dispatch => {
  dispatch({ type: GET_USER_BLOCK_LISTS });
  axios
    .get(`${url}/lists/creator/block/${user_id}`)
    .then(res => {
      console.log(res);
      dispatch({ type: GET_USER_BLOCK_LISTS_SUCCESS, payload: res.data });
    })
    .catch(err => {
      console.log(err);
      dispatch({ type: GET_USER_BLOCK_LISTS_FAILURE, payload: err.message });
    });
};

// Requests a User's Cool Lists
export const GET_USER_COOL_LISTS = "GET_USER_COOL_LISTS";
export const GET_USER_COOL_LISTS_SUCCESS = "GET_USER_COOL_LISTS_SUCCESS";
export const GET_USER_COOL_LISTS_FAILURE = "GET_USER_COOL_LISTS_FAILURE";

export const getUserCoolList = user_id => dispatch => {
  dispatch({ type: GET_USER_COOL_LISTS });
  axios
    .get(`${url}/lists/creator/cool/${user_id}`)
    .then(res => {
      console.log(res);
      dispatch({ type: GET_USER_COOL_LISTS_SUCCESS, payload: res.data });
    })
    .catch(err => {
      console.log(err);
      dispatch({ type: GET_USER_COOL_LISTS_FAILURE, payload: err.message });
    });
};

// Requests List Subscribers
export const GET_LIST_SUBSCRIBERS = "GET_LIST_SUBSCRIBERS";
export const GET_LIST_SUBSCRIBERS_SUCCESS = "GET_LIST_SUBSCRIBERS_SUCCESS";
export const GET_LIST_SUBSCRIBERS_FAILURE = "GET_LIST_SUBSCRIBERS_FAILURE";

export const getListSubscribers = list_id => dispatch => {
  dispatch({ type: GET_LIST_SUBSCRIBERS });
  axios
    .get(`${url}/lists/subscribers/${list_id}`)
    .then(res => {
      console.log(res);
      dispatch({ type: GET_LIST_SUBSCRIBERS_SUCCESS, payload: res.data[0].list_followers });
    })
    .catch(err => {
      console.log(err);
      dispatch({ type: GET_LIST_SUBSCRIBERS_FAILURE, payload: err.message });
    });
};

// Requests List Members
export const GET_LIST_MEMBERS = "GET_LIST_MEMBERS";
export const GET_LIST_MEMBERS_SUCCESS = "GET_LIST_MEMBERS_SUCCESS";
export const GET_LIST_MEMBERS_FAILURE = "GET_LIST_MEMBERS_FAILURE";

export const getListMembers = list_id => dispatch => {
  dispatch({ type: GET_LIST_MEMBERS });
  axios
    .get(`${url}/lists/members/${list_id}`)
    .then(res => {
      console.log(res);
      dispatch({ type: GET_LIST_MEMBERS_SUCCESS, payload: res.data[ 0 ].list_members });
    })
    .catch(err => {
      console.log(err);
      dispatch({ type: GET_LIST_MEMBERS_FAILURE, payload: err.message });
    });
};


// Requests All Top Lists by Points
export const GET_ALL_LIST_POINTS = "GET_ALL_LIST_POINTS";
export const GET_ALL_LIST_POINTS_SUCCESS = "GET_ALL_LIST_POINTS_SUCCESS";
export const GET_ALL_LIST_POINTS_FAILURE = "GET_ALL_LIST_POINTS_FAILURE";

export const getAllListPoints = () => dispatch => {
  dispatch({ type: GET_ALL_LIST_POINTS });
  axios
    .get(`${url}/lists/points/top`)
    .then(res => {
      console.log(res);
      dispatch({ type: GET_ALL_LIST_POINTS_SUCCESS, payload: res.data });
    })
    .catch(err => {
      console.log(err);
      dispatch({ type: GET_ALL_LIST_POINTS_FAILURE, payload: err.message });
    });
};

// Requests Top Follow Lists by Points
export const GET_FOLLOW_LIST_POINTS = "GET_FOLLOW_LIST_POINTS";
export const GET_FOLLOW_LIST_POINTS_SUCCESS = "GET_FOLLOW_LIST_POINTS_SUCCESS";
export const GET_FOLLOW_LIST_POINTS_FAILURE = "GET_FOLLOW_LIST_POINTS_FAILURE";

export const getFollowListPoints = () => dispatch => {
  dispatch({ type: GET_FOLLOW_LIST_POINTS });
  axios
    .get(`${url}/lists/points/follow`)
    .then(res => {
      console.log(res);
      dispatch({ type: GET_FOLLOW_LIST_POINTS_SUCCESS, payload: res.data });
    })
    .catch(err => {
      console.log(err);
      dispatch({ type: GET_FOLLOW_LIST_POINTS_FAILURE, payload: err.message });
    });
};

// Requests Top Block Lists by Points
export const GET_BLOCK_LIST_POINTS = "GET_BLOCK_LIST_POINTS";
export const GET_BLOCK_LIST_POINTS_SUCCESS = "GET_BLOCK_LIST_POINTS_SUCCESS";
export const GET_BLOCK_LIST_POINTS_FAILURE = "GET_BLOCK_LIST_POINTS_FAILURE";

export const getBlockListPoints = () => dispatch => {
  dispatch({ type: GET_BLOCK_LIST_POINTS });
  axios
    .get(`${url}/lists/points/block`)
    .then(res => {
      console.log(res);
      dispatch({ type: GET_BLOCK_LIST_POINTS_SUCCESS, payload: res.data });
    })
    .catch(err => {
      console.log(err);
      dispatch({ type: GET_BLOCK_LIST_POINTS_FAILURE, payload: err.message });
    });
};

// Requests Timeline for Selected List
export const GET_LIST_TIMELINE = "GET_LIST_TIMELINE";
export const GET_LIST_TIMELINE_SUCCESS = "GET_LIST_TIMELINE_SUCCESS";
export const GET_LIST_TIMELINE_FAILURE = "GET_LIST_TIMELINE_FAILURE";

export const getListTimeline = (list_id, user_id) => dispatch => {
  dispatch({ type: GET_LIST_TIMELINE });
  // let params = {user_id: user_id}
  axios
    .get(`${url}/lists/timeline/${list_id}`)
    .then(res => {
      console.log(res);
      dispatch({ type: GET_LIST_TIMELINE_SUCCESS, payload: res.data });
    })
    .catch(err => {
      console.log(err);
      dispatch({ type: GET_LIST_TIMELINE_FAILURE, payload: err.message });
    });
};


// Add a new List to the database

export const ADD_LIST = "ADD_LIST";
export const ADD_LIST_SUCCESS = "ADD_LIST_SUCCESS";
export const ADD_LIST_FAILURE = "ADD_LIST_FAILURE";

export const addList = post => dispatch => {
  dispatch({ type: ADD_LIST });
  axios
    .post(`${url}/lists/`, post)
    .then(res => {
      console.log(res);
      dispatch({ type: ADD_LIST_SUCCESS, payload: res.data });
    })
    .catch(err => {
      console.log(err);
      dispatch({ type: ADD_LIST_FAILURE, payload: err.message });
    });
};

// Create a new List (using Data Science magic)

export const CREATE_LIST = "CREATE_LIST";
export const CREATE_LIST_SUCCESS = "CREATE_LIST_SUCCESS";
export const CREATE_LIST_FAILURE = "CREATE_LIST_FAILURE";

export const createList = post => dispatch => {
  dispatch({ type: CREATE_LIST });
  axios
    .post(`${url}/lists/create`, post)
    .then(res => {
      console.log(res);
      dispatch({ type: CREATE_LIST_SUCCESS, payload: res.data });
    })
    .catch(err => {
      console.log(err);
      dispatch({ type: CREATE_LIST_FAILURE, payload: err.message });
    });
};

// Edit a List
export const EDIT_LIST = "EDIT_LIST";
export const EDIT_LIST_SUCCESS = "EDIT_LIST_SUCCESS";
export const EDIT_LIST_FAILURE = "EDIT_LIST_FAILURE";

export const editList = list => dispatch => {
  dispatch({ type: EDIT_LIST });
  axios
    .put(`${url}/lists/${list.list_id}`, list)
    .then(res => {
      dispatch({ type: EDIT_LIST_SUCCESS, payload: res.data });
    })
    .catch(err => {
      dispatch({ type: EDIT_LIST_FAILURE, payload: err.message });
    });
};

// Updates List Members
export const UPDATE_LIST_MEMBERS = "UPDATE_LIST_MEMBERS";
export const UPDATE_LIST_MEMBERS_SUCCESS = "UPDATE_LIST_MEMBERS_SUCCESS";
export const UPDATE_LIST_MEMBERS_FAILURE = "UPDATE_LIST_MEMBERS_FAILURE";

export const updateListMembers = listMembers => dispatch => {
  dispatch({ type: UPDATE_LIST_MEMBERS });
  axios
    .put(`${url}/lists/${listMembers.list_members_id}`, listMembers)
    .then(res => {
      dispatch({ type: UPDATE_LIST_MEMBERS_SUCCESS, payload: res.data });
    })
    .catch(err => {
      dispatch({ type: UPDATE_LIST_MEMBERS_FAILURE, payload: err.message });
    });
};

// Delete a List
export const DELETE_LIST = "DELETE_LIST";
export const DELETE_LIST_SUCCESS = "DELETE_LIST_SUCCESS";
export const DELETE_LIST_FAILURE = "DELETE_LIST_FAILURE";

export const deleteList = list_id => dispatch => {
  dispatch({ type: DELETE_LIST });
  axios
    .delete(`${url}/lists/${list_id}`)
    .then(res => {
      console.log(res);
      dispatch({ type: DELETE_LIST_SUCCESS, payload: res.data });
    })
    .catch(err => {
      console.log(err);
      dispatch({ type: DELETE_LIST_FAILURE, payload: err.message });
    });
};

// Unfollow a List  --> Not sure about this
export const DELETE_LIST_FOLLOW = "DELETE_LIST_FOLLOW";
export const DELETE_LIST_FOLLOW_SUCCESS = "DELETE_LIST_FOLLOW_SUCCESS";
export const DELETE_LIST_FOLLOW_FAILURE = "DELETE_LIST_FOLLOW_FAILURE";

export const deleteListFollow = user_id => dispatch => {
  dispatch({ type: DELETE_LIST_FOLLOW });
  axios
    .delete(`${url}/lists/list_id/unfollow/${user_id}`) // <-- I don't feel good about this.
    .then(res => {
      console.log(res);
      dispatch({ type: DELETE_LIST_FOLLOW_SUCCESS, payload: res.data });
    })
    .catch(err => {
      console.log(err);
      dispatch({ type: DELETE_LIST_FOLLOW_FAILURE, payload: err.message });
    });
};

// Subscribe to a List

export const SUBSCRIBE_LIST = "SUBSCRIBE_LIST";
export const SUBSCRIBE_LIST_SUCCESS = "SUBSCRIBE_LIST_SUCCESS";
export const SUBSCRIBE_LIST_FAILURE = "SUBSCRIBE_LIST_FAILURE";

export const subscribeToList = (listId, userId) => dispatch => {
  dispatch({ type: SUBSCRIBE_LIST });
  axios
    .post(`${url}/lists//${listId}/follow/${userId}`)
    .then(res => {
      console.log(res);
      dispatch({ type: SUBSCRIBE_LIST_SUCCESS, payload: res.data });
    })
    .catch(err => {
      console.log(err);
      dispatch({ type: SUBSCRIBE_LIST_FAILURE, payload: err.message });
    });
}

// Unsubscribe to a List

export const UNSUBSCRIBE_LIST = "SUBSCRIBE_LIST";
export const UNSUBSCRIBE_LIST_SUCCESS = "SUBSCRIBE_LIST_SUCCESS";
export const UNSUBSCRIBE_LIST_FAILURE = "SUBSCRIBE_LIST_FAILURE";

export const unSubscribeToList = (listId, userId) => dispatch => {
  dispatch({ type: UNSUBSCRIBE_LIST });
  axios
    .post(`${url}/lists//${listId}/unfollow/${userId}`)
    .then(res => {
      console.log(res);
      dispatch({ type: UNSUBSCRIBE_LIST_SUCCESS, payload: res.data });
    })
    .catch(err => {
      console.log(err);
      dispatch({ type: UNSUBSCRIBE_LIST_FAILURE, payload: err.message });
    });
}



//<------TWEETS------->

// Add a new Tweet
export const ADD_POST = "ADD_POST";
export const ADD_POST_SUCCESS = "ADD_POST_SUCCESS";
export const ADD_POST_FAILURE = "ADD_POST_FAILURE";

export const addPost = post => dispatch => {
  dispatch({ type: ADD_POST });
  axios
    .post(`${url}/tweets`, post)
    .then(res => {
      console.log(res);
      dispatch({ type: ADD_POST_SUCCESS, payload: res.data });
    })
    .catch(err => {
      console.log(err);
      dispatch({ type: ADD_POST_FAILURE, payload: err.message });
    });
};

//<------Votes------->

// Get List votes by twitter_list_id
export const GET_LIST_VOTES = "GET_LIST_VOTES";
export const GET_LIST_VOTES_SUCCESS = "GET_LIST_VOTES_SUCCESS";
export const GET_LIST_VOTES_FAILURE = "GET_LIST_VOTES_FAILURE";

export const getListVotes = twitter_list_id => dispatch => {
  dispatch({ type: GET_LIST_VOTES });
  axios
    .get(`${url}/votes/list/${twitter_list_id}`)
    .then(res => {
      console.log(res);
      dispatch({ type: GET_LIST_VOTES_SUCCESS, payload: res.data });
    })
    .catch(err => {
      console.log(err);
      dispatch({ type: GET_LIST_VOTES_FAILURE, payload: err.message });
    });
};

// Get A Users votes by twitter_user_id
export const GET_USER_VOTES = "GET_USER_VOTES";
export const GET_USER_VOTES_SUCCESS = "GET_USER_VOTES_SUCCESS";
export const GET_USER_VOTES_FAILURE = "GET_USER_VOTES_FAILURE";

export const getUserVotes = twitter_user_id => dispatch => {
  dispatch({ type: GET_USER_VOTES });
  axios
    .get(`${url}/votes/user/${twitter_user_id}`)
    .then(res => {
      console.log(res);
      dispatch({ type: GET_USER_VOTES_SUCCESS, payload: res.data });
    })
    .catch(err => {
      console.log(err);
      dispatch({ type: GET_USER_VOTES_FAILURE, payload: err.message });
    });
};

// POST A Users vote
export const ADD_USER_VOTE = "ADD_USER_VOTE";
export const ADD_USER_VOTE_SUCCESS = "ADD_USER_VOTE_SUCCESS";
export const ADD_USER_VOTE_FAILURE = "ADD_USER_VOTE_FAILURE";

export const addUserVote = vote => dispatch => {
  dispatch({ type: ADD_USER_VOTE });
  axios
    .post(`${url}/votes/`, vote)
    .then(res => {
      console.log(res);
      dispatch({ type: ADD_USER_VOTE_SUCCESS, payload: res.data });
    })
    .catch(err => {
      console.log(err);
      dispatch({ type: ADD_USER_VOTE_FAILURE, payload: err.message });
    });
};

export const SEARCH_LISTS = "SEARCH_LISTS";
export const SEARCH_LISTS_SUCCESS = "SEARCH_LISTS_SUCCESS";
export const SEARCH_LISTS_FAILURE = "SEARCH_LISTS_FAILURE";

export function searchLists(searchTerm) {
  return (dispatch) => {
    dispatch({ type: SEARCH_LISTS });
    axios.get(`${url}/lists`)
      .then(({ data }) => {
        console.log(data);
        let filtered = data.filter(list => {
          if(list.description){
            return list.description.toLowerCase().includes(searchTerm.toLowerCase()) || list.list_name.toLowerCase().includes(searchTerm.toLowerCase())}
          return list.list_name.toLowerCase().includes(searchTerm.toLowerCase());
        })
        console.log(filtered);
        dispatch({ type: SEARCH_LISTS_SUCCESS, payload: filtered })
      })
      .catch(err => {
        console.log(err);
        dispatch({ type: SEARCH_LISTS_FAILURE })
      })
  }
}


export const ERROR_HANDLER = "ERROR_HANDLER";

export const handleError = () => {
  return { type: ERROR_HANDLER };
};

//Getting User's Tweets
// export const GET_POSTS = "GET_POSTS";
// export const GET_POSTS_SUCCESS = "GET_POSTS_SUCCESS";
// export const GET_POSTS_FAILURE = "GET_POSTS_FAILURE";

// Requests the entire User's Tweets array
// export const getPosts = () => dispatch => {
//   dispatch({ type: GET_POSTS });
//   axios
//     // .get("")
//     .then(res => {
//       console.log(res);
//       dispatch({ type: GET_POSTS_SUCCESS, payload: res.data });
//     })
//     .catch(err => {
//       console.log(err);
//       dispatch({ type: GET_POSTS_FAILURE, payload: err.message });
//     });
// };

// Requests a specific Tweet
// export const GET_POST = "GET_POST";
// export const GET_POST_SUCCESS = "GET_POST_SUCCESS";
// export const GET_POST_FAILURE = "GET_POST_FAILURE";

// export const getPost = id => dispatch => {
//   dispatch({ type: GET_POST });
//   axios
//     // .get(``)
//     .then(res => {
//       console.log(res);
//       dispatch({ type: GET_POST_SUCCESS, payload: res.data });
//     })
//     .catch(err => {
//       console.log(err);
//       dispatch({ type: GET_POST_FAILURE, payload: err.message });
//     });
// };


// Delete a Tweet
// export const DELETE_POST = "DELETE_POST";
// export const DELETE_POST_SUCCESS = "DELETE_POST_SUCCESS";
// export const DELETE_POST_FAILURE = "DELETE_POST_FAILURE";

// export const deletePost = id => dispatch => {
//   dispatch({ type: DELETE_POST });
//   axios
//     // .delete(``)
//     .then(res => {
//       console.log(res);
//       dispatch({ type: DELETE_POST_SUCCESS, payload: res.data });
//     })
//     .catch(err => {
//       console.log(err);
//       dispatch({ type: DELETE_POST_FAILURE, payload: err.message });
//     });
// };

