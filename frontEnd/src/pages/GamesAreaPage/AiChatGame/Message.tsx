interface Props {
  message: string;
  sender: "user" | "ai";
}

function Message({ message, sender }: Props) {
  return (
    <p
      className={`${
        sender === "ai"
          ? "self-start bg-[var(--ai-msg-bg)]"
          : "self-end bg-[var(--user-msg-bg)]"
      } p-4 rounded-lg text-[var(--foreground)] text-base max-w-[80%] break-words`}
    >
      {message}
    </p>
  );
}

export default Message;
