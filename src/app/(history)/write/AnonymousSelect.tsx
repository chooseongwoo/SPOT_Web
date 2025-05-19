import { CheckedIcon, UncheckedIcon } from "@/components/icons";

interface AnonymousSelectProps {
  isAnonymous: boolean;
  setIsAnonymous: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function AnonymousSelect({
  isAnonymous,
  setIsAnonymous,
}: AnonymousSelectProps) {
  return (
    <div className="flex flex-col gap-2">
      <p className="text-b2 text-black">익명 여부</p>
      <div className="flex gap-20">
        <div
          className="flex cursor-pointer items-center gap-[5px]"
          onClick={() => setIsAnonymous(true)}
        >
          {isAnonymous === true ? <CheckedIcon /> : <UncheckedIcon />}
          <p className="text-b2 text-black">익명</p>
        </div>
        <div
          className="flex cursor-pointer items-center gap-[5px]"
          onClick={() => setIsAnonymous(false)}
        >
          {isAnonymous === false ? <CheckedIcon /> : <UncheckedIcon />}
          <p className="text-b2 text-black">닉네임</p>
        </div>
      </div>
    </div>
  );
}
