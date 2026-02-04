"use server";
import { redirect } from "next/navigation";
import { prisma } from "../db/prismaClient";

export async function upsertContact(formData: FormData) {
  const data = {
    firstName: formData.get("firstName") as string,
    lastName: formData.get("lastName") as string,
    phoneNumber: formData.get("phoneNumber") as string,
    email: formData.get("email") as string,
  };

  await prisma.contact.upsert({
    where: {
      id: Number(formData.get("id")),
    },
    update: data,
    create: data,
  });

  redirect("/");
}
