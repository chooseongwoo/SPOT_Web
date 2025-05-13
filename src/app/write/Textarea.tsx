import clsx from "clsx";

interface TextareaProps {
  isFocused: boolean;
  setIsFocused: React.Dispatch<React.SetStateAction<boolean>>;
  content: string;
  setContent: React.Dispatch<React.SetStateAction<string>>;
}

export default function Textarea({
  isFocused,
  setIsFocused,
  content,
  setContent,
}: TextareaProps) {
  return (
    <div className="flex flex-col gap-2">
      <p className="text-black text-b2">내용</p>
      <textarea
        placeholder="이곳에 남기고 싶은 이야기를 적어보세요!"
        className={clsx(
          "py-[10px] px-4 border outline-none rounded-xl bg-white h-[150px]",
          isFocused ? "border-green-active" : "border-gray-2"
        )}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        maxLength={200}
      />
      <p className="text-gray-3 text-footnote text-end">{content.length}/200</p>
    </div>
  );
}
