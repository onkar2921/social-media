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
                    userId:action?.payload?.id,
                }
     

            case "UPDATE_USER":
                console.log("payload for updated",action.payload)
                
                return{
                    ...state,

                    address:action.payload?.address,
                    name:action.payload?.name

                }
    default :
    return state
    }
}