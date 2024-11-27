export default async function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  
  return (
    <div className="min-h-screen bg-background">
      {children}
    </div>
  );
}