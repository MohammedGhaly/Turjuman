import { FlashCardType } from "@/types/FlashCard";
import apiClient from "./api_client";

const generateFlashcardsEndpoint = "api/v1/flashcards/generate";

export async function generateFlashcards() {
  const response = await apiClient.get(generateFlashcardsEndpoint, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.status !== 200) throw Error("request failed");
  const data: FlashCardType[] = response.data.flashcards;
  console.log("data=> ", data);
  return data;
}
