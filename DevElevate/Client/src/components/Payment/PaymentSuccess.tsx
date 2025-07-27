import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle, Download, Mail, FileText } from 'lucide-react';
import { jsPDF } from 'jspdf';

const PaymentSuccess: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { paymentIntentId, amount = 1900, customerName, timestamp } = location.state || {};

  const transactionDetails = {
    transactionId: paymentIntentId || 'pi_test_' + Date.now(),
    amount: amount,
    currency: 'USD',
    customerName: customerName || 'Test User',
    email: 'user@example.com',
    date: timestamp ? new Date(timestamp) : new Date(),
    plan: 'DevElevate Pro',
    duration: 'Monthly',
    status: 'Completed',
    paymentMethod: 'Card ending in 4242'
  };

  const downloadReceipt = () => {
    const doc = new jsPDF();
    
    // Header
    doc.setFontSize(20);
    doc.setFont('Helvetica', 'bold');
    doc.text('DevElevate', 20, 30);
    doc.setFontSize(16);
    doc.text('Payment Receipt', 20, 45);
    
    // Transaction details
    doc.setFontSize(12);
    doc.setFont('Helvetica', 'normal');
    
    const details = [
      ['Transaction ID:', transactionDetails.transactionId],
      ['Date:', transactionDetails.date.toLocaleDateString()],
      ['Time:', transactionDetails.date.toLocaleTimeString()],
      ['Customer:', transactionDetails.customerName],
      ['Email:', transactionDetails.email],
      ['Plan:', transactionDetails.plan],
      ['Duration:', transactionDetails.duration],
      ['Amount:', `$${(transactionDetails.amount / 100).toFixed(2)} ${transactionDetails.currency}`],
      ['Payment Method:', transactionDetails.paymentMethod],
      ['Status:', transactionDetails.status]
    ];
    
    let yPosition = 65;
    details.forEach(([label, value]) => {
      doc.setFont('Helvetica', 'bold');
      doc.text(label, 20, yPosition);
      doc.setFont('Helvetica', 'normal');
      doc.text(value, 80, yPosition);
      yPosition += 10;
    });
    
    // Features included
    doc.setFont('Helvetica', 'bold');
    doc.text('Features Included:', 20, yPosition + 10);
    doc.setFont('Helvetica', 'normal');
    
    const features = [
      '• Unlimited AI assistance',
      '• Premium learning content',
      '• Advanced resume builder',
      '• Unlimited practice tests',
      '• Priority support',
      '• Custom study plans'
    ];
    
    yPosition += 25;
    features.forEach(feature => {
      doc.text(feature, 25, yPosition);
      yPosition += 8;
    });
    
    // Footer
    doc.setFontSize(10);
    doc.text('Thank you for choosing DevElevate!', 20, 280);
    doc.text('For support, contact us at support@develevate.com', 20, 290);
    
    doc.save(`DevElevate_Receipt_${transactionDetails.transactionId}.pdf`);
  };

  const downloadJSON = () => {
    const dataStr = JSON.stringify(transactionDetails, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `transaction_${transactionDetails.transactionId}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const sendEmail = () => {
    const subject = 'DevElevate Payment Receipt';
    const body = `Thank you for your payment!

Transaction Details:
- Transaction ID: ${transactionDetails.transactionId}
- Date: ${transactionDetails.date.toLocaleDateString()}
- Amount: $${(transactionDetails.amount / 100).toFixed(2)}
- Plan: ${transactionDetails.plan}

Best regards,
DevElevate Team`;
    
    window.open(`mailto:${transactionDetails.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl p-8">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <CheckCircle className="w-12 h-12 text-green-500" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Payment Successful!
          </h1>
          <p className="text-gray-600">
            Welcome to DevElevate Pro! Your subscription has been activated.
          </p>
        </div>

        {/* Transaction Details Card */}
        <div className="bg-gray-50 rounded-xl p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <FileText className="w-5 h-5 mr-2" />
            Transaction Details
          </h2>
          
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-600">Transaction ID</p>
              <p className="font-mono font-medium">{transactionDetails.transactionId}</p>
            </div>
            <div>
              <p className="text-gray-600">Date & Time</p>
              <p className="font-medium">{transactionDetails.date.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-gray-600">Amount</p>
              <p className="font-medium text-lg text-green-600">
                ${(transactionDetails.amount / 100).toFixed(2)} {transactionDetails.currency}
              </p>
            </div>
            <div>
              <p className="text-gray-600">Payment Method</p>
              <p className="font-medium">{transactionDetails.paymentMethod}</p>
            </div>
            <div>
              <p className="text-gray-600">Plan</p>
              <p className="font-medium">{transactionDetails.plan}</p>
            </div>
            <div>
              <p className="text-gray-600">Status</p>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                {transactionDetails.status}
              </span>
            </div>
          </div>
        </div>

        {/* Features Included */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-6">
          <h3 className="font-semibold text-blue-800 mb-3">What's included in your Pro plan:</h3>
          <div className="grid md:grid-cols-2 gap-2 text-sm text-blue-700">
            <div className="flex items-center">
              <CheckCircle className="w-4 h-4 mr-2 text-blue-500" />
              Unlimited AI assistance
            </div>
            <div className="flex items-center">
              <CheckCircle className="w-4 h-4 mr-2 text-blue-500" />
              Premium learning content
            </div>
            <div className="flex items-center">
              <CheckCircle className="w-4 h-4 mr-2 text-blue-500" />
              Advanced resume builder
            </div>
            <div className="flex items-center">
              <CheckCircle className="w-4 h-4 mr-2 text-blue-500" />
              Unlimited practice tests
            </div>
            <div className="flex items-center">
              <CheckCircle className="w-4 h-4 mr-2 text-blue-500" />
              Priority support
            </div>
            <div className="flex items-center">
              <CheckCircle className="w-4 h-4 mr-2 text-blue-500" />
              Custom study plans
            </div>
          </div>
        </div>

        {/* Download Options */}
        <div className="mb-6">
          <h3 className="font-semibold text-gray-800 mb-3">Download Transaction Details:</h3>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={downloadReceipt}
              className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              <Download className="w-4 h-4 mr-2" />
              PDF Receipt
            </button>
            <button
              onClick={downloadJSON}
              className="flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              <Download className="w-4 h-4 mr-2" />
              JSON Data
            </button>
            <button
              onClick={sendEmail}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Mail className="w-4 h-4 mr-2" />
              Email Receipt
            </button>
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={() => navigate('/dashboard')}
            className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Go to Dashboard
          </button>
          
          <button
            onClick={() => navigate('/learning-hub')}
            className="flex-1 bg-green-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-green-700 transition-colors"
          >
            Start Learning
          </button>
        </div>
        
        <p className="text-xs text-gray-500 mt-6 text-center">
          A confirmation email will be sent to your registered email address.
        </p>
      </div>
    </div>
  );
};

export default PaymentSuccess;
