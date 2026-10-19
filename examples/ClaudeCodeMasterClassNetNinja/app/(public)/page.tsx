// this page should be used only as a splash page to decide where a user should be navigated to
// when logged in --> to /heists
// when not logged in --> to /login

import { Clock8 } from "lucide-react";

export default function Home() {
  return (
    <div className="center-content">
      <div className="page-content">
        <h1>
          P<Clock8 className="logo" strokeWidth={2.75} />
          cket Heist
        </h1>
        <div>SMALL TASKS MAXIMUM CHAOS</div>
        <p className="mt-6 text-body max-w-md text-center">
          Welcome to Pocket Heist — the ultimate platform for planning covert
          office missions. Assign sneaky tasks to your colleagues, track your
          active heists, and rise through the ranks of workplace mischief.
          Whether it&apos;s swapping desk items or organizing a surprise, every
          heist starts here.
        </p>
      </div>
    </div>
  );
}
