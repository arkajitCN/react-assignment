import { PropsWithChildren } from "react";

export default function ResponsiveScreen({ children }: PropsWithChildren) {
  return (
    <main className="px-2 py-2 min-h-screen flex flex-col items-center mx-auto">
      {children}
    </main>
  );
}
