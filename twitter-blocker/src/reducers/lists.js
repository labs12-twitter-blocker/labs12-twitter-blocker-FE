import {
  GET_LISTS,
  GET_LISTS_SUCCESS,
  GET_LISTS_FAILURE,
  GET_PUBLIC_LISTS,
  GET_PUBLIC_LISTS_SUCCESS,
  GET_PUBLIC_LISTS_FAILURE,
  GET_PRIVATE_LISTS,
  GET_PRIVATE_LISTS_SUCCESS,
  GET_PRIVATE_LISTS_FAILURE,
  GET_BLOCK_LISTS,
  GET_BLOCK_LISTS_SUCCESS,
  GET_BLOCK_LISTS_FAILURE,
  GET_COOL_LISTS,
  GET_COOL_LISTS_SUCCESS,
  GET_COOL_LISTS_FAILURE,
  GET_LIST,
  GET_LIST_SUCCESS,
  GET_LIST_FAILURE,
  GET_USER_LISTS,
  GET_USER_LISTS_SUCCESS,
  GET_USER_LISTS_FAILURE,
  GET_USER_PUBLIC_LISTS,
  GET_USER_PUBLIC_LISTS_SUCCESS,
  GET_USER_PUBLIC_LISTS_FAILURE,
  GET_USER_PRIVATE_LISTS,
  GET_USER_PRIVATE_LISTS_SUCCESS,
  GET_USER_PRIVATE_LISTS_FAILURE,
  GET_USER_BLOCK_LISTS,
  GET_USER_BLOCK_LISTS_SUCCESS,
  GET_USER_BLOCK_LISTS_FAILURE,
  GET_USER_COOL_LISTS,
  GET_USER_COOL_LISTS_SUCCESS,
  GET_USER_COOL_LISTS_FAILURE,
  GET_LIST_SUBSCRIBERS,
  GET_LIST_SUBSCRIBERS_SUCCESS,
  GET_LIST_SUBSCRIBERS_FAILURE,
  GET_LIST_MEMBERS,
  GET_LIST_MEMBERS_SUCCESS,
  GET_LIST_MEMBERS_FAILURE,
  GET_ALL_LIST_POINTS,
  GET_ALL_LIST_POINTS_SUCCESS,
  GET_ALL_LIST_POINTS_FAILURE,
  GET_FOLLOW_LIST_POINTS,
  GET_FOLLOW_LIST_POINTS_SUCCESS,
  GET_FOLLOW_LIST_POINTS_FAILURE,
  GET_BLOCK_LIST_POINTS,
  GET_BLOCK_LIST_POINTS_SUCCESS,
  GET_BLOCK_LIST_POINTS_FAILURE,
  GET_LIST_TIMELINE,
  GET_LIST_TIMELINE_SUCCESS,
  GET_LIST_TIMELINE_FAILURE,
  SUBSCRIBE_LIST,
  SUBSCRIBE_LIST_SUCCESS,
  SUBSCRIBE_LIST_FAILURE,
  UNSUBSCRIBE_LIST,
  UNSUBSCRIBE_LIST_SUCCESS,
  UNSUBSCRIBE_LIST_FAILURE,
  DS_LIST,
  DS_LIST_SUCCESS,
  DS_LIST_FAILURE,
  CREATE_LIST,
  CREATE_LIST_SUCCESS,
  CREATE_LIST_FAILURE,
  EDIT_LIST,
  EDIT_LIST_SUCCESS,
  EDIT_LIST_FAILURE,
  UPDATE_LIST_MEMBERS,
  UPDATE_LIST_MEMBERS_SUCCESS,
  UPDATE_LIST_MEMBERS_FAILURE,
  DELETE_LIST,
  DELETE_LIST_SUCCESS,
  DELETE_LIST_FAILURE,
  SEARCH_LISTS,
  SEARCH_LISTS_SUCCESS,
  SEARCH_LISTS_FAILURE,
  BLOCK_TIMELINE,
  BLOCK_TIMELINE_SUCCESS,
  BLOCK_TIMELINE_FAILURE,
  // DELETE_LIST_FOLLOW,   ------------> not sure about these either here or in actions/index.js
  // DELETE_LIST_FOLLOW_SUCCESS,
  // DELETE_LIST_FOLLOW_FAILURE
} from '../actions/index.js';

const initialState = {
  lists: [],
  dsLists: [],
  profileLists: [],
  publicLists: [],
  privateLists: [],
  blockLists: [],
  coolLists: [],
  list: {},
  userLists: [],
  userPublicLists: [],
  userPrivateLists: [],
  userBlockLists: [],
  userCoolLists: [],
  listSubscribers: [],
  listMembers: [],
  listPointsAll: null,
  listPointsFollow: null,
  listPointsBlock: null,
  listTimeline: {},
  fetchingLists: false,
  fetchingPublicLists: false,
  fetchingPrivateLists: false,
  fetchingBlockLists: false,
  fetchingCoolLists: false,
  fetchingList: false,
  fetchingUserLists: false,
  fetchingUserPublicLists: false,
  fetchingUserPrivateLists: false,
  fetchingUserBlockLists: false,
  fetchingUserCoolLists: false,
  fetchingListSubscribers: false,
  fetchingListMembers: false,
  fetchingListMembersDone: false,
  fetchingAllListPoints: false,
  fetchingFollowListPoints: false,
  fetchingBlockListPoints: false,
  fetchingListTimeline: false,
  fetchingListTimelineDone: false,
  addingDSList: false,
  subscribingList: false,
  unsubscribingList: false,
  creatingList: false,
  updatingList: false,
  updatingListMembers: false,
  deletingList: false,
  searchingLists: false,
  newListResponse: null,
  error: null,
  addDSListResponseUpdated: false,
  blockTimelineList: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_LISTS:
      return {
        ...state,
        fetchingLists: true,
        error: null
      };
    case GET_LISTS_SUCCESS:
      return {
        ...state,
        fetchingLists: false,
        lists: action.payload
      };
    case GET_LISTS_FAILURE:
      return {
        ...state,
        fetchingLists: false,
        error: action.payload
      };
    case GET_PUBLIC_LISTS:
      return {
        ...state,
        fetchingPublicLists: true,
        error: null
      };
    case GET_PUBLIC_LISTS_SUCCESS:
      return {
        ...state,
        fetchingPublicLists: false,
        publicLists: action.payload
      };
    case GET_PUBLIC_LISTS_FAILURE:
      return {
        ...state,
        fetchingPublicLists: false,
        error: action.payload
      };
    case GET_PRIVATE_LISTS:
      return {
        ...state,
        fetchingPrivateLists: true,
        error: null
      };
    case GET_PRIVATE_LISTS_SUCCESS:
      return {
        ...state,
        fetchingPrivateLists: false,
        privateLists: action.payload
      };
    case GET_PRIVATE_LISTS_FAILURE:
      return {
        ...state,
        fetchingPrivateLists: false,
        error: action.payload
      };
    case GET_BLOCK_LISTS:
      return {
        ...state,
        fetchingBlockLists: true,
        error: null
      };
    case GET_BLOCK_LISTS_SUCCESS:
      return {
        ...state,
        fetchingBlockLists: false,
        blockLists: action.payload
      };
    case GET_BLOCK_LISTS_FAILURE:
      return {
        ...state,
        fetchingBlockLists: false,
        error: action.payload
      };
    case GET_COOL_LISTS:
      return {
        ...state,
        fetchingCoolLists: true,
        error: null
      };
    case GET_COOL_LISTS_SUCCESS:
      return {
        ...state,
        fetchingCoolLists: false,
        coolLists: action.payload
      };
    case GET_COOL_LISTS_FAILURE:
      return {
        ...state,
        fetchingCoolLists: false,
        error: action.payload
      };
    case GET_LIST:
      return {
        ...state,
        fetchingList: true,
        error: null
      };
    case GET_LIST_SUCCESS:
      return {
        ...state,
        fetchingList: false,
        list: action.payload
      };
    case GET_LIST_FAILURE:
      return {
        ...state,
        fetchingList: false,
        error: action.payload
      };
    case GET_USER_LISTS:
      return {
        ...state,
        fetchingUserLists: true,
        error: null
      };
    case GET_USER_LISTS_SUCCESS:
      return {
        ...state,
        fetchingUserLists: false,
        userLists: action.payload
      };
    case GET_USER_LISTS_FAILURE:
      return {
        ...state,
        fetchingUserLists: false,
        error: action.payload
      };
    case GET_USER_PUBLIC_LISTS:
      return {
        ...state,
        fetchingUserPublicLists: true,
        error: null
      };
    case GET_USER_PUBLIC_LISTS_SUCCESS:
      return {
        ...state,
        fetchingUserPublicLists: false,
        userPublicLists: action.payload
      };
    case GET_USER_PUBLIC_LISTS_FAILURE:
      return {
        ...state,
        fetchingUserPublicLists: false,
        error: action.payload
      };
    case GET_USER_PRIVATE_LISTS:
      return {
        ...state,
        fetchingUserPrivateLists: true,
        error: null
      };
    case GET_USER_PRIVATE_LISTS_SUCCESS:
      return {
        ...state,
        fetchingUserPrivateLists: false,
        userPrivateLists: action.payload
      };
    case GET_USER_PRIVATE_LISTS_FAILURE:
      return {
        ...state,
        fetchingUserPrivateLists: false,
        error: action.payload
      };
    case GET_USER_BLOCK_LISTS:
      return {
        ...state,
        fetchingUserBlockLists: true,
        error: null
      };
    case GET_USER_BLOCK_LISTS_SUCCESS:
      return {
        ...state,
        fetchingUserBlockLists: false,
        userBlockLists: action.payload
      };
    case GET_USER_BLOCK_LISTS_FAILURE:
      return {
        ...state,
        fetchingUserBlockLists: false,
        error: action.payload
      };
    case GET_USER_COOL_LISTS:
      return {
        ...state,
        fetchingCoolLists: true,
        error: null
      };
    case GET_USER_COOL_LISTS_SUCCESS:
      return {
        ...state,
        fetchingCoolLists: false,
        userCoolLists: action.payload
      };
    case GET_USER_COOL_LISTS_FAILURE:
      return {
        ...state,
        fetchingCoolLists: false,
        error: action.payload
      };
    case GET_LIST_SUBSCRIBERS:
      return {
        ...state,
        fetchingListSubscribers: true,
        error: null
      };
    case GET_LIST_SUBSCRIBERS_SUCCESS:
      return {
        ...state,
        fetchingListSubscribers: false,
        listSubscribers: action.payload
      };
    case GET_LIST_SUBSCRIBERS_FAILURE:
      return {
        ...state,
        fetchingListSubscribers: false,
        error: action.payload
      };
    case GET_LIST_MEMBERS:
      return {
        ...state,
        fetchingListMembers: true,
        fetchingListMembersDone: false,
        error: null
      };
    case GET_LIST_MEMBERS_SUCCESS:
      return {
        ...state,
        fetchingListMembers: false,
        fetchingListMembersDone: true,
        listMembers: action.payload
      };
    case GET_LIST_MEMBERS_FAILURE:
      return {
        ...state,
        fetchingListMembers: false,
        fetchingListMembersDone: false,
        error: action.payload
      };
    case GET_ALL_LIST_POINTS:
      return {
        ...state,
        fetchingAllListPoints: true,
        error: null
      };
    case GET_ALL_LIST_POINTS_SUCCESS:
      return {
        ...state,
        fetchingAllListPoints: false,
        listPointsAll: action.payload
      };
    case GET_ALL_LIST_POINTS_FAILURE:
      return {
        ...state,
        fetchingAllListPoints: false,
        error: action.payload
      };
    case GET_FOLLOW_LIST_POINTS:
      return {
        ...state,
        fetchingFollowListPoints: true,
        error: null
      };
    case GET_FOLLOW_LIST_POINTS_SUCCESS:
      return {
        ...state,
        fetchingFollowListPoints: false,
        listPointsFollow: action.payload
      };
    case GET_FOLLOW_LIST_POINTS_FAILURE:
      return {
        ...state,
        fetchingFollowListPoints: false,
        error: action.payload
      };
    case GET_BLOCK_LIST_POINTS:
      return {
        ...state,
        fetchingBlockListPoints: true,
        error: null
      };
    case GET_BLOCK_LIST_POINTS_SUCCESS:
      return {
        ...state,
        fetchingBlockListPoints: false,
        listPointsBlock: action.payload
      };
    case GET_BLOCK_LIST_POINTS_FAILURE:
      return {
        ...state,
        fetchingBlockListPoints: false,
        error: action.payload
      };
    case GET_LIST_TIMELINE:
      return {
        ...state,
        fetchingListTimeline: true,
        fetchingListTimelineDone: false,
        error: null
      };
    case GET_LIST_TIMELINE_SUCCESS:
      return {
        ...state,
        fetchingListTimeline: false,
        fetchingListTimelineDone: true,
        listTimeline: action.payload
      };
    case GET_LIST_TIMELINE_FAILURE:
      return {
        ...state,
        fetchingListTimeline: false,
        fetchingListTimelineDone: false,
        error: action.payload
      };
      case SUBSCRIBE_LIST:
        return {
          ...state,
          subscribingList: true,
          error: null
        };
      case SUBSCRIBE_LIST_SUCCESS:
        return {
          ...state,
          subscribingList: false,
          // lists: [...state.lists, action.payload]
          lists: action.payload
        };
      case SUBSCRIBE_LIST_FAILURE:
        return {
          ...state,
          unsubscribingList: false,
          error: action.payload
        };
        case UNSUBSCRIBE_LIST:
        return {
          ...state,
          unsubscribingList: true,
          error: null
        };
      case UNSUBSCRIBE_LIST_SUCCESS:
        return {
          ...state,
          unsubscribingList: false,
          // lists: [...state.lists, action.payload]
          lists: action.payload
        };
      case UNSUBSCRIBE_LIST_FAILURE:
        return {
          ...state,
          subscribingList: false,
          error: action.payload
        };
    case DS_LIST:
      return {
        ...state,
        addingDSList: true,
        addDSListResponseUpdated: false,
        error: null
      };
    case DS_LIST_SUCCESS:
      return {
        ...state,
        addingDSList: false,
        addDSListResponseUpdated: true,
        dsLists: [...state.lists, action.payload]
      };
    case DS_LIST_FAILURE:
      return {
        ...state,
        addingDSList: false,
        addDSListResponseUpdated: false,
        error: action.payload
      };
    case CREATE_LIST:
      return {
        ...state,
        creatingList: true,
        newListResponseUpdated: false,
        error: null
      };
    case CREATE_LIST_SUCCESS:
      return {
        ...state,
        creatingList: false,
        newListResponse: action.payload,
        newListResponseUpdated: true,
        lists: [ ...state.lists, action.payload ]
      };
    case CREATE_LIST_FAILURE:
      return {
        ...state,
        creatingList: false,
        newListResponseUpdated: false,
        error: action.payload
      };
    case EDIT_LIST:
      return {
        ...state,
        updatingList: true,
        error: null
      };
    case EDIT_LIST_SUCCESS:
      return {
        ...state,
        updatingList: false,
        list: action.payload,
        lists: state.lists.map(list => {
          if (list.list_id === action.payload.list_id) {
            return action.payload;
          }
          return list;
        })
      };
    case EDIT_LIST_FAILURE:
      return {
        ...state,
        updatingList: false,
        error: action.payload
      };
    case UPDATE_LIST_MEMBERS:
      return {
        ...state,
        updatingListMembers: true,
        error: null
      };
    case UPDATE_LIST_MEMBERS_SUCCESS:
      return {
        ...state,
        updatingListMembers: false,
        listMembers: action.payload
      };
    case UPDATE_LIST_MEMBERS_FAILURE:
      return {
        ...state,
        updatingListMembers: false,
        error: action.payload
      };
    //
    case DELETE_LIST:
      return {
        ...state,
        deletingList: true,
        error: null
      };
    case DELETE_LIST_SUCCESS:
      return {
        ...state,
        deletingList: false,
        lists: state.lists.filter(list => list.list_id !== action.payload.list_id)
      };
    case DELETE_LIST_FAILURE:
      return {
        ...state,
        deletingList: false,
        error: action.payload
      };

    case SEARCH_LISTS:
      return {
        ...state,
        searchingLists: true,
        error: null
      };
    case SEARCH_LISTS_SUCCESS:
      return {
        ...state,
        searchingLists: false,
        publicLists: action.payload
      };
    case SEARCH_LISTS_FAILURE:
      return {
        ...state,
        searchingLists: false,
        error: action.payload
      };
    case BLOCK_TIMELINE:
      return {
        ...state,
        blockingTimeline: true,
        error: null
      };
    case BLOCK_TIMELINE_SUCCESS:
      return {
        ...state,
        blockingTimeline: false,
        blockTimelineList: action.payload
      };
    case BLOCK_TIMELINE_FAILURE:
      return {
        ...state,
        blockingTimeline: false,
        error: action.payload
      };


    default:
      return state;
  }
};

export default reducer;


