/* eslint-disable @next/next/no-img-element */
"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ShowsResponse } from "@/lib/shows.response";
import Link from "next/link";
import { useQueryState } from "nuqs";
import { useMemo } from "react";

function isAfter(date: string) {
  const now = new Date();
  const releaseAt = new Date(date);
  return releaseAt > now;
}

function daysLeft(date: string) {
  const now = new Date();
  const releaseAt = new Date(date);
  const diff = releaseAt.getTime() - now.getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

export function Content({ shows }: { shows: ShowsResponse }) {
  const [genre, setGenre] = useQueryState("genre", {
    defaultValue: "all",
  });

  const genres = useMemo(() => {
    const set: Set<string> = new Set();
    for (const show of shows.shows) {
      for (const genre of show.genres) {
        set.add(genre);
      }
    }
    return set;
  }, [shows]);

  const showsToShow = useMemo(() => {
    return shows.shows
      .filter((show) => {
        if (genre === "all") return true;
        return show.genres.includes(genre);
      })
      .sort((a, b) => {
        const aDate = a.releaseAt?.at(0) ?? "";
        const bDate = b.releaseAt?.at(0) ?? "";
        return new Date(aDate).getTime() - new Date(bDate).getTime();
      });
  }, [genre, shows.shows]);

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Films</h1>
          <p className="text-sm text-muted-foreground">
            Alle films die in de toekomst komen #ikwilmeerhorrorszien
          </p>
        </div>

        <Select onValueChange={(value) => setGenre(value)} value={genre}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Kies een genre" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Genres</SelectLabel>
              <SelectItem value="all">Alles</SelectItem>
              {Array.from(genres).map((genre) => (
                <SelectItem key={genre} value={genre}>
                  {genre}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {showsToShow.map((show) => (
          <Card key={show.slug} className="flex flex-col h-full">
            <CardHeader className="flex-none space-y-2">
              <CardTitle className="line-clamp-2">{show.title}</CardTitle>
              <CardDescription className="line-clamp-2">
                {show.directors?.join(", ") || "No director listed"}{" "}
                {isAfter(show.releaseAt?.at(0) ?? "")
                  ? "releasing"
                  : "released"}{" "}
                at {show.releaseAt?.join(", ") || "No release date"}
                {isAfter(show.releaseAt?.at(0) ?? "") &&
                  ` (${daysLeft(show.releaseAt?.at(0) ?? "")} days left)`}
              </CardDescription>

              <div className="flex flex-wrap gap-2">
                {show.genres.map((genre) => (
                  <Badge key={genre} variant="secondary">
                    {genre}
                  </Badge>
                ))}

                {isAfter(show.releaseAt?.at(0) ?? "") && (
                  <Badge variant="destructive">Upcoming</Badge>
                )}
              </div>
            </CardHeader>
            <CardContent className="flex-1 p-4">
              {show.posterPath?.lg ? (
                <img
                  src={show.posterPath.lg}
                  alt={show.title}
                  className="w-full h-[400px] object-cover rounded-lg"
                />
              ) : (
                <div
                  className="w-full h-[400px] rounded-lg"
                  style={{
                    backgroundColor: show.backgroundDominantColor ?? "gray",
                  }}
                />
              )}
            </CardContent>
            <CardFooter className="flex-none pt-4">
              <Button asChild className="w-full">
                <Link href={`https://www.pathe.nl/nl/films/${show.slug}`}>
                  Bekijk op pathe
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
