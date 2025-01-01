
export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 space-y-4 p-2 md:p-8">
        {children}
      </main>
    </div>
  );
}