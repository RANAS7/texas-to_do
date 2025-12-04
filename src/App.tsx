import { useState } from 'react'

type Status = 'pending' | 'in-progress' | 'completed' | 'cancelled'
type Priority = 'low' | 'medium' | 'high'

interface Todo {
  id: number
  title: string
  description: string
  status: Status
  priority: Priority
  dueDate: string
  createdAt: string
}

function App() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [form, setForm] = useState({
    title: '',
    description: '',
    priority: 'medium' as Priority,
    dueDate: ''
  })
  const [editId, setEditId] = useState<number | null>(null)
  const [filter, setFilter] = useState<Status | 'all'>('all')

  const resetForm = () => {
    setForm({ title: '', description: '', priority: 'medium', dueDate: '' })
    setEditId(null)
  }

  const handleSubmit = () => {
    if (!form.title.trim()) return

    if (editId) {
      setTodos(todos.map(todo =>
        todo.id === editId ? { ...todo, ...form } : todo
      ))
    } else {
      setTodos([...todos, {
        id: Date.now(),
        ...form,
        title: form.title.trim(),
        status: 'pending',
        createdAt: new Date().toISOString().split('T')[0]
      }])
    }
    resetForm()
  }

  const editTodo = (todo: Todo) => {
    setForm({
      title: todo.title,
      description: todo.description,
      priority: todo.priority,
      dueDate: todo.dueDate
    })
    setEditId(todo.id)
  }

  const updateStatus = (id: number, status: Status) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, status } : todo
    ))
  }

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  const filteredTodos = filter === 'all' ? todos : todos.filter(todo => todo.status === filter)

  const getStatusColor = (status: Status) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      'in-progress': 'bg-blue-100 text-blue-800',
      completed: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800'
    }
    return colors[status]
  }

  const getPriorityColor = (priority: Priority) => {
    const colors = {
      low: 'border-l-green-400',
      medium: 'border-l-yellow-400',
      high: 'border-l-red-400'
    }
    return colors[priority]
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">Task Manager</h1>

        {/* Form */}
        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <input
              type="text"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="Task title..."
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="date"
              value={form.dueDate}
              onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <textarea
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            placeholder="Description..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
            rows={2}
          />
          <div className="flex gap-4 items-center">
            <select
              value={form.priority}
              onChange={(e) => setForm({ ...form, priority: e.target.value as Priority })}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="low">Low Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="high">High Priority</option>
            </select>
            <button
              onClick={handleSubmit}
              className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {editId ? 'Update' : 'Add'} Task
            </button>
            {editId && (
              <button
                onClick={resetForm}
                className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
              >
                Cancel
              </button>
            )}
          </div>
        </div>

        {/* Filter */}
        <div className="flex gap-2 mb-6 flex-wrap">
          {(['all', 'pending', 'in-progress', 'completed', 'cancelled'] as const).map(status => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-3 py-1 rounded-full text-sm ${filter === status ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
            >
              {status === 'all' ? 'All' : status.replace('-', ' ')}
            </button>
          ))}
        </div>

        {/* Tasks */}
        <div className="space-y-3">
          {filteredTodos.map(todo => (
            <div key={todo.id} className={`border-l-4 ${getPriorityColor(todo.priority)} bg-white border border-gray-200 rounded-md p-4`}>
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-gray-800">{todo.title}</h3>
                <div className="flex gap-2">
                  <button
                    onClick={() => editTodo(todo)}
                    className="text-blue-500 hover:bg-blue-50 px-2 py-1 rounded text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteTodo(todo.id)}
                    className="text-red-500 hover:bg-red-50 px-2 py-1 rounded text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>

              {todo.description && (
                <p className="text-gray-600 text-sm mb-3">{todo.description}</p>
              )}

              <div className="flex justify-between items-center">
                <div className="flex gap-4 text-sm text-gray-500">
                  <span>Due: {todo.dueDate || 'No date'}</span>
                  <span>Created: {todo.createdAt}</span>
                </div>
                <div className="flex gap-2 items-center">
                  <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(todo.status)}`}>
                    {todo.status.replace('-', ' ')}
                  </span>
                  <select
                    value={todo.status}
                    onChange={(e) => updateStatus(todo.id, e.target.value as Status)}
                    className="text-sm border border-gray-300 rounded px-2 py-1"
                  >
                    <option value="pending">Pending</option>
                    <option value="in-progress">In Progress</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredTodos.length === 0 && (
          <p className="text-center text-gray-500 mt-8">No tasks found. {filter !== 'all' ? 'Try changing the filter.' : 'Add one above!'}</p>
        )}
      </div>
    </div>
  )
}

export default App
