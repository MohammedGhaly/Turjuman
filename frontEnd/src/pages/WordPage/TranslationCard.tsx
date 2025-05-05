// import { useTranslationPage } from "@/contexts/TranslationProvider";
import capitalize from "../../utils/capitalize";
import WordList from "../../components/Wordlist";

const aiicon = (
  <svg
    width="27"
    height="28"
    viewBox="0 0 27 28"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M18.6159 18.7172L17.5545 21.2654C17.1465 22.2449 15.8535 22.2449 15.4455 21.2654L14.3841 18.7172C13.4393 16.4495 11.7393 14.6442 9.61844 13.6577L6.69669 12.2984C5.76777 11.8663 5.76777 10.45 6.69669 10.0178L9.52688 8.70072C11.7022 7.68869 13.433 5.81663 14.3613 3.47159L15.4366 0.755791C15.8355 -0.25193 17.1639 -0.25193 17.5631 0.755791L18.6384 3.47159C19.5667 5.81663 21.2975 7.68869 23.4728 8.70072L26.3033 10.0178C27.2322 10.45 27.2322 11.8663 26.3033 12.2984L23.3816 13.658C21.2604 14.6442 19.5604 16.4495 18.6159 18.7172Z"
      fill="url(#paint0_radial_1_628)"
    />
    <path
      d="M5.89131 26.905L5.58319 27.6119C5.3575 28.1294 4.64151 28.1294 4.41615 27.6119L4.10804 26.905C3.55886 25.645 2.5691 24.6417 1.33467 24.0928L0.385144 23.6709C-0.128381 23.4425 -0.128381 22.6957 0.385144 22.4678L1.28169 22.0693C2.54816 21.5064 3.55526 20.4658 4.09528 19.163L4.41157 18.3992C4.63203 17.8669 5.36764 17.8669 5.5881 18.3992L5.90472 19.163C6.44474 20.4658 7.45184 21.5064 8.71831 22.0693L9.61486 22.4678C10.1284 22.6961 10.1284 23.4429 9.61486 23.6709L8.66532 24.0928C7.42992 24.6414 6.44049 25.645 5.89131 26.905Z"
      fill="url(#paint1_radial_1_628)"
    />
    <defs>
      <radialGradient
        id="paint0_radial_1_628"
        cx="0"
        cy="0"
        r="1"
        gradientUnits="userSpaceOnUse"
        gradientTransform="translate(22.4418 12.2168) rotate(79.3585) scale(17.1568 16.4308)"
      >
        <stop stopColor="#1BA1E3" />
        <stop offset="0.3002" stopColor="#5489D6" />
        <stop offset="0.5455" stopColor="#9B72CB" />
        <stop offset="0.8254" stopColor="#D96570" />
        <stop offset="1" stopColor="#F49C46" />
      </radialGradient>
      <radialGradient
        id="paint1_radial_1_628"
        cx="0"
        cy="0"
        r="1"
        gradientUnits="userSpaceOnUse"
        gradientTransform="translate(-0.342393 12.5802) rotate(78.8645) scale(16.936 16.9349)"
      >
        <stop stopColor="#1BA1E3" />
        <stop offset="0.3002" stopColor="#5489D6" />
        <stop offset="0.5455" stopColor="#9B72CB" />
        <stop offset="0.8254" stopColor="#D96570" />
        <stop offset="1" stopColor="#F49C46" />
      </radialGradient>
    </defs>
  </svg>
);

interface Props {
  original: string;
  synonymsTarget: string[];
  synonymsSource: string[];
}

function TranslationCard({ original, synonymsSource, synonymsTarget }: Props) {
  return (
    <div className="rounded-xl px-4 pt-5 pb-3 font-bold text-xl md:text-3xl flex flex-col gap-2 justify-between bg-[var(--outer-boxes-bg)] border border-[var(--box-border)]">
      <div className="flex justify-between w-full mb-1 md:mb-4">
        <div>Translation</div>
        <div className=" flex gap-2 items-center justify-between">
          <span>{original ? capitalize(original) : ""}</span>
          <span>{aiicon}</span>
        </div>
      </div>

      <WordList words={synonymsTarget || []} />
      <span className="text-sm text-[var(--shaded-text)] md:text-base">
        synonyms
      </span>
      <WordList words={synonymsSource || []} />
    </div>
  );
}

export default TranslationCard;
