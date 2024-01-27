export type Task = {
  id: string,
  name: string,
  priority: boolean,
}

export type Note = {
  id:string,
  content: string
}

export type Deadline = {
  num: number,
  text: string,
  completed: boolean
}

export type Goal = {
  id: string,
  name: string,
  tasks?: Task [],
  notes?: Note [],
  strict?: boolean,
  deadlines?: Deadline | Deadline[],
  comment?: string,
  completed: boolean,
  date: Date,
}