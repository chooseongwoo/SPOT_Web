import { Header } from "@/components";

export default function NoticePage() {
  return (
    <div className="flex flex-col h-screen">
      <Header title="공지사항" />
      <div className="flex-1 p-6 overflow-y-auto">
        <h1 className="text-h1 text-black mb-4">공지사항</h1>
        <div className="bg-white rounded-xl shadow-md p-6 mb-4">
          <h2 className="text-t2 font-semibold text-black mb-2">서비스 점검 안내</h2>
          <p className="text-b2 text-gray-6">안녕하세요, SPOT입니다.</p>
          <p className="text-b2 text-gray-6">보다 안정적인 서비스 제공을 위해 시스템 점검이 진행될 예정입니다.</p>
          <p className="text-b2 text-gray-6">점검 시간 동안 서비스 이용이 일시적으로 제한될 수 있으니 양해 부탁드립니다.</p>
          <p className="text-b2 text-gray-6 mt-2">점검 일시: 2025년 7월 25일 (목) 02:00 ~ 04:00 (KST)</p>
          <p className="text-b2 text-gray-6">이용에 불편을 드려 죄송합니다.</p>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6 mb-4">
          <h2 className="text-t2 font-semibold text-black mb-2">새로운 기능 출시!</h2>
          <p className="text-b2 text-gray-6">SPOT에 새로운 기능이 추가되었습니다!</p>
          <p className="text-b2 text-gray-6">이제 타임캡슐 메시지에 좋아요를 누를 수 있습니다. 많은 이용 부탁드립니다.</p>
          <p className="text-b2 text-gray-6 mt-2">자세한 내용은 앱 내 공지사항을 확인해주세요.</p>
        </div>
      </div>
    </div>
  );
}
