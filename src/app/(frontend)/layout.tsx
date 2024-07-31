import { NavigationBar } from "@/components/nav/nav-bar";

export default function FrontendLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="bg-background">
      <div className="flex min-h-[100dvh] flex-col items-center md:container bg-background">
        <NavigationBar />
        {children}
      </div>
    </div>
  );
}
