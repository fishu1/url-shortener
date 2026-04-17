import { redirect } from "next/navigation";
import { PrismaClient } from "@prisma/client";

export default async function RedirectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const prisma = new PrismaClient();
  const entry = await prisma.url.findUnique({
    where: { slug }
  })
  if (!entry) {
    return <div>URL nu a fost găsit.</div>
  }
  redirect(entry.url)
}