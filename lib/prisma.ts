import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";

// Verhindere mehrfaches Initialisieren im Entwicklungsmodus
// let prisma: PrismaClient;
const prisma = new PrismaClient().$extends(withAccelerate());

// if (process.env.NODE_ENV === "production") {
//   prisma = new PrismaClient();
// } else {
//   if (!(global as any).prisma) {
//     (global as any).prisma = new PrismaClient();
//   }
//   prisma = (global as any).prisma;
// }

export default prisma;
