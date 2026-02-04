import { getMessages } from "@/app/actions/getMessages";
import Pager from "../../components/Pager";

export default async function PagerContainer({
  contactId,
}: {
  contactId: number;
}) {
  const messages = await getMessages(contactId);

  return <Pager contactId={contactId} initialMessages={messages} />;
}
