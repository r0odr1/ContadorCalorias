import { useState } from "react"
import { v4 as uuidv4 } from "uuid"
import type { ChangeEvent, FormEvent, Dispatch } from "react"
import type { Activity } from "../types"
import { categories } from "../data/categories"
import type { ActivityActions, ActivitySate } from "../reducers/activity-reducer"

type FormProps = {
  dispatch: Dispatch<ActivityActions>,
  state: ActivitySate
}

const initialState: Activity = {
  id: uuidv4(),
  category: 1,
  name: '',
  calories: 0
}

export default function Form({ dispatch, state } : FormProps) {
  
  const editingActivity = state.activeId 
  ? state.activities.find(a => a.id === state.activeId)
  : undefined

  const [activity, setActivity] = useState<Activity>(
    editingActivity || initialState
  )
  
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const isNumberField = ['category', 'calories'].includes(e.target.id)

    setActivity({
      ...activity,
      [e.target.id]: isNumberField ? +e.target.value : e.target.value
    })
  }

  const isValidActivity = () => {
    const { name, calories } = activity
    return name.trim() !== '' && calories > 0
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    dispatch({
      type: 'save-activity',
      payload: {
        newActivity: activity
      }
    })

    setActivity({
      ...initialState,
      id: uuidv4()
    })
  }

  return (
    <form
      className="space-y-5 bg-white shadow p-10 rounded-lg"
      onSubmit={handleSubmit}
    >
      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="category" className="font-bold">Categoria:</label>
        <select className="border border-slate-300 p-2 rounded-lg w-full bg-white"
          id="category"
          value={activity.category}
          onChange={handleChange}
        >
          {categories.map(category => (
            <option
            key={category.id}
            value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="name" className="font-bold">Actividad:</label>
        <input
          id="name"
          type="text"
          className="border border-slate-30 p-2 rounded-lg"
          placeholder="Ej: correr, comer, etc"
          value={activity.name}
          onChange={handleChange}
        />
      </div>

      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="calories" className="font-bold">Calorias:</label>
        <input
          id="calories"
          type="number"
          className="border border-slate-30 p-2 rounded-lg"
          placeholder="Calorias. Ej: 300"
          value={activity.calories}
          onChange={handleChange}
        />
      </div>

      <input
        type="submit"
        className="bg-gray-800 hover:bg-gray-900 w-full p-2 rounded-lg font-bold uppercase text-white cursor-pointer disabled:opacity-50"
        value={activity.category === 1 ? 'Guardar Comida' : 'Guardar Ejercicio'}
        disabled={!isValidActivity()}
      />
    </form>
  )
}
