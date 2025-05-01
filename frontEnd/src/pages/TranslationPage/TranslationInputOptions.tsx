import { File, Image, Mic } from "lucide-react";

function TranslationInputOptions() {
  return (
    <div className="w-full">
      <div className="flex gap-6 items-center justify-center md:gap-20">
        <button className="border border-gray-300 rounded-full p-2 hover:shadow-lg transition-all duration-200">
          <File className="w-10 h-10 md:w-12 md:h-12" strokeWidth={1} />
        </button>
        <button className="border border-gray-300 rounded-full p-2 hover:shadow-lg transition-all duration-200">
          <Mic className="w-10 h-10 md:w-12 md:h-12" strokeWidth={1} />
        </button>
        <button className="border border-gray-300 rounded-full p-2 hover:shadow-lg transition-all duration-200">
          <Image className="w-10 h-10 md:w-12 md:h-12" strokeWidth={1} />
        </button>
      </div>
    </div>
  );
}

export default TranslationInputOptions;
