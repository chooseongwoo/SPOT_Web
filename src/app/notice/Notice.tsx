"use client";

import { useGetNotices } from "@/services/notice/query";
import { formatToKST } from "@/utils";

export default function Notice() {
  const { data: notices } = useGetNotices();

  return (
    <div className="w-full">
      {notices?.map((notice) => (
        <div
          key={notice.id}
          className="shadow-sm rounded-xl border border-gray-100 bg-white p-5"
        >
          <div className="mb-2 flex items-center justify-between">
            <h2 className="text-t3 font-semibold text-black">{notice.title}</h2>
            <span className="text-footnote text-gray-400">
              {formatToKST(notice.created_at, "YYYY.MM.DD")}
            </span>
          </div>
          <p className="relative whitespace-pre-line text-wrap pl-4 text-b2 text-gray-700">
            <span className="absolute left-0 top-0 text-green-default">❝</span>
            {notice.content}
          </p>
        </div>
      ))}
    </div>
  );
}
