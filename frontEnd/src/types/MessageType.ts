export default interface MessageType {
  sender: "user" | "ai";
  text: string;
}
