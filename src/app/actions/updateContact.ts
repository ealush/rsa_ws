"use server";

import { redirect } from "next/navigation";
import { prisma } from "../db/prismaClient";

export async function updateContact(formData: FormData) {
  const id = formData.get("id") as string;
  const firstName = formData.get("firstName") as string;
  const lastName = formData.get("lastName") as string;
  const phoneNumber = formData.get("phoneNumber") as string;
  const email = formData.get("email") as string;

  await prisma.contact.update({
    where: {
      id: Number(id),
    },
    data: {
      firstName,
      lastName,
      phoneNumber,
      email,
    },
  });

  redirect("/");
}
