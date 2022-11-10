import React from 'react'
import Link from 'next/link'

const fetchTodos = async (): Promise<Todo[]> => {
  const res = await fetch('https://jsonplaceholder.typicode.com/todos', { next: { revalidate: 60 } })
  return res.json()
}

async function TodosList() {
  const todos = await fetchTodos()
  
  return (
    <>
      {todos.map((todo) => (
        <p key={todo.id}>
          <Link href={`/todos/${todo.id}`}>Todo: {todo.id}</Link>
        </p>
      ))}
    </>
  )
}

export default TodosList
