import { getMessages } from "@/app/actions/getMessages";
import Pager from "../../components/Pager";
import { setTimeout } from "node:timers/promises";

export default async function PagerContainer({
  contactId,
}: {
  contactId: number;
}) {
  await setTimeout(3000);

  const messages = await getMessages(contactId);

  return <Pager contactId={contactId} initialMessages={messages} />;
}
