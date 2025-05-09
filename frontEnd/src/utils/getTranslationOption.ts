import {
  getAudioTranslation,
  translateFile,
  translateImage,
} from "@/services/translationClient";

export default function getTranslationOption(
  fileName: string,
  isAudio: boolean
) {
  if (isAudio) {
    return getAudioTranslation;
  } else if (fileName.endsWith(".docx") || fileName.endsWith(".txt"))
    return translateFile;
  else return translateImage;
}
