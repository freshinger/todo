type Task = {
  _id: string;
  __v: number;
  title: string;
  completed: boolean;
  created_at: string;
  updated_at: string;
};
type Tasks = {
  tasks: Task[];
};
