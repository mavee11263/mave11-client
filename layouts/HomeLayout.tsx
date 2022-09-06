import Head from "next/head";
import React from "react";
import Footer from "../components/Navigation/Footer";
import Navbar from "../components/Navigation/Navbar";
import { data } from "../utils/data";

interface Props {
  title?: string;
  description?: string;
  icon?: any;
  children?: any;
  canonical_url?: string;
  og_image?: any;
  og_url?: string;
}

const OG_IMAGE =
  "https://res.cloudinary.com/trolliey/image/upload/v1656413519/trolliey%20static%20images/home_og_image_rwubje.jpg";

function HomeLayout({
  children,
  title,
  description,
  canonical_url,
  og_image,
  og_url,
}: Props) {
  return (
    <div>
      <Head>
        <title>{title ? `${title} | Mavee11 ` : data.original_title}</title>
        <meta
          name="description"
          content={
            description
              ? description.replace(/<[^>]*>?/gm, "")
              : data.description
          }
        />
        {/* // facebook and whatapp meta tags */}
        <meta property="og:type" content="website" />
        <meta
          name="og:title"
          property="og:title"
          content={title ? `${title} | Mavee11` : data.original_title}
        />
        <meta
          name="og:description"
          property="og:description"
          content={
            description
              ? description.replace(/<[^>]*>?/gm, "")
              : data.description
          }
        />
        <meta property="og:site_name" content={data.site_url} />
        <meta
          property="og:url"
          content={`${data.site_url}/${og_url ? og_url : ""}`}
        />
        <meta
          property="og:image"
          content={og_image ? og_image : "/images/icon.png"}
        />
        <meta
          property="og:image:alt"
          content="Product and site representation on link"
        />
        <meta property="og:image:width" content="2500" />
        <meta property="og:image:height" content="1330" />
        {/* // twitter tags */}
        <meta name="twitter:card" content="summary" />
        <meta
          name="twitter:title"
          content={title ? `${title} | Mavee11` : "Mavee11 | NSFW"}
        />
        <meta
          name="twitter:description"
          content={description?.replace(/<[^>]*>?/gm, "")}
        />
        <meta name="twitter:site" content="" />
        <meta name="twitter:creator" content="" />
        <meta name="twitter:image" content={og_image ? og_image : OG_IMAGE} />
        <meta property="og:locale" content="en_US" />
        <meta property="og:locale:alternate" content="en_GB" />
        <meta property="og:locale:alternate" content="cn_CN" />

        <link rel="icon" type="image/png" href="/images/icon.png" />
        <link rel="shortcut icon" type="image/png" href="/images/icon.png" />
        <link rel="apple-touch-icon" href="/images/icon.png" />
        <link rel="canonical" href={`${data.site_url}/${og_url}`} />
      </Head>
      <div className="dark:bg-gray-800 bg-white flex flex-col w-full">
        <header className="flex">
          <Navbar />
        </header>
        <main className="min-h-screen">{children}</main>
        <footer>
          <Footer />
        </footer>
      </div>
      {/* // cookies Modal */}
    </div>
  );
}

export default HomeLayout;
