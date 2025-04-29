import BottomNav from "@/components/common/TabNavigationBar";

export default function TabsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main>
      {children}
      <BottomNav />
    </main>
  );
}
