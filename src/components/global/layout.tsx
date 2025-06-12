import Header from "@/components/global/header";
import AppProvider from "@/providers/AppProvider";
import DownTabs from "@components/global/downTabs";
import GameTaps from "@components/global/gameTaps";

export default function Layout({ children }: any) {
  return (
    <>
      <Header />
      <AppProvider>
        <GameTaps />
        <main>{children}</main>
        <DownTabs />
      </AppProvider>
    </>
  );
}
