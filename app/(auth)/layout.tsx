export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-[#1A1A1A] min-h-screen flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {children}
      </div>
    </div>
  );
}
