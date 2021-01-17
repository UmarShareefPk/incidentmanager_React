const initState = {
   users : [],
   UsersList :[],
   TotalUsers : 0
  }
  
  const usersReducer = (state = initState, action) => {
    switch (action.type) {
      case "USER_ADD":
        console.log(action);
        return {
          ...state,
          Users: [...state.users, action.user],
        };
      case "ALL_USERS":
        return {
          ...state,
          users: action.users,
        };

      case "USERS_WITH_PAGE":
        return {
          ...state,
          UsersList: action.data.Users,
          TotalUsers: action.data.Total_Users,
        };
      case "SIGN_OUT":
        return {
          ...state,
          users: [],
          UsersList: [],
          TotalUsers: 0,
        };
      default:
        return state;
    }
  };
  
  export default usersReducer;