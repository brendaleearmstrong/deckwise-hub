import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  CalendarDays,
  Plus,
  Clock,
  MapPin,
  Users,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import { useState } from "react";

const Scheduler = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Project Scheduler</h1>
            <p className="text-slate-600 mt-2">Manage project timelines, tasks, and team schedules</p>
          </div>
          <Button className="bg-primary hover:bg-primary/90">
            <Plus className="h-4 w-4 mr-2" />
            Schedule Task
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Scheduled Today</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">6</div>
              <p className="text-xs text-slate-600 mt-1">Tasks due today</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">This Week</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">18</div>
              <p className="text-xs text-slate-600 mt-1">Upcoming tasks</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">In Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">12</div>
              <p className="text-xs text-slate-600 mt-1">Active tasks</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Overdue</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">3</div>
              <p className="text-xs text-slate-600 mt-1">Need attention</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="timeline" className="w-full">
          <TabsList>
            <TabsTrigger value="timeline">Timeline View</TabsTrigger>
            <TabsTrigger value="calendar">Calendar View</TabsTrigger>
            <TabsTrigger value="tasks">Task List</TabsTrigger>
            <TabsTrigger value="team">Team Schedule</TabsTrigger>
          </TabsList>

          <TabsContent value="timeline" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Project Timeline</CardTitle>
                <CardDescription>Upcoming tasks and milestones</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {scheduledTasks.map((task) => (
                  <div key={task.id} className="flex items-start gap-4 pb-4 border-b last:border-0 last:pb-0">
                    <div className="flex flex-col items-center gap-1 min-w-[80px]">
                      <div className="text-sm font-semibold text-slate-900">{task.date}</div>
                      <div className="text-xs text-slate-600">{task.time}</div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <div>
                          <h4 className="font-semibold text-slate-900 mb-1">{task.title}</h4>
                          <p className="text-sm text-slate-600 mb-2">{task.description}</p>
                          <div className="flex flex-wrap gap-2 text-sm">
                            <span className="flex items-center gap-1 text-slate-600">
                              <MapPin className="h-3 w-3" />
                              {task.location}
                            </span>
                            <span className="flex items-center gap-1 text-slate-600">
                              <Users className="h-3 w-3" />
                              {task.team}
                            </span>
                          </div>
                        </div>
                        <Badge variant={
                          task.status === "completed" ? "default" :
                          task.status === "in-progress" ? "secondary" :
                          task.status === "overdue" ? "destructive" : "outline"
                        }>
                          {task.status === "completed" && <CheckCircle2 className="h-3 w-3 mr-1" />}
                          {task.status === "overdue" && <AlertCircle className="h-3 w-3 mr-1" />}
                          {task.status}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="calendar" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Calendar</CardTitle>
                  <CardDescription>Select a date to view scheduled tasks</CardDescription>
                </CardHeader>
                <CardContent className="flex justify-center">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="rounded-md border"
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Selected Day</CardTitle>
                  <CardDescription>
                    {date ? date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) : 'No date selected'}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="p-3 bg-slate-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="h-4 w-4 text-primary" />
                      <span className="font-medium text-sm">8:00 AM - 12:00 PM</span>
                    </div>
                    <p className="text-sm text-slate-600">Foundation inspection - Johnson Deck</p>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="h-4 w-4 text-primary" />
                      <span className="font-medium text-sm">1:00 PM - 5:00 PM</span>
                    </div>
                    <p className="text-sm text-slate-600">Install deck boards - Martinez Project</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="tasks" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>All Tasks</CardTitle>
                <CardDescription>Complete list of scheduled tasks</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {scheduledTasks.map((task) => (
                    <div key={task.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-slate-50 transition-colors">
                      <div className="flex items-center gap-3">
                        <input type="checkbox" className="h-4 w-4" />
                        <div>
                          <div className="font-medium">{task.title}</div>
                          <div className="text-sm text-slate-600">{task.date} at {task.time}</div>
                        </div>
                      </div>
                      <Badge variant={
                        task.status === "completed" ? "default" :
                        task.status === "in-progress" ? "secondary" :
                        task.status === "overdue" ? "destructive" : "outline"
                      }>
                        {task.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="team" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Team Availability</CardTitle>
                <CardDescription>View team member schedules and availability</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {teamMembers.map((member) => (
                    <div key={member.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <Users className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <div className="font-medium">{member.name}</div>
                          <div className="text-sm text-slate-600">{member.role}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge variant={member.available ? "default" : "secondary"}>
                          {member.available ? "Available" : "Busy"}
                        </Badge>
                        <div className="text-xs text-slate-600 mt-1">{member.taskCount} tasks this week</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

const scheduledTasks = [
  {
    id: 1,
    title: "Foundation Pour - Johnson Deck",
    description: "Pour concrete footings for deck posts",
    date: "Dec 10",
    time: "8:00 AM",
    location: "Johnson Residence",
    team: "3 workers",
    status: "scheduled"
  },
  {
    id: 2,
    title: "Frame Installation - Martinez Pergola",
    description: "Install main frame and support beams",
    date: "Dec 10",
    time: "1:00 PM",
    location: "Martinez Property",
    team: "2 workers",
    status: "in-progress"
  },
  {
    id: 3,
    title: "Final Inspection - Wilson Deck",
    description: "Final walkthrough and quality check",
    date: "Dec 9",
    time: "10:00 AM",
    location: "Wilson Estate",
    team: "1 inspector",
    status: "overdue"
  },
  {
    id: 4,
    title: "Material Delivery - Thompson Project",
    description: "Receive and organize lumber delivery",
    date: "Dec 11",
    time: "7:00 AM",
    location: "Thompson Home",
    team: "2 workers",
    status: "scheduled"
  },
  {
    id: 5,
    title: "Deck Board Installation - Lee Project",
    description: "Install composite deck boards",
    date: "Dec 12",
    time: "8:00 AM",
    location: "Lee Property",
    team: "4 workers",
    status: "scheduled"
  }
];

const teamMembers = [
  {
    id: 1,
    name: "Mike Johnson",
    role: "Lead Carpenter",
    available: true,
    taskCount: 5
  },
  {
    id: 2,
    name: "Sarah Martinez",
    role: "Project Manager",
    available: false,
    taskCount: 8
  },
  {
    id: 3,
    name: "Tom Wilson",
    role: "Carpenter",
    available: true,
    taskCount: 4
  },
  {
    id: 4,
    name: "Lisa Chen",
    role: "Quality Inspector",
    available: true,
    taskCount: 3
  }
];

export default Scheduler;
