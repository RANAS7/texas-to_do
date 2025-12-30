import { ChevronDownIcon } from "lucide-react"
import { Button } from "./components/ui/button"
import { Input } from "./components/ui/input"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { useState } from "react"
import { Textarea } from "./components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

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
  const [open, setOpen] = useState(false)
  const [filter, setFilter] = useState<Status | 'all'>('all')
  const [todos] = useState<Todo[]>([
    {
      id: 1,
      title: "Complete project documentation",
      description: "Write comprehensive documentation for the new feature",
      status: "in-progress",
      priority: "high",
      dueDate: "2025-02-15",
      createdAt: "2025-01-20"
    },
    {
      id: 2,
      title: "Review pull requests",
      description: "Review and merge pending PRs from team members",
      status: "pending",
      priority: "medium",
      dueDate: "2025-02-10",
      createdAt: "2025-01-21"
    },
    {
      id: 3,
      title: "Update dependencies",
      description: "Update all npm packages to latest versions",
      status: "completed",
      priority: "low",
      dueDate: "2025-01-25",
      createdAt: "2025-01-18"
    }
  ])

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

  const handleEdtit = (id: number) => {
    const todo = todos.find(todo => todo.id === id)
    if (!todo) return
  }

  const handleDelete = (id: number) => {
    // Delete logic here
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">Task Manager</h1>

        {/* Form */}
        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <Input placeholder="Task title..." />
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  id="date"
                  className="w-full justify-between font-normal"
                >
                  Select date
                  <ChevronDownIcon />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                <Calendar
                  mode="single"
                  captionLayout="dropdown"
                />
              </PopoverContent>
            </Popover>
          </div>
          <Textarea placeholder="Description..." className="w-full mb-4" rows={2} />
          <div className="flex gap-4 items-center">
            <Select >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="low">Low Priority</SelectItem>
                  <SelectItem value="medium">Medium Priority</SelectItem>
                  <SelectItem value="high">High Priority</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <Button variant="ghost" className="bg-blue-500 hover:bg-blue-700 hover:cursor-pointer">Add Task</Button>
          </div>
        </div>

        {/* Filter */}
        <div className="flex gap-2 mb-6 flex-wrap">
          {(['all', 'pending', 'in-progress', 'completed', 'cancelled'] as const).map(status => (
            <Button
              key={status}
              onClick={() => setFilter(status)}
              variant="ghost"
              size="sm"
              className={`rounded-full text-sm ${filter === status
                ? 'bg-blue-500 text-white hover:bg-blue-600'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
            >
              {status === 'all' ? 'All' : status.replace('-', ' ')}
            </Button>
          ))}
        </div>

        {/* Tasks */}
        <div className="space-y-3">
          {(filter === 'all' ? todos : todos.filter(todo => todo.status === filter)).map(todo => (
            <div key={todo.id} className={`border-l-4 ${getPriorityColor(todo.priority)} bg-white border border-gray-200 rounded-md p-4`}>
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-gray-800">{todo.title}</h3>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm" className="text-blue-500 hover:bg-blue-50 h-8" onClick={() => handleEdtit(todo.id)}>
                    Edit
                  </Button>
                  <Button variant="ghost" size="sm" className="text-red-500 hover:bg-red-50 h-8">
                    Delete
                  </Button>
                </div>
              </div>

              {todo.description && (
                <p className="text-gray-600 text-sm mb-3">{todo.description}</p>
              )}

              <div className="flex justify-between items-center">
                <div className="flex gap-4 text-sm text-gray-500">
                  <span>Due: {todo.dueDate}</span>
                  <span>Created: {todo.createdAt}</span>
                </div>
                <div className="flex gap-2 items-center">
                  <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(todo.status)}`}>
                    {todo.status.replace('-', ' ')}
                  </span>
                  <Select defaultValue={todo.status}>
                    <SelectTrigger className="w-[140px] h-8 text-sm">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="in-progress">In Progress</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          ))}
        </div>

        {(filter === 'all' ? todos : todos.filter(todo => todo.status === filter)).length === 0 && (
          <p className="text-center text-gray-500 mt-8">
            No tasks found. {filter !== 'all' ? 'Try changing the filter.' : 'Add one above!'}
          </p>
        )}
      </div>
    </div>
  )
}

export default App