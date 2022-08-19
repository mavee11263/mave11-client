import React from "react";

type Props = {};

const Footer = (props: Props) => {
  return (
    <div className="flex flex-col w-full bg-gray-100">
      <p className="md:my-8 my-4 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} Mavee11 NSFW Pvt. Ltd{" "}
      </p>
    </div>
  );
};

export default Footer;
