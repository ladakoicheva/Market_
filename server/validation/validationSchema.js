
import { status } from "../api/todoStore/types.js"

export const shemeValidation = {
  text: {
    type: 'string',
    min: 1,
    max: 100,
    key: 'text'
  },
  isDone: {
    type: 'boolean',
    key: 'isDone',
  },
  status: {
    type: 'string',
    todoStatus: [status.NEW, status.UPDATED],
    key: 'status'
  }
}