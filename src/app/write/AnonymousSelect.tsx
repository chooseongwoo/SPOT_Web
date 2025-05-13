import { Checked, Unchecked } from "@/components/icons";

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
      <p className="text-black text-b2">익명 여부</p>
      <div className="flex gap-20">
        <div
          className="flex gap-[5px] items-center cursor-pointer"
          onClick={() => setIsAnonymous(true)}
        >
          {isAnonymous === true ? <Checked /> : <Unchecked />}
          <p className="text-black text-b2">익명</p>
        </div>
        <div
          className="flex gap-[5px] items-center cursor-pointer"
          onClick={() => setIsAnonymous(false)}
        >
          {isAnonymous === false ? <Checked /> : <Unchecked />}
          <p className="text-black text-b2">닉네임</p>
        </div>
      </div>
    </div>
  );
}
