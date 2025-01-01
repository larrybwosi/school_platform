import { ChevronRight } from 'lucide-react'

export function QuickActions() {
  const actions = [
    "View Schedule",
    "Submit Assignment",
    "Book Consultation",
    "View Reports",
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {actions.map((action, index) => (
        <button
          key={index}
          className="flex items-center justify-center space-x-2 bg-card p-4 rounded-lg shadow-sm hover:bg-accent hover:text-accent-foreground transition-colors"
        >
          <span>{action}</span>
          <ChevronRight className="h-4 w-4" />
        </button>
      ))}
    </div>
  )
}

