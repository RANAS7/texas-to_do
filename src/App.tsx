import { Input } from "./components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

function App() {
  return (
    <div className=" flex flex-col items-center justify-center gap-5 p-5 max-w-2xlxl">
      <h1 className="text-3xl ">Task Manager</h1>
      <div className="grid grid-cols-2 w-5xl gap-2">
        <Input
          placeholder="task title.."
          className="border-2"
        />
        <input type="date" className="border-2 rounded-md" />

        <textarea placeholder="Inter description .." className="border-2 p-2" />
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a priority" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="log">Low Priority</SelectItem>
              <SelectItem value="medium">Medium priority</SelectItem>
              <SelectItem value="high">High Priority</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}

export default App;
