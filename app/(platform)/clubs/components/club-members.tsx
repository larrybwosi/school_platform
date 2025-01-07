import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Member } from "@/types/club"

export function ClubMembers({ members }: { members: Member[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Club Members</CardTitle>
        <CardDescription>All active members of the club</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="divide-y">
          {members.map((member) => (
            <div
              key={member.id}
              className="py-4 flex items-center justify-between hover:bg-gray-50 px-4 rounded-lg"
            >
              <div>
                <h3 className="text-lg font-medium text-gray-900">{member.name}</h3>
                <p className="text-gray-500">{member.email}</p>
              </div>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                {member.role}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

