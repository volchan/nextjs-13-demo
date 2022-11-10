import React from 'react'
import { notFound } from 'next/navigation'

export const dynamicParams = true

type PageProps = {
  params: {
    id: string
  }
}

const fetchTodo = async (id: string): Promise<Todo> => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, { next: { revalidate: 60 } })
  return res.json()
} 

async function Todo({ params: { id } }: PageProps) {
  const todo = await fetchTodo(id)

  if(!todo.id) return notFound()
  
  return (
    <div className="p-10 bg-yellow-200 border-2 m-2 shadow-lg">
      <p>
        #{todo.id}: {todo.title}
      </p>
      <p>Completed: {todo.completed ? 'Yes' : 'No'}</p>
      <div className="border-t border-black mt-5 text-right">
        By User: {todo.userId}
      </div>
    </div>
  )
}

export default Todo

export async function generateStaticParams() {
  const res = await fetch(`https://jsonplaceholder.typicode.com/todos/`)
  const todos: Todo[] = await res.json()

  // this is to limit calls to not hit the rate limit of the Todo API
  const trimedTodos = todos.splice(0, 10)

  return trimedTodos.map((todo) => ({ id: todo.id.toString() }))
}
