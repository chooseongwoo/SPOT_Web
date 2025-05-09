import { ChevronIcon } from "@/components/icons";
import Image from "next/image";

export default function EmptyHistory() {
  return (
    <div className="flex h-[calc(100%-25.2px)] flex-col items-center gap-[10px] pt-[120px]">
      <Image
        alt="메시지 이미지"
        src="/images/MessageImage.png"
        width={90}
        height={40}
      />
      <div className="felx-col flex gap-3">
        <div className="flex flex-col items-center">
          <p className="text-headline text-gray-4">
            주변에 남겨진 기록이 없어요...
          </p>
          <p className="text-footnote text-gray-4">
            내가 제일 먼저 기록을 남겨볼까요?
          </p>
        </div>
      </div>
      <button className="flex items-center gap-[2px] rounded-xl bg-green-default px-3 py-[14px] text-btn3 text-white">
        기록 남기러 가기
        <ChevronIcon direction="right" size={18} color="#fff" />
      </button>
    </div>
  );
}
