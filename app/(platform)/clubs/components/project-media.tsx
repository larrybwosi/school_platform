import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MediaItem } from "../types/club"

export function ProjectMedia({ mediaItems }: { mediaItems: MediaItem[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Media Gallery</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {mediaItems.map((item) => (
            <div key={item.id} className="relative group">
              {item.type === 'IMAGE' ? (
                <img src={item.url} alt={item.caption} className="w-full h-48 object-cover rounded-lg" />
              ) : (
                <video src={item.url} className="w-full h-48 object-cover rounded-lg" />
              )}
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <p className="text-white text-center p-2">{item.caption}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

