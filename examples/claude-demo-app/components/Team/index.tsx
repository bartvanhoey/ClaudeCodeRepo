"use client";

import SectionHeader from "@/components/Common/SectionHeader";
import SingleTeamMember from "./SingleTeamMember";
import teamData from "./teamData";

const Team = () => {
  return (
    <section className="py-20 lg:py-25 xl:py-30">
      <div className="mx-auto max-w-c-1235 px-4 md:px-8 xl:px-0">
        <SectionHeader
          headerInfo={{
            title: "THE TEAM",
            subtitle: "The people behind the workshop",
            description:
              "A small team that's hands-on with every piece that ships.",
          }}
        />

        <div className="mt-12.5 grid grid-cols-1 gap-7.5 md:grid-cols-2 lg:mt-15 lg:grid-cols-4 xl:mt-20">
          {teamData.map((member) => (
            <SingleTeamMember member={member} key={member.id} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;
