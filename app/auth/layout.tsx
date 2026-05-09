export default function AuthLayout({ 
  children, 
}: { 
  children: React.ReactNode 
}) { 
  return ( 
    <div className="min-h-screen bg-[#1A1A1A] flex items-center justify-center p-4"> 
      {children} 
    </div> 
  ) 
} 
