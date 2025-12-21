import { useState } from "react"
import { Input } from "./components/ui/input"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "./components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { ChevronDownIcon } from "lucide-react"
import { Textarea } from "./components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

function App() {
  const [open, setOpen] = useState(false)
  const [date, setDate] = useState<Date | undefined>(undefined)

  return (
    <div className="flex items-center justify-center">
      <div className="max-w-4xl mt-5 mx-auto items-center justify-center bg-gray-300 rounded-2xl shadow-lg">
        <div className="w-full p-5 flex flex-col gap-5 items-center justify-center">
          <h1 className="font-bold text-3xl">Task Manager</h1>
          <div className="w-full flex flex-col gap-5">
            <div className="flex gap-3">
              <Input placeholder="Task title..." />
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    id="date"
                    className="w-48 justify-between font-normal"
                  >
                    {date ? date.toLocaleDateString() : "Select date"}
                    <ChevronDownIcon />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    captionLayout="dropdown"
                    onSelect={(date) => {
                      setDate(date)
                      setOpen(false)
                    }}
                  />
                </PopoverContent>
              </Popover>
            </div>
            <Textarea placeholder="Type your message here." />
            <div className="flex">
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Fruits</SelectLabel>
                    <SelectItem value="low">Low Priority</SelectItem>
                    <SelectItem value="medium">Medium Priority</SelectItem>
                    <SelectItem value="high">High Priority</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <Button variant="outline" className="ml-4 hover:cursor-pointer">Add Task</Button>
            </div>
            <div>
              {(["All", "Pending", "in progress", "Completed", "Cancelled"] as const).map((priority) => (
                <Button
                  key={priority}
                  variant="ghost"
                  className="mr-2 mb-2 bg-gray-400 rounded-full hover:cursor-pointer"
                >
                  {priority}
                </Button>
              ))}
            </div>
            <div>
              {/* Task list will go here */}
              <div className="flex flex-col gap-3 border border-l-4 border-l-red-600 border-white p-4 rounded-md ">
                <div className="flex justify-between">
                  <h3 className="font-bold">Task title</h3>
                  <div>
                    <Button variant="ghost" className="text-blue-600">edit</Button>
                    <Button variant="ghost" className="text-red-600">delete</Button>
                  </div>
                </div>
                <p>
                  sdmfnlsdk.fls;d
                </p>
                <div className="flex justify-between items-center">
                  <div className="flex gap-2">
                    <span>Due date:</span>
                    <span>created: </span>
                  </div>
                  <div className="flex gap-3">
                    <span className="py-1 rounded-sm bg-white px-3">status</span>
                    <Select>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select a fruit" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Fruits</SelectLabel>
                          <SelectItem value="apple">Apple</SelectItem>
                          <SelectItem value="banana">Banana</SelectItem>
                          <SelectItem value="blueberry">Blueberry</SelectItem>
                          <SelectItem value="grapes">Grapes</SelectItem>
                          <SelectItem value="pineapple">Pineapple</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
