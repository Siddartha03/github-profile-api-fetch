
const initialState={
    posts:[]
};

export default function reducer(state=initialState,action){

 if(action.type==="ADD_POST" && action.data.login){
 return{
     ...state,
     posts:[...state.posts,action.data]
     
 }
}else{
    return state;
}
    
}
