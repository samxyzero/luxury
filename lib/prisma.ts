import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@/lib/generated/prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClient;
  pgPool?: Pool;
};

/**
 * Neon suspends idle compute and its pooler recycles connections, so a pool
 * that holds sockets open eventually hands out one the server has already
 * closed — surfacing as "Server has closed the connection". Keeping our idle
 * timeout well below Neon's, plus TCP keep-alive, means we drop connections
 * before they go stale rather than discovering it mid-query.
 */
function createPool() {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    max: 10,
    idleTimeoutMillis: 10_000,
    connectionTimeoutMillis: 10_000,
    keepAlive: true,
  });

  // Without this, an error on an idle client is an unhandled 'error' event on
  // the pool, which takes the process down instead of just retiring the client.
  pool.on("error", (error) => {
    console.error("[prisma] idle client error (connection retired):", error.message);
  });

  return pool;
}

function createPrismaClient() {
  const pool = globalForPrisma.pgPool ?? createPool();
  if (process.env.NODE_ENV !== "production") globalForPrisma.pgPool = pool;
  return new PrismaClient({ adapter: new PrismaPg(pool) });
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
