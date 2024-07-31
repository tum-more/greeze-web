import React from "react";

export default function AuthLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="min-h-[100dvh] bg-background">
      <main className="min-h-[100dvh] flex flex-col items-center justify-center">
        {children}
      </main>
    </div>
  );
}
