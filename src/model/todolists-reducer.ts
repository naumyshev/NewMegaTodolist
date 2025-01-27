import {Todolist} from "../App.tsx";

type Actions = {
    type: string
    payload: any
}

const initialState: Todolist[] = []

export const todolistsReducer = (state: Todolist[] = initialState, action: Actions) => {
    switch (action.type) {
        case 'delete_todolist': {
            return state.filter(td => td.id !== action.payload.id)
        }
        default:
            return state
    }
}