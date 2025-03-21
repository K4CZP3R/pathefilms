import { Content } from "./content";

export default async function Page() {
  const shows = await fetch("https://www.pathe.nl/api/shows?language=nl", {
    next: {
      revalidate: 60 * 60 * 24,
    },
  }).then((res) => res.json());

  return <Content shows={shows} />;
}
