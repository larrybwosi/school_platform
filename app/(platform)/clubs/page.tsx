import { getClubs } from "@/actions/clubActions";
import { ClubCard } from "./components/club-card";
import { SearchFilters } from "./components/search-filters";
import { ClubStats } from "./components/club-stats";
import { Button } from "@/components/ui/button";
import {
  TrendingUp,
  Globe,
  Code,
  Palette,
  Microscope,
  Music,
  Book,
} from "lucide-react";

const categories = [
  { name: "All Categories", icon: <Globe className="w-4 h-4" /> },
  { name: "Technology", icon: <Code className="w-4 h-4" /> },
  { name: "Arts", icon: <Palette className="w-4 h-4" /> },
  { name: "Science", icon: <Microscope className="w-4 h-4" /> },
  { name: "Music", icon: <Music className="w-4 h-4" /> },
  { name: "Literature", icon: <Book className="w-4 h-4" /> },
];

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function ClubsOverview(props: { searchParams: SearchParams }) {
  const searchParams = await props?.searchParams;
  const clubs = await getClubs(searchParams);

  const totalMembers = clubs.reduce((sum, club) => sum + club.memberCount, 0);
  const totalCategories = new Set(clubs.map((club) => club.category)).size;
  const totalAchievements = clubs.reduce(
    (sum, club) => sum + club.achievements.length,
    0
  );

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-4xl font-bold">Explore Clubs</h1>
        <p className="text-gray-500">
          Discover and join amazing clubs that match your interests. Our diverse
          range of clubs offers something for everyone, from technology
          enthusiasts to art lovers and science explorers.
        </p>
      </div>

      {/* Club Statistics */}
      <ClubStats
        totalClubs={clubs.length}
        totalMembers={totalMembers}
        totalCategories={totalCategories}
        totalAchievements={totalAchievements}
      />

      {/* Search and Filters */}
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold">Find Your Perfect Club</h2>
        <p className="text-gray-500">
          Use the filters below to search for clubs by name, category, or
          popularity.
        </p>
        <SearchFilters searchParams={searchParams} />
      </div>

      {/* Quick Category Pills */}
      <div className="space-y-2">
        <h2 className="text-xl font-semibold">Quick Categories</h2>
        <div className="flex flex-wrap gap-2">
          {categories?.map((category) => (
            <Button
              key={category.name}
              variant={
                searchParams?.category === category?.name ? "default" : "outline"
              }
              className="rounded-full"
            >
              {category.icon}
              <span className="ml-2">{category.name}</span>
            </Button>
          ))}
        </div>
      </div>

      {/* Trending Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-primary" />
          <h2 className="text-2xl font-semibold">Trending Clubs</h2>
        </div>
        <p className="text-gray-500">
          Check out our most popular clubs that are making waves across campus!
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {clubs
            .filter((club) => club.isPopular)
            .map((club) => (
              <ClubCard key={club.id} club={club} />
            ))}
        </div>
      </div>

      {/* All Clubs Grid */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">All Clubs</h2>
        <p className="text-gray-500">
          Explore our full range of clubs and find the perfect fit for your
          interests and passions.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {clubs.map((club) => (
            <ClubCard key={club.id} club={club} />
          ))}
        </div>
      </div>
    </div>
  );
}
