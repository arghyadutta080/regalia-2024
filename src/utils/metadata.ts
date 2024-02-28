import { Metadata } from "next";

export function constructMetaData({
  title = "Regalia 2024",
  description = "Regalia is the official cultural fest of RCCIIT.",
  image = "/thumbnail.png", // put a thumbnail.png in public folder, resolution 1200x630
  authors = {
    name: "Regalia RCCIIT Team",
    url: "https://regalia.rcciit.org.in/",
  },
  creator = "REGALIA RCCIIT Team",
  generator = "Next.js",
  publisher = "REGALIA",
  icons = "/favicon.ico",
  robots = "index, follow",
}: {
  title?: string;
  description?: string;
  image?: string;
  authors?: { name: string; url: string };
  creator?: string;
  generator?: string;
  publisher?: string;
  icons?: string;
  robots?: string;
} = {}): Metadata {
  return {
    title,
    description,
    authors,
    creator,
    generator,
    publisher,
    openGraph: {
      title,
      description,
      images: [
        {
          url: image,
        },
      ],
    },
    // twitter: {
    //   card: "summary_large_image",
    //   title,
    //   description,
    //   images: [image],
    //   creator: "@",
    // },
    icons,
    metadataBase: new URL("https://regalia.rcciit.org.in/"),
    robots,
  };
}
