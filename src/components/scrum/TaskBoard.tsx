
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useScrum } from "./ScrumContext";
import {
  ScrumTask,
  ScrumBoardColumn,
  getBoardColumns,
  getTasks,
  createTask,
  updateTask,
  deleteTask
} from '@/services/scrumService';
import {
  Plus, Trash2, MessageSquare, AlertCircle, Calendar, User, Clock, List, ArrowUp, ArrowRight, ArrowDown
} from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { useAuth } from '@/hooks/useAuth';

export const TaskBoard = ({ sprintId }: { sprintId?: string }) => {
  const { currentDepartment, departmentMembers, isAdmin } = useScrum();
  const { user } = useAuth();
  const [columns, setColumns] = useState<ScrumBoardColumn[]>([]);
  const [tasks, setTasks] = useState<ScrumTask[]>([]);
  const [loading, setLoading] = useState(true);
  
  // New task dialog
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [taskStatus, setTaskStatus] = useState('');
  const [taskPriority, setTaskPriority] = useState('Medium');
  const [taskAssignee, setTaskAssignee] = useState('');
  const [taskStoryPoints, setTaskStoryPoints] = useState<string>('');
  const [savingTask, setSavingTask] = useState(false);
  
  // Edit task dialog
  const [isEditingTask, setIsEditingTask] = useState(false);
  const [currentTask, setCurrentTask] = useState<ScrumTask | null>(null);
  
  // View task dialog
  const [viewingTask, setViewingTask] = useState<ScrumTask | null>(null);
  
  useEffect(() => {
    if (currentDepartment) {
      loadBoardData();
    }
  }, [currentDepartment, sprintId]);
  
  const loadBoardData = async () => {
    if (!currentDepartment) return;
    
    setLoading(true);
    try {
      const [fetchedColumns, fetchedTasks] = await Promise.all([
        getBoardColumns(currentDepartment.id),
        getTasks(currentDepartment.id, sprintId)
      ]);
      
      setColumns(fetchedColumns);
      setTasks(fetchedTasks);
    } catch (error) {
      console.error('Failed to load board data:', error);
    } finally {
      setLoading(false);
    }
  };
  
  const handleCreateTask = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!currentDepartment) return;
    setSavingTask(true);
    
    try {
      await createTask({
        title: taskTitle,
        description: taskDescription || null,
        department_id: currentDepartment.id,
        status: taskStatus,
        priority: taskPriority,
        assignee_id: taskAssignee || null,
        sprint_id: sprintId || null,
        story_points: taskStoryPoints ? parseInt(taskStoryPoints, 10) : null
      });
      
      resetTaskForm();
      setIsAddingTask(false);
      loadBoardData();
    } finally {
      setSavingTask(false);
    }
  };
  
  const handleUpdateTask = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!currentTask) return;
    setSavingTask(true);
    
    try {
      await updateTask(currentTask.id, {
        title: taskTitle,
        description: taskDescription,
        status: taskStatus,
        priority: taskPriority,
        assignee_id: taskAssignee || null,
        story_points: taskStoryPoints ? parseInt(taskStoryPoints, 10) : null
      });
      
      setIsEditingTask(false);
      setCurrentTask(null);
      loadBoardData();
    } finally {
      setSavingTask(false);
    }
  };
  
  const handleDeleteTask = async (taskId: string) => {
    if (!confirm('Are you sure you want to delete this task? This action cannot be undone.')) {
      return;
    }
    
    try {
      await deleteTask(taskId);
      setViewingTask(null);
      loadBoardData();
    } catch (error) {
      console.error('Failed to delete task:', error);
    }
  };
  
  const handleMoveTask = async (task: ScrumTask, newStatus: string) => {
    try {
      await updateTask(task.id, { status: newStatus });
      loadBoardData();
    } catch (error) {
      console.error('Failed to move task:', error);
    }
  };
  
  const openAddTask = (initialStatus?: string) => {
    resetTaskForm();
    if (initialStatus) setTaskStatus(initialStatus);
    setIsAddingTask(true);
  };
  
  const openEditTask = (task: ScrumTask) => {
    setCurrentTask(task);
    setTaskTitle(task.title);
    setTaskDescription(task.description || '');
    setTaskStatus(task.status);
    setTaskPriority(task.priority);
    setTaskAssignee(task.assignee_id || '');
    setTaskStoryPoints(task.story_points ? task.story_points.toString() : '');
    setIsEditingTask(true);
  };
  
  const resetTaskForm = () => {
    setTaskTitle('');
    setTaskDescription('');
    setTaskStatus(columns[0]?.name || 'To Do');
    setTaskPriority('Medium');
    setTaskAssignee('');
    setTaskStoryPoints('');
  };
  
  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'High':
        return <Badge variant="destructive" className="flex items-center gap-1"><ArrowUp className="w-3 h-3" /> High</Badge>;
      case 'Medium':
        return <Badge variant="default" className="flex items-center gap-1"><ArrowRight className="w-3 h-3" /> Medium</Badge>;
      case 'Low':
        return <Badge variant="outline" className="flex items-center gap-1"><ArrowDown className="w-3 h-3" /> Low</Badge>;
      default:
        return <Badge variant="secondary">{priority}</Badge>;
    }
  };
  
  if (loading) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald"></div>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <>
      <Card>
        <CardHeader className="pb-2 flex flex-row items-center justify-between">
          <CardTitle className="text-lg">
            {sprintId ? 'Sprint Tasks' : 'Backlog'}
          </CardTitle>
          <Button variant="emerald" size="sm" onClick={() => openAddTask()}>
            <Plus className="w-4 h-4 mr-2" />
            Add Task
          </Button>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col lg:flex-row gap-4 overflow-x-auto pb-4">
            {columns.map(column => (
              <div key={column.id} className="min-w-[280px] flex-1">
                <div className="bg-accent/50 rounded-md p-3 mb-3 flex items-center justify-between">
                  <h3 className="font-medium">{column.name}</h3>
                  <span className="text-xs text-muted-foreground px-2 py-1 bg-background rounded-full">
                    {tasks.filter(t => t.status === column.name).length}
                  </span>
                </div>
                
                <div className="space-y-3 min-h-[200px]">
                  {tasks
                    .filter(task => task.status === column.name)
                    .map(task => (
                      <div 
                        key={task.id} 
                        className="bg-white p-3 rounded-md shadow border cursor-pointer hover:shadow-md"
                        onClick={() => setViewingTask(task)}
                      >
                        <h4 className="font-medium mb-2">{task.title}</h4>
                        
                        <div className="flex items-center justify-between mb-3">
                          {getPriorityBadge(task.priority)}
                          
                          {task.story_points !== null && (
                            <span className="bg-muted text-xs font-medium px-2 py-1 rounded-full">
                              {task.story_points} points
                            </span>
                          )}
                        </div>
                        
                        {task.description && (
                          <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
                            {task.description}
                          </p>
                        )}
                        
                        <div className="flex justify-between items-center">
                          {task.assignee ? (
                            <div className="flex items-center gap-1">
                              <Avatar className="h-5 w-5">
                                <AvatarImage src={task.assignee.avatar_url || ""} alt={task.assignee.full_name || ""} />
                                <AvatarFallback>
                                  {(task.assignee.full_name || task.assignee.email).substring(0, 1)}
                                </AvatarFallback>
                              </Avatar>
                              <span className="text-xs truncate max-w-[120px]">
                                {task.assignee.full_name || task.assignee.email}
                              </span>
                            </div>
                          ) : (
                            <span className="text-xs text-muted-foreground flex items-center">
                              <User className="w-3 h-3 mr-1" />
                              Unassigned
                            </span>
                          )}
                          
                          <span className="text-xs text-muted-foreground">
                            {new Date(task.created_at).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    ))}
                    
                  {tasks.filter(t => t.status === column.name).length === 0 && (
                    <div 
                      className="border border-dashed border-muted-foreground/20 rounded-md p-6 flex flex-col items-center justify-center text-center min-h-[100px]"
                      onClick={() => openAddTask(column.name)}
                    >
                      <Plus className="w-5 h-5 text-muted-foreground/50 mb-2" />
                      <span className="text-xs text-muted-foreground">
                        Add a task
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      {/* Add Task Dialog */}
      <Dialog open={isAddingTask} onOpenChange={setIsAddingTask}>
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle>Add New Task</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleCreateTask} className="space-y-4 pt-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Task Title</label>
              <Input
                value={taskTitle}
                onChange={(e) => setTaskTitle(e.target.value)}
                placeholder="Enter task title"
                required
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Description</label>
              <Textarea
                value={taskDescription}
                onChange={(e) => setTaskDescription(e.target.value)}
                placeholder="Enter task description"
                rows={4}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Status</label>
                <Select value={taskStatus} onValueChange={setTaskStatus} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    {columns.map(column => (
                      <SelectItem key={column.id} value={column.name}>
                        {column.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Priority</label>
                <Select value={taskPriority} onValueChange={setTaskPriority}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="High">High</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="Low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Assignee</label>
                <Select value={taskAssignee} onValueChange={setTaskAssignee}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select assignee" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Unassigned</SelectItem>
                    {departmentMembers.map(member => (
                      <SelectItem key={member.profile_id} value={member.profile_id}>
                        {member.profile?.full_name || member.profile?.email}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Story Points</label>
                <Input
                  type="number"
                  value={taskStoryPoints}
                  onChange={(e) => setTaskStoryPoints(e.target.value)}
                  placeholder="Enter story points"
                  min="0"
                  max="100"
                />
              </div>
            </div>
            
            <div className="flex justify-end gap-2">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setIsAddingTask(false)}
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                variant="emerald"
                disabled={savingTask || !taskTitle || !taskStatus}
              >
                {savingTask ? "Creating..." : "Create Task"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
      
      {/* Edit Task Dialog */}
      <Dialog open={isEditingTask} onOpenChange={setIsEditingTask}>
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle>Edit Task</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleUpdateTask} className="space-y-4 pt-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Task Title</label>
              <Input
                value={taskTitle}
                onChange={(e) => setTaskTitle(e.target.value)}
                placeholder="Enter task title"
                required
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Description</label>
              <Textarea
                value={taskDescription}
                onChange={(e) => setTaskDescription(e.target.value)}
                placeholder="Enter task description"
                rows={4}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Status</label>
                <Select value={taskStatus} onValueChange={setTaskStatus} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    {columns.map(column => (
                      <SelectItem key={column.id} value={column.name}>
                        {column.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Priority</label>
                <Select value={taskPriority} onValueChange={setTaskPriority}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="High">High</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="Low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Assignee</label>
                <Select value={taskAssignee} onValueChange={setTaskAssignee}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select assignee" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Unassigned</SelectItem>
                    {departmentMembers.map(member => (
                      <SelectItem key={member.profile_id} value={member.profile_id}>
                        {member.profile?.full_name || member.profile?.email}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Story Points</label>
                <Input
                  type="number"
                  value={taskStoryPoints}
                  onChange={(e) => setTaskStoryPoints(e.target.value)}
                  placeholder="Enter story points"
                  min="0"
                  max="100"
                />
              </div>
            </div>
            
            <div className="flex justify-end gap-2">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setIsEditingTask(false)}
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                variant="emerald"
                disabled={savingTask || !taskTitle || !taskStatus}
              >
                {savingTask ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
      
      {/* View Task Dialog */}
      <Dialog open={!!viewingTask} onOpenChange={(open) => !open && setViewingTask(null)}>
        {viewingTask && (
          <DialogContent className="sm:max-w-[600px]">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-xl font-semibold mb-1">{viewingTask.title}</h2>
                <div className="flex items-center gap-2">
                  {getPriorityBadge(viewingTask.priority)}
                  <span className="text-xs bg-accent px-2 py-1 rounded-full">
                    {viewingTask.status}
                  </span>
                  {viewingTask.story_points !== null && (
                    <span className="text-xs bg-muted px-2 py-1 rounded-full">
                      {viewingTask.story_points} points
                    </span>
                  )}
                </div>
              </div>
              <div className="flex gap-2">
                {(isAdmin || viewingTask.assignee_id === user?.id) && (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={(e) => {
                      e.stopPropagation();
                      setViewingTask(null);
                      openEditTask(viewingTask);
                    }}
                  >
                    Edit
                  </Button>
                )}
                {isAdmin && (
                  <Button 
                    variant="destructive" 
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteTask(viewingTask.id);
                    }}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </div>
            
            <div className="space-y-4 pt-2">
              {viewingTask.description && (
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Description</h3>
                  <div className="bg-accent/50 p-3 rounded text-sm">
                    {viewingTask.description}
                  </div>
                </div>
              )}
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
                <div>
                  <h3 className="text-sm font-medium mb-1">Assignee</h3>
                  {viewingTask.assignee ? (
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={viewingTask.assignee.avatar_url || ""} alt={viewingTask.assignee.full_name || ""} />
                        <AvatarFallback>
                          {(viewingTask.assignee.full_name || viewingTask.assignee.email).substring(0, 1)}
                        </AvatarFallback>
                      </Avatar>
                      <span>{viewingTask.assignee.full_name || viewingTask.assignee.email}</span>
                    </div>
                  ) : (
                    <span className="text-sm text-muted-foreground">Unassigned</span>
                  )}
                </div>
                
                <div>
                  <h3 className="text-sm font-medium mb-1">Reporter</h3>
                  {viewingTask.reporter ? (
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={viewingTask.reporter.avatar_url || ""} alt={viewingTask.reporter.full_name || ""} />
                        <AvatarFallback>
                          {(viewingTask.reporter.full_name || viewingTask.reporter.email).substring(0, 1)}
                        </AvatarFallback>
                      </Avatar>
                      <span>{viewingTask.reporter.full_name || viewingTask.reporter.email}</span>
                    </div>
                  ) : (
                    <span className="text-sm text-muted-foreground">Unknown</span>
                  )}
                </div>
                
                <div>
                  <h3 className="text-sm font-medium mb-1">Created</h3>
                  <div className="flex items-center gap-1 text-sm">
                    <Calendar className="w-3 h-3" />
                    <span>{new Date(viewingTask.created_at).toLocaleDateString()}</span>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium mb-1">Updated</h3>
                  <div className="flex items-center gap-1 text-sm">
                    <Clock className="w-3 h-3" />
                    <span>{new Date(viewingTask.updated_at).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
              
              <div className="pt-4">
                <h3 className="text-sm font-medium mb-3">Move Task</h3>
                <div className="flex flex-wrap gap-2">
                  {columns.map(column => (
                    <Button
                      key={column.id}
                      variant={viewingTask.status === column.name ? "emerald" : "outline"}
                      size="sm"
                      disabled={viewingTask.status === column.name}
                      onClick={() => handleMoveTask(viewingTask, column.name)}
                    >
                      {column.name}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </>
  );
};
