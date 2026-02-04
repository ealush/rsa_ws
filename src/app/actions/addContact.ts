"use server";

import { redirect } from "next/navigation";
import { prisma } from "../db/prismaClient";

export async function addContact(formData: FormData) {
  const firstName = formData.get("firstName") as string;
  const lastName = formData.get("lastName") as string;
  const phoneNumber = formData.get("phoneNumber") as string;
  const email = formData.get("email") as string;

  await prisma.contact.create({
    data: {
      firstName,
      lastName,
      phoneNumber,
      email,
    },
  });

  redirect("/");
}
