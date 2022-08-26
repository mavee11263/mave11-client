import Link from "next/link";
import React from "react";

type Props = {};

const navigation = {
  social: [
    {
      name: "Facebook",
      href: "https://www.facebook.com/Mavee11-fun-page-101540095598092",
      icon: (
        props: JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>
      ) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path
            fillRule="evenodd"
            d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      name: "Twitter",
      href: "https://www.twitter.com/real_mavee11",
      icon: (
        props: JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>
      ) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
        </svg>
      ),
    },
  ],
};

const Footer = (props: Props) => {
  return (
    <div className="flex flex-col w-full bg-gray-100 dark:bg-gray-900">
      <p className="md:my-8 my-4 text-center text-sm text-gray-500 dark:text-gray-300">
        &copy; {new Date().getFullYear()} Mavee11 NSFW Pvt. Ltd{" "}
      </p>
      <nav className="pb-4 flex justify-center space-x-6">
        {navigation.social.map((item) => (
          <Link href={item.href} passHref key={item.name}>
            <a
              target="_blank"
              rel="noreferrer"
              className="text-gray-500 hover:text-gray-700"
            >
              <span className="sr-only">{item.name}</span>
              <item.icon className="h-8 w-8" aria-hidden="true" />
            </a>
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Footer;
