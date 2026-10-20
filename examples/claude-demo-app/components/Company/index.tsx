"use client";

import { motion } from "framer-motion";
import SectionHeader from "@/components/Common/SectionHeader";

const companyHighlights = [
  {
    id: 1,
    label: "8 materials",
    detail: "worked in the current catalog, from cedar to brass.",
  },
  {
    id: 2,
    label: "Small batches",
    detail: "Every piece is finished by hand, not mass-produced.",
  },
  {
    id: 3,
    label: "Built to last",
    detail: "Designed to look better with age, not worse.",
  },
];

const Company = () => {
  return (
    <section className="overflow-hidden py-20 lg:py-25 xl:py-30">
      <div className="mx-auto max-w-c-1235 px-4 md:px-8 xl:px-0">
        <SectionHeader
          headerInfo={{
            title: "ABOUT SOLID",
            subtitle: "Objects that are honest about what they're made of",
            description:
              "Solid started as a small workshop experimenting with one material at a time. A few years on, we're still doing the same thing: pick a material, learn what it does well, and build one good object around it.",
          }}
        />

        <div className="mt-12.5 grid grid-cols-1 gap-7.5 md:grid-cols-3">
          {companyHighlights.map((item) => (
            <motion.div
              key={item.id}
              variants={{
                hidden: {
                  opacity: 0,
                  y: -10,
                },

                visible: {
                  opacity: 1,
                  y: 0,
                },
              }}
              initial="hidden"
              whileInView="visible"
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="rounded-md border border-stroke p-7.5 dark:border-strokedark dark:bg-blacksection"
            >
              <h3 className="text-lg font-semibold text-black dark:text-white">
                {item.label}
              </h3>
              <p className="mt-2 text-sm text-waterloo dark:text-manatee">
                {item.detail}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Company;
