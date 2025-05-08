import { useTranslationPage } from "@/contexts/TranslationProvider";
import { File, Image, Mic } from "lucide-react";
import { useRef } from "react";

function TranslationInputOptions() {
  const imgRef = useRef<HTMLInputElement>(null);
  const docRef = useRef<HTMLInputElement>(null);
  const { optionTranslate } = useTranslationPage();

  const handleImgClick = () => {
    imgRef.current?.click();
  };

  const handleImgChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) optionTranslate?.(file);
  };

  const handleDocClick = () => {
    docRef.current?.click();
  };

  const handleDocChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) optionTranslate?.(file);
  };

  return (
    <div className="w-full">
      <div className="flex gap-6 items-center justify-center md:gap-20">
        <button
          onClick={handleDocClick}
          className="border border-gray-300 rounded-full p-2 hover:shadow-lg transition-all duration-200"
        >
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
        <input
          ref={docRef}
          type="file"
          className="hidden"
          accept=".txt,.docx"
          onChange={handleDocChange}
        />
      </div>
    </div>
  );
}

export default TranslationInputOptions;
