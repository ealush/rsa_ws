import { FaTrash } from "react-icons/fa";
import styles from "./Contact.module.css";
import { prisma } from "../db/prismaClient";
import { revalidatePath } from "next/cache";

export function ButtonRemoveContact({ id }: { id: number }) {
  return (
    <form
      action={async () => {
        "use server";

        await prisma.contact.delete({
          where: { id },
        });

        revalidatePath("/");
      }}
    >
      <button className={styles.actionButton} title="Remove Contact">
        <FaTrash />
      </button>
    </form>
  );
}
