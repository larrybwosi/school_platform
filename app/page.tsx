import AboutSections from "@/components/home/about";
import AchievementHighlights from "@/components/home/archievements";
import KeyFeatures from "@/components/home/features";
import HeroSection from "@/components/home/hero";

export default function HorizonAcademy() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 relative overflow-hidden">
      <HeroSection />
      <KeyFeatures />
      <AboutSections />
      <AchievementHighlights />
    </main>
  )
}
