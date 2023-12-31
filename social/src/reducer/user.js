export const userReducer=(state,action)=>{
    switch (action.type) {

        case "SET_USER_INIT":
    
            return{
                ...state,
                name:action?.payload?.name,
                email:action?.payload?.email,
                avatar:action.payload?.avatar_url,
                info:action?.payload
            
            }

            case "SET_USERID":
                // alert("hit user reducer for id")
                // console.log("payload for userId",action?.payload)
                return{
                    ...state,
                    userId:action?.payload,
                }
     

            case "UPDATE_USER":
                // console.log("payload for updated",action.payload)
                
                return{
                    ...state,

                    address:action.payload?.address,
                    name:action.payload?.name

                }

            case "SETPROFILEUSER":
                return{
                    ...state,
                    profileUser:action.payload
                }
    default :
    return state
    }
}