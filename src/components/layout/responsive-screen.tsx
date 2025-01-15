import { PropsWithChildren } from "react";

export default function ResponsiveScreen({ children }: PropsWithChildren) {
  return (
    <main className="relative px-2 py-2 min-h-screen w-full flex flex-col items-center">
      {children}
    </main>
  );
}
