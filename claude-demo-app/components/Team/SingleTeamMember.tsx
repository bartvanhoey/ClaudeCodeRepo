import { motion } from "framer-motion";
import { TeamMember } from "@/types/team";

const SingleTeamMember = ({ member }: { member: TeamMember }) => {
  const { name, role, bio, initials } = member;

  return (
    <motion.div
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
      className="rounded-md border border-white bg-white p-7.5 shadow-solid-3 dark:border-strokedark dark:bg-blacksection"
    >
      <div className="flex h-15 w-15 items-center justify-center rounded-full bg-zumthor text-metatitle2 font-semibold text-primary dark:bg-blackho dark:text-meta">
        {initials}
      </div>
      <h3 className="mt-5 text-lg font-semibold text-black dark:text-white">
        {name}
      </h3>
      <p className="text-sm font-medium text-primary dark:text-meta">{role}</p>
      <p className="mt-2 text-sm text-waterloo dark:text-manatee">{bio}</p>
    </motion.div>
  );
};

export default SingleTeamMember;
