import { useEffect, useState } from "react";
import { Input } from "./components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "./components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { ChevronDownIcon } from "lucide-react";
import { Textarea } from "./components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { priorityType, Todo } from "./components/types/todo.type";
import axios from "axios";

function App() {
  const [open, setOpen] = useState(false);
  const [todos, setTodos] = useState<Todo[]>([]);

  const [formData, setFormData] = useState<Todo>({
    title: "",
    description: "",
    due_date: new Date().toISOString().split("T")[0],
    status: "pending",
    priority: "low",
  });

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    await axios
      .get("http://localhost:3001/api/todo/get-all")
      .then((res) => {
        setTodos(res.data.data);
      })
      .catch((err) => console.log(err));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    axios.post("http://localhost:3001/api/todo/create", formData);

    console.log(formData);
  };

  const handleDelete = async (id: number) => {
    await axios
      .delete(`http://localhost:3001/api/todo/delete/${id}`)
      .then(() => {
        console.log("The todo deleted successfully!");
        fetchTodos();
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="flex items-center justify-center">
      <div className="max-w-4xl mt-5 mx-auto items-center justify-center bg-gray-300 rounded-2xl shadow-lg">
        <div className="w-full p-5 flex flex-col gap-5 items-center justify-center">
          <h1 className="font-bold text-3xl">Task Manager</h1>
          <div className="w-full flex flex-col gap-5">
            <div className="flex gap-3">
              <Input
                value={formData.title}
                onChange={(e) => {
                  setFormData({ ...formData, title: e.target.value });
                }}
                placeholder="Task title..."
              />
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    id="date"
                    className="w-48 justify-between font-normal"
                  >
                    {formData.due_date ? formData.due_date : "Select date"}
                    <ChevronDownIcon />
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  className="w-auto overflow-hidden p-0"
                  align="start"
                >
                  <Calendar
                    mode="single"
                    selected={
                      formData.due_date
                        ? new Date(formData.due_date)
                        : undefined
                    }
                    captionLayout="dropdown"
                    onSelect={(date) => {
                      setFormData({
                        ...formData,
                        due_date: date?.toISOString(),
                      });
                      setOpen(false);
                    }}
                  />
                </PopoverContent>
              </Popover>
            </div>
            <Textarea
              value={formData.description}
              onChange={(e) => {
                setFormData({ ...formData, description: e.target.value });
              }}
              placeholder="Type your message here."
            />
            <div className="flex">
              <Select
                value={formData.priority}
                onValueChange={(priority) => {
                  setFormData({
                    ...formData,
                    priority: priority as priorityType,
                  });
                }}
              >
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
              <Button
                variant="outline"
                onClick={handleSubmit}
                className="ml-4 hover:cursor-pointer"
              >
                Add Task
              </Button>
            </div>
            <div>
              {(
                [
                  "All",
                  "Pending",
                  "in progress",
                  "Completed",
                  "Cancelled",
                ] as const
              ).map((priority) => (
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
              {todos.length > 0 &&
                todos.map((todo) => (
                  <div
                    key={todo.id}
                    className="flex flex-col gap-3 border border-l-4 border-l-red-600 border-white p-4 rounded-md "
                  >
                    <div className="flex justify-between">
                      <h3 className="font-bold">{todo.title}</h3>
                      <div>
                        <Button variant="ghost" className="text-blue-600">
                          edit
                        </Button>
                        <Button
                          variant="ghost"
                          className="text-red-600"
                          onClick={() => handleDelete(todo.id!)}
                        >
                          delete
                        </Button>
                      </div>
                    </div>
                    <p>{todo.description}</p>
                    <div className="flex justify-between items-center">
                      <div className="flex gap-2">
                        <span>
                          Due date: {todo.due_date?.toString().split("T")[0]}
                        </span>
                        <span>
                          created: {todo.created_at?.toString().split("T")[0]}
                        </span>
                      </div>
                      <div className="flex gap-3">
                        <span className="py-1 rounded-sm bg-white px-3">
                          {todo.status}
                        </span>
                        <Select>
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select a fruit" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>Fruits</SelectLabel>
                              <SelectItem value="apple">Apple</SelectItem>
                              <SelectItem value="banana">Banana</SelectItem>
                              <SelectItem value="blueberry">
                                Blueberry
                              </SelectItem>
                              <SelectItem value="grapes">Grapes</SelectItem>
                              <SelectItem value="pineapple">
                                Pineapple
                              </SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
