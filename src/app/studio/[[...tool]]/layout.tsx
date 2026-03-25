import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contra Faba Studio",
};

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-GB">
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  );
}
