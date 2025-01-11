import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface Stat {
  label: string;
  value: string | number;
  trend: string;
  trendType?: "positive" | "negative" | "neutral";
}

export function AnalyticsSummary({ stats }: { stats: Stat[] }) {
  return (
    <Card className="border-none shadow-lg bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm transition-all duration-300 hover:shadow-xl">
      <CardHeader>
        <CardTitle className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
          Quick Stats
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="group flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all duration-200"
            >
              <span className="text-sm text-gray-600 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                {stat.label}
              </span>
              <div className="flex items-center gap-3">
                <span className="font-semibold text-gray-900 dark:text-white">
                  {stat.value}
                </span>
                <Badge
                  variant={
                    stat.trendType === "positive"
                      ? "success"
                      : stat.trendType === "negative"
                      ? "destructive"
                      : "secondary"
                  }
                  className="animate-fade-in"
                >
                  {stat.trend}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}


