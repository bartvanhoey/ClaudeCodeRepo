import "@testing-library/jest-dom/vitest";
import { afterEach } from "vitest";
import { cleanup } from "@testing-library/react";

afterEach(cleanup);

class IntersectionObserverStub {
  observe() {}
  unobserve() {}
  disconnect() {}
}

window.IntersectionObserver =
  window.IntersectionObserver ?? (IntersectionObserverStub as unknown as typeof IntersectionObserver);
