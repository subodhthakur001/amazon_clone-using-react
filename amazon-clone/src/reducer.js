export const initialState = {
    basket: [],
    user : null
};

const reducer = (state,action) => {
        switch(action.type){
            case "ADD_TO_BASKET":
                return {
                    ...state,
                    basket: [...state.basket,action.item]
                    
                }
            case "EMPTY_BASKET":
                return {
                    ...state,
                    basket: []
                }
            case "REMOVE_FROM_BASKET":
                const index = state.basket.findIndex((founditem) =>
                    founditem.id === action.id
                
                )
                let newBasket = [...state.basket]
                if(index >= 0){
                    newBasket.splice(index,1)
                }
                else{
                    prompt("this item does not exists")
                }
                return {
                    ...state,
                    basket : newBasket
                }
                case "SET_USER":
                    return {
                        ...state,
                        user : action.user
                    }
                    case "REMOVE_USER":
                       return {
                            ...state,
                            user:null
                        }
            default :
                return state 
        }
}
export default reducer;