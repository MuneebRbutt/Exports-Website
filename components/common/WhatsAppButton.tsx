import Link from 'next/link';
import { MessageCircle } from 'lucide-react';

const WhatsAppButton = () => {
  const phoneNumber = '923216146452'; // Pakistan country code +92
  const whatsappLink = `https://wa.me/${phoneNumber}`;

  return (
    <div className="fixed bottom-8 right-8 z-50">
      <Link 
        href={whatsappLink} 
        target="_blank" 
        rel="noopener noreferrer"
        className="bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-colors flex items-center justify-center"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle size={28} />
      </Link>
    </div>
  );
};

export default WhatsAppButton;
