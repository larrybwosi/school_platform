import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Highlight } from "@/types/club"

export function ProjectHighlights({ highlights }: { highlights: Highlight[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Project Highlights</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {highlights.map((highlight) => (
            <Card key={highlight.id}>
              <CardHeader>
                <CardTitle className="text-lg">{highlight.title}</CardTitle>
                <p className="text-sm text-muted-foreground">{highlight.date.toLocaleDateString()}</p>
              </CardHeader>
              <CardContent>
                <p>{highlight.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

