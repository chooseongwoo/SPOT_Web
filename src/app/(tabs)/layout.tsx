import { BottomTabBar } from "@/components/common";

export default function TabsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main>
      {children}
      <BottomTabBar />
    </main>
  );
}
