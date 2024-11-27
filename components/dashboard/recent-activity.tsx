import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const activities = [
  {
    user: {
      name: "John Smith",
      image: "/avatars/01.png",
      email: "john.smith@example.com",
    },
    action: "submitted an assignment",
    course: "Mathematics 101",
    time: "2 minutes ago",
  },
  {
    user: {
      name: "Sarah Johnson",
      image: "/avatars/02.png",
      email: "sarah.j@example.com",
    },
    action: "posted a new announcement",
    course: "English Literature",
    time: "1 hour ago",
  },
  {
    user: {
      name: "Michael Brown",
      image: "/avatars/03.png",
      email: "m.brown@example.com",
    },
    action: "updated course materials",
    course: "Physics Advanced",
    time: "3 hours ago",
  },
  {
    user: {
      name: "Emily Davis",
      image: "/avatars/04.png",
      email: "emily.d@example.com",
    },
    action: "graded assignments",
    course: "Chemistry Lab",
    time: "5 hours ago",
  },
];

export function RecentActivity() {
  return (
    <div className="space-y-8">
      {activities.map((activity, index) => (
        <div key={index} className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarImage src={activity.user.image} alt="Avatar" />
            <AvatarFallback>
              {activity.user.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">
              {activity.user.name}
            </p>
            <p className="text-sm text-muted-foreground">
              {activity.action} in {activity.course}
            </p>
            <p className="text-xs text-muted-foreground">{activity.time}</p>
          </div>
        </div>
      ))}
    </div>
  );
}