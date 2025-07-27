import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Copy, Check } from 'lucide-react';

interface TestCard {
  number: string;
  name: string;
  type: 'success' | 'decline';
  description: string;
}

const testCards: TestCard[] = [
  // Success cards
  { number: '4242 4242 4242 4242', name: 'Visa', type: 'success', description: 'Basic success card' },
  { number: '4000 0566 5566 5556', name: 'Visa Debit', type: 'success', description: 'Visa debit card' },
  { number: '5555 5555 5555 4444', name: 'Mastercard', type: 'success', description: 'Mastercard success' },
  { number: '3782 8224 6310 005', name: 'American Express', type: 'success', description: 'Amex success' },
  { number: '6011 1111 1111 1117', name: 'Discover', type: 'success', description: 'Discover success' },
  { number: '3566 0020 2036 0505', name: 'JCB', type: 'success', description: 'JCB success' },
  
  // Decline cards
  { number: '4000 0000 0000 0002', name: 'Generic Decline', type: 'decline', description: 'Card declined' },
  { number: '4000 0000 0000 9995', name: 'Insufficient Funds', type: 'decline', description: 'Insufficient funds' },
  { number: '4000 0000 0000 9987', name: 'Lost Card', type: 'decline', description: 'Lost card' },
  { number: '4000 0000 0000 9979', name: 'Stolen Card', type: 'decline', description: 'Stolen card' },
  { number: '4000 0000 0000 0069', name: 'Expired Card', type: 'decline', description: 'Expired card' },
  { number: '4000 0000 0000 0127', name: 'Incorrect CVC', type: 'decline', description: 'Incorrect CVC' },
];

const TestCardHelper: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [copiedCard, setCopiedCard] = useState<string | null>(null);

  const copyToClipboard = (cardNumber: string) => {
    try {
      // Use the reliable legacy method that works in all environments
      const textArea = document.createElement('textarea');
      textArea.value = cardNumber;
      textArea.style.position = 'absolute';
      textArea.style.left = '-9999px';
      textArea.style.top = '0';
      textArea.style.opacity = '0';
      textArea.style.pointerEvents = 'none';
      textArea.setAttribute('readonly', '');
      textArea.setAttribute('contenteditable', 'true');

      document.body.appendChild(textArea);

      // Select the text
      if (navigator.userAgent.match(/ipad|ipod|iphone/i)) {
        // iOS specific handling
        const range = document.createRange();
        range.selectNodeContents(textArea);
        const selection = window.getSelection();
        selection?.removeAllRanges();
        selection?.addRange(range);
        textArea.setSelectionRange(0, 999999);
      } else {
        textArea.select();
        textArea.setSelectionRange(0, 999999);
      }

      // Copy the text
      let successful = false;
      try {
        successful = document.execCommand('copy');
      } catch (copyErr) {
        console.warn('execCommand copy failed, trying manual method');
      }

      document.body.removeChild(textArea);

      if (successful) {
        setCopiedCard(cardNumber);
        setTimeout(() => setCopiedCard(null), 2000);
      } else {
        // Final fallback - show the number in a prompt
        const userCopy = prompt('Copy this card number:', cardNumber);
        if (userCopy !== null) {
          setCopiedCard(cardNumber);
          setTimeout(() => setCopiedCard(null), 2000);
        }
      }
    } catch (err) {
      console.error('Copy failed:', err);
      // Ultimate fallback - show in alert
      alert(`Card number: ${cardNumber}\n\nPlease copy this manually.`);
    }
  };

  return (
    <div className="mt-4 bg-gray-50 rounded-lg overflow-hidden">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-4 py-3 flex items-center justify-between text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors"
      >
        <span>🧪 Test Cards (Stripe Test Mode)</span>
        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
      </button>
      
      {isExpanded && (
        <div className="px-4 pb-4">
          <div className="space-y-3">
            <div>
              <h4 className="text-sm font-semibold text-green-700 mb-2">✅ Success Cards</h4>
              <div className="space-y-2">
                {testCards.filter(card => card.type === 'success').map((card, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-green-50 rounded border">
                    <div className="flex-1">
                      <p
                        className="font-mono text-sm font-medium cursor-pointer hover:bg-green-100 p-1 rounded"
                        onClick={() => copyToClipboard(card.number)}
                        title="Click to copy"
                      >
                        {card.number}
                      </p>
                      <p className="text-xs text-gray-600">{card.name} - {card.description}</p>
                    </div>
                    <button
                      onClick={() => copyToClipboard(card.number)}
                      className="ml-2 p-1 text-gray-500 hover:text-gray-700 transition-colors"
                      title={copiedCard === card.number ? "Copied!" : "Copy card number"}
                    >
                      {copiedCard === card.number ? (
                        <Check className="w-4 h-4 text-green-600" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-semibold text-red-700 mb-2">❌ Test Decline Cards</h4>
              <div className="space-y-2">
                {testCards.filter(card => card.type === 'decline').map((card, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-red-50 rounded border">
                    <div className="flex-1">
                      <p
                        className="font-mono text-sm font-medium cursor-pointer hover:bg-red-100 p-1 rounded"
                        onClick={() => copyToClipboard(card.number)}
                        title="Click to copy"
                      >
                        {card.number}
                      </p>
                      <p className="text-xs text-gray-600">{card.name} - {card.description}</p>
                    </div>
                    <button
                      onClick={() => copyToClipboard(card.number)}
                      className="ml-2 p-1 text-gray-500 hover:text-gray-700 transition-colors"
                      title={copiedCard === card.number ? "Copied!" : "Copy card number"}
                    >
                      {copiedCard === card.number ? (
                        <Check className="w-4 h-4 text-green-600" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="mt-3 p-3 bg-blue-50 rounded border">
            <p className="text-sm text-blue-800">
              <strong>Test Details:</strong> Use any CVC (123), future expiry (12/34), and postal code (12345)
            </p>
            <p className="text-xs text-blue-600 mt-1">
              💡 Click any card number or copy button to copy. If copying fails, select and copy manually.
            </p>
            <p className="text-xs text-blue-600">
              ⚠️ Real credit cards will not work in test mode for security reasons
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default TestCardHelper;
