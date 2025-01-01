'use client';
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  Search,
  Users,
  Calendar,
  Trophy,
  Palette,
  Code,
  Microscope,
  Music,
  Book,
  Heart,
  Globe,
  Camera,
  Radio,
  ChevronRight,
  Star,
  TrendingUp,
} from "lucide-react";

// Mock data for clubs
const mockClubs = [
  {
    id: "1",
    name: "Robotics Club",
    category: "Technology",
    description:
      "Join us in building the future! Our robotics club combines engineering, programming, and creativity to design and construct innovative robots. From competitive robotics to experimental projects, we offer hands-on experience in mechanical design, electronics, and coding.",
    memberCount: 45,
    meetingSchedule: "Tuesdays and Thursdays",
    icon: <Code className="w-6 h-6" />,
    achievements: ["Regional Champions 2024", "Best Innovation Award"],
    tags: ["Engineering", "Programming", "Competition"],
    isPopular: true,
    activeProjects: 3,
    teacherAdvisor: "Dr. Sarah Johnson",
    established: "2022",
  },
  {
    id: "2",
    name: "Art & Design Society",
    category: "Arts",
    description:
      "Express yourself through various mediums! Our art club explores different styles and techniques, from traditional painting to digital art. Regular workshops, exhibitions, and collaborative projects provide opportunities to develop your artistic skills and showcase your creativity.",
    memberCount: 32,
    meetingSchedule: "Mondays and Wednesdays",
    icon: <Palette className="w-6 h-6" />,
    achievements: ["School Mural Project", "City Art Exhibition"],
    tags: ["Drawing", "Painting", "Digital Art"],
    isPopular: true,
    activeProjects: 2,
    teacherAdvisor: "Ms. Emily Chen",
    established: "2021",
  },
  {
    id: "3",
    name: "Science Explorers",
    category: "Science",
    description:
      "Discover the wonders of science through hands-on experiments and research projects. We dive into various scientific fields, conduct experiments, and participate in science fairs. Perfect for curious minds who love to question and explore!",
    memberCount: 38,
    meetingSchedule: "Fridays",
    icon: <Microscope className="w-6 h-6" />,
    achievements: ["Science Fair Gold Medal", "Environmental Project Award"],
    tags: ["Experiments", "Research", "Discovery"],
    isPopular: false,
    activeProjects: 4,
    teacherAdvisor: "Mr. James Wilson",
    established: "2023",
  },
  {
    id: "4",
    name: "Music Ensemble",
    category: "Music",
    description:
      "From classical to contemporary, our music club brings together passionate musicians to create beautiful harmonies. Regular performances, practice sessions, and music theory workshops help develop well-rounded musicians.",
    memberCount: 25,
    meetingSchedule: "Wednesdays and Fridays",
    icon: <Music className="w-6 h-6" />,
    achievements: ["Winter Concert Series", "City Music Festival Performance"],
    tags: ["Performance", "Practice", "Theory"],
    isPopular: false,
    activeProjects: 2,
    teacherAdvisor: "Ms. Maria Garcia",
    established: "2022",
  },
];

const categories = [
  { name: "All Categories", icon: <Globe className="w-4 h-4" /> },
  { name: "Technology", icon: <Code className="w-4 h-4" /> },
  { name: "Arts", icon: <Palette className="w-4 h-4" /> },
  { name: "Science", icon: <Microscope className="w-4 h-4" /> },
  { name: "Music", icon: <Music className="w-4 h-4" /> },
  { name: "Literature", icon: <Book className="w-4 h-4" /> },
  { name: "Sports", icon: <Trophy className="w-4 h-4" /> },
  { name: "Photography", icon: <Camera className="w-4 h-4" /> },
  { name: "Broadcasting", icon: <Radio className="w-4 h-4" /> },
  { name: "Volunteering", icon: <Heart className="w-4 h-4" /> },
];

const ClubCard = ({ club }) => {
  return (
    <Card className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
      <CardHeader className="relative">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10 text-primary">
              {club.icon}
            </div>
            <div>
              <CardTitle className="group-hover:text-primary transition-colors">
                {club.name}
              </CardTitle>
              <CardDescription>{club.category}</CardDescription>
            </div>
          </div>
          {club.isPopular && (
            <div className="flex items-center gap-1 text-yellow-600 bg-yellow-50 px-2 py-1 rounded-full text-sm">
              <Star className="w-4 h-4 fill-yellow-600" />
              <span>Popular</span>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-gray-600 line-clamp-3">{club.description}</p>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-gray-500" />
            <span>{club.memberCount} members</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-gray-500" />
            <span>{club.meetingSchedule}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {club.tags.map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-primary/5 text-primary rounded-full text-xs"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="pt-4 flex justify-between items-center">
          <div className="text-sm text-gray-500">Est. {club.established}</div>
          <Button
            variant="ghost"
            className="group-hover:translate-x-1 transition-transform"
          >
            View Club
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

const ClubsOverview = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [sortBy, setSortBy] = useState("popular");

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-4xl font-bold">Explore Clubs</h1>
        <p className="text-gray-500">
          Discover and join amazing clubs that match your interests
        </p>
      </div>

      {/* Search and Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search clubs..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger>
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category.name} value={category.name}>
                <div className="flex items-center gap-2">
                  {category.icon}
                  <span>{category.name}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger>
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="popular">Most Popular</SelectItem>
            <SelectItem value="newest">Newest First</SelectItem>
            <SelectItem value="oldest">Oldest First</SelectItem>
            <SelectItem value="members">Most Members</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Quick Category Pills */}
      <div className="flex flex-wrap gap-2">
        {categories.slice(0, 6).map((category) => (
          <Button
            key={category.name}
            variant={selectedCategory === category.name ? "default" : "outline"}
            className="rounded-full"
            onClick={() => setSelectedCategory(category.name)}
          >
            {category.icon}
            <span className="ml-2">{category.name}</span>
          </Button>
        ))}
      </div>

      {/* Trending Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-primary" />
          <h2 className="text-xl font-semibold">Trending Clubs</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockClubs
            .filter((club) => club.isPopular)
            .map((club) => (
              <ClubCard key={club.id} club={club} />
            ))}
        </div>
      </div>

      {/* All Clubs Grid */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">All Clubs</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockClubs.map((club) => (
            <ClubCard key={club.id} club={club} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClubsOverview;
