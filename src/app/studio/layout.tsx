// The site's film grain overlay sits above everything; hide it inside the Studio.
export default function StudioLayout({ children }: LayoutProps<"/studio">) {
  return (
    <>
      <style>{".grain{display:none}"}</style>
      {children}
    </>
  );
}
