"use server";
import { redirect } from "next/navigation";
import { prisma } from "../db/prismaClient";
import { setTimeout } from "node:timers/promises";
import suite from "../validations/validateContact";
import { SuiteSerializer } from "vest/exports/SuiteSerializer";

export async function upsertContact(formData: FormData) {
  const data = {
    firstName: formData.get("firstName") as string,
    lastName: formData.get("lastName") as string,
    phoneNumber: formData.get("phoneNumber") as string,
    email: formData.get("email") as string,
  };

  const result = suite.runStatic({
    firstName: data.firstName,
    lastName: data.lastName,
    phoneNumber: data.phoneNumber,
    email: data.email,
  });

  if (result.hasErrors()) {
    return SuiteSerializer.serialize(result);
  }

  await setTimeout(1500);

  await prisma.contact.upsert({
    where: {
      id: Number(formData.get("id")),
    },
    update: data,
    create: data,
  });

  redirect("/");
}
