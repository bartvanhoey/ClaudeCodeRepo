// @vitest-environment node
import { test, expect, vi, beforeEach } from "vitest";
import { SignJWT } from "jose";

// Mock "server-only" so it doesn't throw in the test environment
vi.mock("server-only", () => ({}));

// Shared mutable cookie store used across tests
const cookieStore = {
  _data: new Map<string, string>(),
  get(name: string) {
    const value = this._data.get(name);
    return value !== undefined ? { value } : undefined;
  },
  set(name: string, value: string) {
    this._data.set(name, value);
  },
  delete(name: string) {
    this._data.delete(name);
  },
};

vi.mock("next/headers", () => ({
  cookies: () => Promise.resolve(cookieStore),
}));

// Import after mocks are set up
const { createSession, getSession, deleteSession, verifySession } =
  await import("@/lib/auth");

const JWT_SECRET = new TextEncoder().encode("development-secret-key");

beforeEach(() => {
  cookieStore._data.clear();
});

// Helper to mint a valid token with a given payload
async function mintToken(
  payload: Record<string, unknown>,
  expiresIn = "7d"
): Promise<string> {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime(expiresIn)
    .setIssuedAt()
    .sign(JWT_SECRET);
}

// --- createSession ---

test("createSession sets an auth-token cookie", async () => {
  await createSession("user-1", "alice@example.com");
  expect(cookieStore._data.has("auth-token")).toBe(true);
});

test("createSession stores a verifiable JWT containing userId and email", async () => {
  await createSession("user-1", "alice@example.com");

  const token = cookieStore._data.get("auth-token")!;
  const { jwtVerify } = await import("jose");
  const { payload } = await jwtVerify(token, JWT_SECRET);

  expect(payload.userId).toBe("user-1");
  expect(payload.email).toBe("alice@example.com");
});

test("createSession sets cookie with httpOnly, sameSite, and path options", async () => {
  const setCalls: Array<[string, string, object]> = [];
  const originalSet = cookieStore.set.bind(cookieStore);
  cookieStore.set = (name: string, value: string, options?: object) => {
    setCalls.push([name, value, options ?? {}]);
    originalSet(name, value);
  };

  await createSession("user-x", "x@example.com");

  expect(setCalls).toHaveLength(1);
  const [, , options] = setCalls[0];
  expect(options).toMatchObject({
    httpOnly: true,
    sameSite: "lax",
    path: "/",
  });

  // Restore
  cookieStore.set = originalSet;
});

test("createSession sets a cookie that expires ~7 days from now", async () => {
  const before = Date.now();
  await createSession("user-exp", "exp@example.com");
  const after = Date.now();

  const token = cookieStore._data.get("auth-token")!;
  const { jwtVerify } = await import("jose");
  const { payload } = await jwtVerify(token, JWT_SECRET);

  const exp = (payload.exp as number) * 1000;
  const sevenDaysMs = 7 * 24 * 60 * 60 * 1000;

  expect(exp).toBeGreaterThanOrEqual(before + sevenDaysMs - 1000);
  expect(exp).toBeLessThanOrEqual(after + sevenDaysMs + 1000);
});

test("createSession overwrites any existing auth-token cookie", async () => {
  await createSession("user-a", "a@example.com");
  const firstToken = cookieStore._data.get("auth-token");

  await createSession("user-b", "b@example.com");
  const secondToken = cookieStore._data.get("auth-token");

  expect(secondToken).not.toBe(firstToken);

  const { jwtVerify } = await import("jose");
  const { payload } = await jwtVerify(secondToken!, JWT_SECRET);
  expect(payload.userId).toBe("user-b");
  expect(payload.email).toBe("b@example.com");
});

test("createSession works with special characters in email", async () => {
  await createSession("user-special", "user+tag@sub.example.co.uk");

  const token = cookieStore._data.get("auth-token")!;
  const { jwtVerify } = await import("jose");
  const { payload } = await jwtVerify(token, JWT_SECRET);

  expect(payload.email).toBe("user+tag@sub.example.co.uk");
});

test("createSession signs token with HS256 algorithm", async () => {
  await createSession("user-alg", "alg@example.com");

  const token = cookieStore._data.get("auth-token")!;
  const [headerB64] = token.split(".");
  const header = JSON.parse(Buffer.from(headerB64, "base64url").toString());

  expect(header.alg).toBe("HS256");
});

// --- getSession ---

test("getSession returns null when no cookie is present", async () => {
  const session = await getSession();
  expect(session).toBeNull();
});

test("getSession returns the session payload for a valid token", async () => {
  const token = await mintToken({
    userId: "user-2",
    email: "bob@example.com",
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
  });
  cookieStore._data.set("auth-token", token);

  const session = await getSession();
  expect(session).not.toBeNull();
  expect(session!.userId).toBe("user-2");
  expect(session!.email).toBe("bob@example.com");
});

test("getSession returns null for an expired token", async () => {
  const token = await mintToken(
    { userId: "user-3", email: "expired@example.com" },
    "-1s" // already expired
  );
  cookieStore._data.set("auth-token", token);

  const session = await getSession();
  expect(session).toBeNull();
});

test("getSession returns null for a tampered token", async () => {
  cookieStore._data.set("auth-token", "not.a.valid.jwt");

  const session = await getSession();
  expect(session).toBeNull();
});

// --- deleteSession ---

test("deleteSession removes the auth-token cookie", async () => {
  cookieStore._data.set("auth-token", "some-token");

  await deleteSession();

  expect(cookieStore._data.has("auth-token")).toBe(false);
});

test("deleteSession is a no-op when no cookie exists", async () => {
  await expect(deleteSession()).resolves.not.toThrow();
});

// --- verifySession ---

test("verifySession returns null when request has no auth-token cookie", async () => {
  const { NextRequest } = await import("next/server");
  const request = new NextRequest("http://localhost/");

  const session = await verifySession(request);
  expect(session).toBeNull();
});

test("verifySession returns session payload for a valid token in the request", async () => {
  const token = await mintToken({
    userId: "user-4",
    email: "carol@example.com",
    expiresAt: new Date().toISOString(),
  });

  const { NextRequest } = await import("next/server");
  const request = new NextRequest("http://localhost/", {
    headers: { cookie: `auth-token=${token}` },
  });

  const session = await verifySession(request);
  expect(session).not.toBeNull();
  expect(session!.userId).toBe("user-4");
  expect(session!.email).toBe("carol@example.com");
});

test("verifySession returns null for an expired token in the request", async () => {
  const token = await mintToken(
    { userId: "user-5", email: "dave@example.com" },
    "-1s"
  );

  const { NextRequest } = await import("next/server");
  const request = new NextRequest("http://localhost/", {
    headers: { cookie: `auth-token=${token}` },
  });

  const session = await verifySession(request);
  expect(session).toBeNull();
});

test("verifySession returns null for a tampered token in the request", async () => {
  const { NextRequest } = await import("next/server");
  const request = new NextRequest("http://localhost/", {
    headers: { cookie: "auth-token=garbage.token.value" },
  });

  const session = await verifySession(request);
  expect(session).toBeNull();
});
