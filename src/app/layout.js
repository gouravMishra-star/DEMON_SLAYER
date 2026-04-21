import "./globals.css";

export const metadata = {
  title: "Demon Slayer Web UI",
  description: "A stunning premium UI for Demon Slayer: Kimetsu no Yaiba",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full antialiased font-satoshi selection:bg-[#111] selection:text-[#f2f2f2]">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
