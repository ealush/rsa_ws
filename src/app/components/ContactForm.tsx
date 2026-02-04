"use client";

import styles from "./ContactForm.module.css";
import FormInput from "./FormInput";
import PageLayout, { Content, Header } from "./PageLayout";
import Link from "next/link";
import { Submit } from "./Submit";
import { upsertContact } from "../actions/upsertContact";
import { ChangeEvent, useActionState, useState } from "react";
import suite from "../validations/validateContact";
import { SuiteSerializer } from "vest/exports/SuiteSerializer";

type ContactFormProps = {
  initialData?: {
    id?: number;
    firstName: string | null;
    lastName: string | null;
    phoneNumber: string | null;
    email: string | null;
  };
  title: string;
};

export default function ContactForm({ initialData, title }: ContactFormProps) {
  const [, setResult] = useState(suite.get());
  const [, formAction] = useActionState(upsert, null);

  async function upsert(_: unknown, formData: FormData) {
    const response = await upsertContact(formData);

    if (response) {
      return SuiteSerializer.resume(suite, response);
    }
  }

  function handleChange(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const { name, value } = e.target;

    const result = suite.focus({ only: name }).run({ [name]: value });

    setResult(result);
  }

  return (
    <PageLayout>
      <Header title={title} />
      <Content>
        <form className={styles.form} id="contact-form" action={formAction}>
          <input type="hidden" name="id" value={initialData?.id} />
          <div className={styles.formContent}>
            <FormInput
              label="First Name"
              type="text"
              id="firstName"
              name="firstName"
              defaultValue={initialData?.firstName}
              message={suite.getError("firstName")}
              onChange={handleChange}
            />

            <FormInput
              label="Last Name"
              type="text"
              id="lastName"
              name="lastName"
              defaultValue={initialData?.lastName}
              message={suite.getError("lastName")}
              onChange={handleChange}
            />

            <FormInput
              label="Phone Number"
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              defaultValue={initialData?.phoneNumber}
              message={suite.getError("phoneNumber")}
              onChange={handleChange}
            />

            <FormInput
              label="Email"
              type="email"
              id="email"
              name="email"
              defaultValue={initialData?.email}
              message={suite.getError("email")}
              onChange={handleChange}
            />
          </div>
          <div className={styles.formActions}>
            <Submit label={"Save"} />
            <Link href="/" className={styles.cancelButton}>
              Cancel
            </Link>
          </div>
        </form>
      </Content>
    </PageLayout>
  );
}
