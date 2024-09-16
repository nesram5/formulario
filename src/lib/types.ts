export type Note = {
    id: string
    content: string
    isDone: boolean
  }
  
export type Column = {
    id: string
    title: string
    notes: Note[]
    backgroundColor: string
  }  