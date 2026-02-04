"use client";

import React, { useState, useEffect, useCallback, useActionState } from "react";
import styles from "./pager.module.css";

import clsx from "clsx";
import { sendMessage } from "../actions/sendMessage";

interface Message {
  id: number;
  content: string;
  timestamp: string;
  contactId: number;
}

type Messages = Message[];

interface PagerProps {
  contactId: number;
}

export default function Pager({ contactId }: PagerProps) {
  const [messages, setMessages] = useState<Messages>([]);
  const [, formAction, isPending] = useActionState(send, null);

  async function send(_: unknown, formData: FormData) {
    const message = await sendMessage(formData);

    setMessages((prev) => [message, ...prev] as Messages);
  }

  const fetchMessages = useCallback(
    async function fetchMessages() {
      const response = await fetch(`/api/contacts/${contactId}/message`);

      const data: Messages = await response.json();
      setMessages(data);
    },
    [contactId],
  );

  useEffect(() => {
    if (contactId) {
      fetchMessages();
    } else {
      setMessages([]);
    }
  }, [contactId, fetchMessages]);

  return (
    <div className={styles.pagerContainer}>
      <h3>📟 Pager</h3>

      <div className={styles.messageList}>
        {messages.map((msg) => (
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
    <div className={clsx(styles.messageItem)}>
      <p className={styles.messageContent}>{msg.content}</p>
      <span className={styles.messageTimestamp}>
        {formatTimestamp(msg.timestamp)}
      </span>
    </div>
  );
}
