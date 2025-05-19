import clsx from "clsx";

interface TextareaProps {
  isFocused: boolean;
  setIsFocused: React.Dispatch<React.SetStateAction<boolean>>;
  content: string;
  setContent: (_: string) => void;
}

export default function Textarea({
  isFocused,
  setIsFocused,
  content,
  setContent,
}: TextareaProps) {
  return (
    <div className="flex flex-col gap-2">
      <p className="text-b2 text-black">내용</p>
      <textarea
        placeholder="이곳에 남기고 싶은 이야기를 적어보세요!"
        className={clsx(
          "h-[150px] rounded-xl border bg-white px-4 py-[10px] outline-none",
          isFocused ? "border-green-active" : "border-gray-2"
        )}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        maxLength={200}
      />
      <p className="text-end text-footnote text-gray-3">{content.length}/200</p>
    </div>
  );
}
