import { useState, useEffect } from 'react';
import { cryptoService } from '../services/crypto';

export function AdminPaymentDashboard() {
  const [appleCardPayments, setAppleCardPayments] = useState([]);
  const [cryptoPayments, setCryptoPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // all, pending, verified, rejected
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [notes, setNotes] = useState('');

  // Fetch all payments
  useEffect(() => {
    fetchPayments();
    // Refresh every 30 seconds
    const interval = setInterval(fetchPayments, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchPayments = async () => {
    try {
      setLoading(true);
      
      // Fetch Apple Card payments
      const appleRes = await fetch('/api/payments/apple-card/list');
      const appleData = await appleRes.json();
      setAppleCardPayments(appleData);

      // Fetch Crypto payments
      const cryptoRes = await fetch('/api/payments/crypto/list');
      const cryptoData = await cryptoRes.json();
      setCryptoPayments(cryptoData);
    } catch (error) {
      console.error('Error fetching payments:', error);
    } finally {
      setLoading(false);
    }
  };

  // Handle payment verification
  const handleVerifyPayment = async (verificationId, approved) => {
    try {
      const response = await fetch(
        `/api/payments/apple-card/verify/${verificationId}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            approved,
            notes
          })
        }
      );

      const result = await response.json();
      
      if (result.success) {
        alert(`Payment ${approved ? 'approved' : 'rejected'} successfully!`);
        setSelectedPayment(null);
        setNotes('');
        fetchPayments(); // Refresh list
      }
    } catch (error) {
      console.error('Verification error:', error);
      alert('Error verifying payment');
    }
  };

  // Filter payments
  const filteredApplePayments = appleCardPayments.filter(payment => {
    if (filter === 'all') return true;
    return payment.status === filter;
  });

  const getStatusBadge = (status) => {
    const badges = {
      'pending_verification': { bg: '#fff3cd', color: '#856404', text: '⏳ Pending' },
      'verified': { bg: '#d4edda', color: '#155724', text: '✅ Verified' },
      'rejected': { bg: '#f8d7da', color: '#721c24', text: '❌ Rejected' },
      'pending': { bg: '#cfe2ff', color: '#084298', text: '⏳ Pending' },
      'confirmed': { bg: '#d4edda', color: '#155724', text: '✅ Confirmed' },
      'completed': { bg: '#d4edda', color: '#155724', text: '✅ Completed' }
    };
    const badge = badges[status] || badges['pending'];
    return <span style={{ padding: '4px 8px', backgroundColor: badge.bg, color: badge.color, borderRadius: '4px', fontSize: '12px', fontWeight: 'bold' }}>{badge.text}</span>;
  };

  if (loading && appleCardPayments.length === 0 && cryptoPayments.length === 0) {
    return <div style={{ padding: '20px', textAlign: 'center' }}>Loading payments...</div>;
  }

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1>💳 Payment Management Dashboard</h1>

      {/* Stats Overview */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '15px', marginBottom: '30px' }}>
        <div style={{ backgroundColor: '#f0f0f0', padding: '15px', borderRadius: '8px', textAlign: 'center' }}>
          <div style={{ fontSize: '24px', fontWeight: 'bold' }}>{appleCardPayments.length + cryptoPayments.length}</div>
          <div style={{ fontSize: '12px', color: '#666' }}>Total Payments</div>
        </div>
        <div style={{ backgroundColor: '#fff3cd', padding: '15px', borderRadius: '8px', textAlign: 'center' }}>
          <div style={{ fontSize: '24px', fontWeight: 'bold' }}>{appleCardPayments.filter(p => p.status === 'pending_verification').length}</div>
          <div style={{ fontSize: '12px', color: '#666' }}>Pending Review</div>
        </div>
        <div style={{ backgroundColor: '#d4edda', padding: '15px', borderRadius: '8px', textAlign: 'center' }}>
          <div style={{ fontSize: '24px', fontWeight: 'bold' }}>{appleCardPayments.filter(p => p.status === 'verified').length}</div>
          <div style={{ fontSize: '12px', color: '#666' }}>Approved</div>
        </div>
        <div style={{ backgroundColor: '#f8d7da', padding: '15px', borderRadius: '8px', textAlign: 'center' }}>
          <div style={{ fontSize: '24px', fontWeight: 'bold' }}>{appleCardPayments.filter(p => p.status === 'rejected').length}</div>
          <div style={{ fontSize: '12px', color: '#666' }}>Rejected</div>
        </div>
      </div>

      {/* Filter Buttons */}
      <div style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
        {['all', 'pending_verification', 'verified', 'rejected'].map(filterOption => (
          <button
            key={filterOption}
            onClick={() => setFilter(filterOption)}
            style={{
              padding: '8px 16px',
              backgroundColor: filter === filterOption ? '#0052FF' : '#f0f0f0',
              color: filter === filterOption ? 'white' : 'black',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: filter === filterOption ? 'bold' : 'normal'
            }}
          >
            {filterOption === 'all' ? 'All' : filterOption.replace('_', ' ').toUpperCase()}
          </button>
        ))}
      </div>

      {/* Apple Card Payments Table */}
      <div style={{ marginBottom: '40px' }}>
        <h2>🍎 Apple Card Payments</h2>
        {filteredApplePayments.length === 0 ? (
          <p style={{ color: '#666' }}>No payments to display</p>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ backgroundColor: '#f5f5f5', borderBottom: '2px solid #ddd' }}>
                  <th style={{ padding: '12px', textAlign: 'left' }}>Order ID</th>
                  <th style={{ padding: '12px', textAlign: 'left' }}>Amount</th>
                  <th style={{ padding: '12px', textAlign: 'left' }}>Card</th>
                  <th style={{ padding: '12px', textAlign: 'left' }}>Status</th>
                  <th style={{ padding: '12px', textAlign: 'left' }}>Date</th>
                  <th style={{ padding: '12px', textAlign: 'center' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredApplePayments.map((payment) => (
                  <tr key={payment.verification_id} style={{ borderBottom: '1px solid #eee' }}>
                    <td style={{ padding: '12px' }}>{payment.order_id}</td>
                    <td style={{ padding: '12px' }}>${payment.amount_usd.toFixed(2)}</td>
                    <td style={{ padding: '12px' }}>••••{payment.card_last4}</td>
                    <td style={{ padding: '12px' }}>{getStatusBadge(payment.status)}</td>
                    <td style={{ padding: '12px', fontSize: '12px', color: '#666' }}>
                      {new Date(payment.created_at).toLocaleDateString()}
                    </td>
                    <td style={{ padding: '12px', textAlign: 'center' }}>
                      {payment.status === 'pending_verification' ? (
                        <button
                          onClick={() => setSelectedPayment(payment)}
                          style={{
                            padding: '6px 12px',
                            backgroundColor: '#0052FF',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            fontSize: '12px'
                          }}
                        >
                          Review
                        </button>
                      ) : (
                        <span style={{ fontSize: '12px', color: '#666' }}>—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Crypto Payments Table */}
      <div>
        <h2>🪙 Crypto Payments</h2>
        {cryptoPayments.length === 0 ? (
          <p style={{ color: '#666' }}>No payments to display</p>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ backgroundColor: '#f5f5f5', borderBottom: '2px solid #ddd' }}>
                  <th style={{ padding: '12px', textAlign: 'left' }}>Order ID</th>
                  <th style={{ padding: '12px', textAlign: 'left' }}>Type</th>
                  <th style={{ padding: '12px', textAlign: 'left' }}>Amount</th>
                  <th style={{ padding: '12px', textAlign: 'left' }}>Crypto Amount</th>
                  <th style={{ padding: '12px', textAlign: 'left' }}>Status</th>
                  <th style={{ padding: '12px', textAlign: 'left' }}>TX Hash</th>
                </tr>
              </thead>
              <tbody>
                {cryptoPayments.map((payment) => (
                  <tr key={payment.id} style={{ borderBottom: '1px solid #eee' }}>
                    <td style={{ padding: '12px' }}>{payment.order_id}</td>
                    <td style={{ padding: '12px' }}>{payment.payment_type.toUpperCase()}</td>
                    <td style={{ padding: '12px' }}>${payment.amount_usd.toFixed(2)}</td>
                    <td style={{ padding: '12px' }}>{payment.crypto_amount}</td>
                    <td style={{ padding: '12px' }}>{getStatusBadge(payment.status)}</td>
                    <td style={{ padding: '12px', fontSize: '11px', fontFamily: 'monospace', color: '#0052FF' }}>
                      {payment.tx_hash ? payment.tx_hash.substring(0, 16) + '...' : '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Review Payment Modal */}
      {selectedPayment && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: 'white',
            padding: '30px',
            borderRadius: '12px',
            maxWidth: '600px',
            width: '90%',
            maxHeight: '90vh',
            overflowY: 'auto'
          }}>
            <h2>🔍 Review Payment</h2>

            {/* Payment Details */}
            <div style={{ backgroundColor: '#f9f9f9', padding: '15px', borderRadius: '8px', marginBottom: '20px' }}>
              <p><strong>Order ID:</strong> {selectedPayment.order_id}</p>
              <p><strong>Amount:</strong> ${selectedPayment.amount_usd.toFixed(2)}</p>
              <p><strong>Cardholder:</strong> {selectedPayment.cardholder_name}</p>
              <p><strong>Card Last 4:</strong> ••••{selectedPayment.card_last4}</p>
              <p><strong>Submitted:</strong> {new Date(selectedPayment.created_at).toLocaleString()}</p>
            </div>

            {/* Payment Image */}
            <div style={{ marginBottom: '20px' }}>
              <p><strong>Card Image:</strong></p>
              <img
                src={selectedPayment.image_path}
                alt="Apple Card"
                style={{
                  maxWidth: '100%',
                  maxHeight: '300px',
                  borderRadius: '8px',
                  border: '1px solid #ddd'
                }}
              />
            </div>

            {/* Admin Notes */}
            <div style={{ marginBottom: '20px' }}>
              <label htmlFor="adminNotes">
                <strong>Admin Notes:</strong>
              </label>
              <textarea
                id="adminNotes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Enter verification notes or reason for rejection..."
                style={{
                  width: '100%',
                  height: '100px',
                  padding: '10px',
                  marginTop: '8px',
                  borderRadius: '6px',
                  border: '1px solid #ddd',
                  fontFamily: 'Arial',
                  fontSize: '14px',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
              <button
                onClick={() => {
                  setSelectedPayment(null);
                  setNotes('');
                }}
                style={{
                  padding: '10px 20px',
                  backgroundColor: '#f0f0f0',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: 'bold'
                }}
              >
                Cancel
              </button>
              <button
                onClick={() => handleVerifyPayment(selectedPayment.verification_id, false)}
                style={{
                  padding: '10px 20px',
                  backgroundColor: '#dc3545',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: 'bold'
                }}
              >
                ❌ Reject
              </button>
              <button
                onClick={() => handleVerifyPayment(selectedPayment.verification_id, true)}
                style={{
                  padding: '10px 20px',
                  backgroundColor: '#28a745',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: 'bold'
                }}
              >
                ✅ Approve
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
