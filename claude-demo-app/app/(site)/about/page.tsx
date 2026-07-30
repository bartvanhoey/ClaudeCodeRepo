import React from "react";
import Company from "@/components/Company";
import Team from "@/components/Team";
import Products from "@/components/Products";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Page - Solid SaaS Boilerplate",

  // other metadata
  description: "This is About page for Solid Pro"
};

const AboutPage = () => {
  return (
    <div className="pb-20 pt-40">
      <Company />
      <Team />
      <Products />
    </div>
  );
};

export default AboutPage;
