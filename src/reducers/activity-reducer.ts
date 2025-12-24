import type { Activity } from "../types"

export type ActivityActions =
| { type: 'save-activity', payload: { newActivity: Activity} }

type ActivitySate = {
  activities: Activity[]
}

export const initialState: ActivitySate = {
  activities: []
}

export const activityReducer = (
  state: ActivitySate = initialState,
  action: ActivityActions
) => {
  if(action.type === 'save-activity') {

    return {
      ...state,
      activities: [...state.activities, action.payload.newActivity]
    }
  }

  return state
}