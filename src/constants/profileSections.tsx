import { ProfileSection } from "@/types";

const profileSections: ProfileSection[] = [
  {
    title: "기록",
    items: [
      { label: "내가 남긴 기록", showChevron: true },
      { label: "발견한 기록", showChevron: true },
    ],
  },
  {
    title: "기타",
    items: [
      { label: "알림", showChevron: true },
      { label: "약관 및 개인정보 처리방침", showChevron: true },
      { label: "고객센터", showChevron: true },
      {
        custom: (
          <div className="flex items-center justify-between py-3">
            <div className="flex flex-col gap-[7px]">
              <p className="text-b2 text-gray-5">현재 버전</p>
              <p className="text-cap1 text-green-default">1.0.0</p>
            </div>
            <p className="text-b3 text-gray-4">최신버전</p>
          </div>
        ),
      },
    ],
  },
  {
    title: null,
    items: [
      {
        label: "로그아웃",
        className: "text-red",
        showChevron: false,
        actionKey: "signOut",
      },
      {
        label: "회원탈퇴",
        className: "text-red",
        showChevron: false,
        actionKey: "deleteUser",
      },
    ],
  },
];

export default profileSections;
