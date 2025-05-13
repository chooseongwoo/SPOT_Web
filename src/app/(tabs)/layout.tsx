import { BottomTabBar } from "@/components";

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
