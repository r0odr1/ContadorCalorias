import { createContext, useReducer, type Dispatch, type ReactNode } from "react";
import { activityReducer, initialState, type ActivityActions, type ActivitySate } from "../reducers/activity-reducer";

type ActivityProviderProps = {
  children: ReactNode
}

type ActivityContextProps = {
  state: ActivitySate
  dispatch: Dispatch<ActivityActions>
}

const ActivityContext = createContext<ActivityContextProps>(null!)

export const ActivityProvider = ({children} : ActivityProviderProps) => {
  const [state, dispatch] = useReducer(activityReducer, initialState)



  return (
    <ActivityContext.Provider value={{
      state,
      dispatch
    }}>
      {children}

    </ActivityContext.Provider>
  )
}

export default ActivityContext