"use client";

import React, { useActionState, useOptimistic } from "react";
import styles from "./pager.module.css";

import clsx from "clsx";
import { sendMessage } from "../actions/sendMessage";

interface Message {
  id: number;
  content: string;
  timestamp: string;
  contactId: number;
  optimistic?: boolean;
}

type Messages = Message[];

interface PagerProps {
  contactId: number;
  initialMessages: Messages;
}

export default function Pager({ contactId, initialMessages }: PagerProps) {
  const [messages, formAction, isPending] = useActionState(
    send,
    initialMessages,
  );
  const [optimisticMessages, addOptimisticMessage] = useOptimistic(
    messages,
    (prev: Messages, newMessage: Message) => {
      return [newMessage, ...prev];
    },
  );

  async function send(prev: Messages, formData: FormData) {
    addOptimisticMessage({
      id: Date.now(),
      content: formData.get("content") as string,
      contactId: contactId,
      timestamp: new Date().toISOString(),
      optimistic: true,
    });

    const message = await sendMessage(formData);

    return [message, ...prev];
  }

  return (
    <div className={styles.pagerContainer}>
      <h3>📟 Pager</h3>

      <div className={styles.messageList}>
        {optimisticMessages.map((msg) => (
          <MessageItem key={msg.id} msg={msg} />
        ))}
      </div>
      <form className={styles.messageForm} action={formAction}>
        <input type="hidden" name="id" value={contactId} />
        <input
          type="text"
          placeholder="Type your message..."
          className={styles.messageInput}
          aria-label="New message input"
          name="content"
        />
        <button
          type="submit"
          className={styles.sendButton}
          disabled={isPending}
        >
          Send
        </button>
      </form>
    </div>
  );
}

function MessageItem({ msg }: { msg: Message }) {
  const formatTimestamp = (isoString: string): string => {
    return new Date(isoString).toLocaleString();
  };

  return (
    <div
      className={clsx(styles.messageItem, msg.optimistic && styles.optimistic)}
    >
      <p className={styles.messageContent}>{msg.content}</p>
      <span className={styles.messageTimestamp}>
        {msg.optimistic ? "Just now" : formatTimestamp(msg.timestamp)}
      </span>
    </div>
  );
}
