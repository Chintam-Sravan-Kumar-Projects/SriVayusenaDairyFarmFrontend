import React from "react";

import projectLogo from "../../assets/Logo/logo.png";
export default function About() {
  return (
    <div id="about" className="py-16 bg-white">
      <div className="container m-auto px-6 text-gray-600 md:px-12 xl:px-6">
        <div className="space-y-6 md:space-y-0 md:flex md:gap-6 lg:items-center lg:gap-12">
          <div className="md:5/12 lg:w-4/12">
            <img src={projectLogo} alt="image" />
          </div>
          <div className="md:7/12 lg:w-6/12">
            <h2 className="text-2xl text-gray-900 font-bold md:text-4xl">
              Dairy Software for Mobile & Computer
            </h2>
            <p className="mt-6 text-gray-600">
            A responsive web application for dairy management, designed for efficient milk sales.
             The solution supports Bulk Milk selling operations, catering to mobile dairies, milkmen, and automated milk selling units.
             This streamlined platform enhances milk delivery and management processes, ensuring seamless operations.
            </p>
            <p className="mt-4 text-gray-600">
            Complete Solution for Milk collection center.Simple Dairy software for mobile dairy. Milk delivery solution. 
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
