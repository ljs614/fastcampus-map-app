import { StoreApiResponse } from "@/interface";
import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<StoreApiResponse>
) {
  const prisma = new PrismaClient();

  const { page = "1" }: { page?: string } = req.query;
  const skipPage = parseInt(page) - 1;

  const count = await prisma.store.count();
  const stores = await prisma.store.findMany({
    orderBy: { id: "desc" },
    take: 10,
    skip: skipPage * 10,
  });

  res.status(200).json({
    page: parseInt(page),
    data: stores,
    totalCount: count,
    totalPage: Math.ceil(count / 10),
  });
}
