import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <a href="#content" className="skip-to-content">
        Skip to content
      </a>
      <Nav />
      <main id="content">{children}</main>
      <Footer />
    </>
  );
}
