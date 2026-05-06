export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-[#1A1A1A] min-h-screen">
      {children}
    </div>
  );
}
