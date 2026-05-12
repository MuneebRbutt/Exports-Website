export function generateWhatsAppUrl( 
  message?: string 
): string { 
  const phone = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.replace(/[^0-9]/g, '') 
   
  const defaultMessage = message || "Hello Meharstare! I need help with my order." 
 
  return `https://wa.me/${phone}?text=` + encodeURIComponent(defaultMessage) 
} 
