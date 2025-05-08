import { useTranslationPage } from "@/contexts/TranslationProvider";
import { toast } from "@/hooks/use-toast";
import { translateImage } from "@/services/translationClient";
import { AxiosError } from "axios";
import { File, Image, Mic } from "lucide-react";
import { useRef } from "react";

function TranslationInputOptions() {
  const imgRef = useRef<HTMLInputElement>(null);
  const { srcLang, targetLang, setImgTranslationResult } = useTranslationPage();

  const handleImgClick = () => {
    imgRef.current?.click();
    // console.log(imgRef.current);
    // console.log("clicked");
  };

  const handleImgChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        const { original_text, translated_text } = await translateImage(
          file,
          srcLang,
          targetLang
        );
        if (original_text && translated_text) {
          setImgTranslationResult?.(original_text, translated_text);
        } else {
          toast({
            title: "an error occurred while translating your image",
            variant: "destructive",
          });
        }
      } catch (err) {
        if (err instanceof AxiosError || err instanceof Error) {
          toast({ title: err.message, variant: "destructive" });
        }
      }
    }
  };

  return (
    <div className="w-full">
      <div className="flex gap-6 items-center justify-center md:gap-20">
        <button className="border border-gray-300 rounded-full p-2 hover:shadow-lg transition-all duration-200">
          <File className="w-10 h-10 md:w-12 md:h-12" strokeWidth={1} />
        </button>
        <button className="border border-gray-300 rounded-full p-2 hover:shadow-lg transition-all duration-200">
          <Mic className="w-10 h-10 md:w-12 md:h-12" strokeWidth={1} />
        </button>
        <button
          onClick={handleImgClick}
          className="border border-gray-300 rounded-full p-2 hover:shadow-lg transition-all duration-200"
        >
          <Image className="w-10 h-10 md:w-12 md:h-12" strokeWidth={1} />
        </button>
        <input
          ref={imgRef}
          type="file"
          className="hidden"
          accept="image/*"
          onChange={handleImgChange}
        />
      </div>
    </div>
  );
}

export default TranslationInputOptions;
