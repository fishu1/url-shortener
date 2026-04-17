import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

function generateSlug() {
  return Math.random().toString(36).substring(2, 8);
}

export async function POST(request: NextRequest) {
  const { url } = await request.json();

  if (!url) {
    return NextResponse.json({ error: "URL lipsește" }, { status: 400 });
  }

  const slug = generateSlug();

  const entry = await prisma.url.create({
    data: { slug, url },
  });

  return NextResponse.json({ slug: entry.slug });
}