import { useState } from 'react';
import { cryptoService } from '../services/crypto';

export function AppleCardPaymentForm({ amount, orderId, onSuccess }) {
  const [step, setStep] = useState('upload'); // upload, submitted, status
  const [formData, setFormData] = useState({
    cardLast4: '',
    cardholderName: '',
    imageFile: null
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('');
  const [verificationId, setVerificationId] = useState(null);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError('Image size must be less than 5MB');
        return;
      }
      setFormData(prev => ({
        ...prev,
        imageFile: file
      }));
      setError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus('Uploading payment image...');

    try {
      // Validate
      if (!formData.cardLast4 || formData.cardLast4.length !== 4) {
        throw new Error('Please enter a valid 4-digit card number');
      }
      if (!formData.cardholderName.trim()) {
        throw new Error('Please enter cardholder name');
      }
      if (!formData.imageFile) {
        throw new Error('Please select an image');
      }

      // Upload
      const result = await cryptoService.uploadAppleCardImage(
        orderId,
        formData.imageFile,
        {
          last4: formData.cardLast4,
          holderName: formData.cardholderName,
          amount
        }
      );

      setVerificationId(result.verificationId);
      setStatus('✅ Payment submitted successfully!');
      setStep('submitted');

      if (onSuccess) {
        onSuccess(result);
      }
    } catch (error) {
      setError(error.message);
      setStatus('❌ Upload failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      maxWidth: '500px',
      margin: '0 auto',
      padding: '20px',
      backgroundColor: '#f9f9f9',
      borderRadius: '12px'
    }}>
      <div style={{ textAlign: 'center', marginBottom: '30px' }}>
        <div style={{ fontSize: '48px', marginBottom: '10px' }}>🍎</div>
        <h2>Apple Card Payment</h2>
        <p style={{ color: '#666' }}>Amount: <strong>${amount.toFixed(2)}</strong></p>
      </div>

      {/* Upload Step */}
      {step === 'upload' && (
        <form onSubmit={handleSubmit}>
          {/* Card Last 4 */}
          <div style={{ marginBottom: '20px' }}>
            <label htmlFor="cardLast4" style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
              Last 4 Digits of Card
            </label>
            <input
              id="cardLast4"
              type="text"
              name="cardLast4"
              placeholder="1234"
              maxLength="4"
              pattern="[0-9]{4}"
              value={formData.cardLast4}
              onChange={handleInputChange}
              required
              style={{
                width: '100%',
                padding: '12px',
                fontSize: '16px',
                border: '1px solid #ddd',
                borderRadius: '6px',
                boxSizing: 'border-box'
              }}
            />
            <small style={{ color: '#666' }}>Enter the last 4 digits of your Apple Card</small>
          </div>

          {/* Cardholder Name */}
          <div style={{ marginBottom: '20px' }}>
            <label htmlFor="cardholderName" style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
              Cardholder Name
            </label>
            <input
              id="cardholderName"
              type="text"
              name="cardholderName"
              placeholder="John Doe"
              value={formData.cardholderName}
              onChange={handleInputChange}
              required
              style={{
                width: '100%',
                padding: '12px',
                fontSize: '16px',
                border: '1px solid #ddd',
                borderRadius: '6px',
                boxSizing: 'border-box'
              }}
            />
          </div>

          {/* Image Upload */}
          <div style={{ marginBottom: '20px' }}>
            <label htmlFor="imageFile" style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
              Card Payment Screenshot
            </label>
            <div style={{
              border: '2px dashed #0052FF',
              borderRadius: '8px',
              padding: '20px',
              textAlign: 'center',
              backgroundColor: '#f0f7ff'
            }}>
              <input
                id="imageFile"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                required
                style={{ display: 'none' }}
              />
              <label htmlFor="imageFile" style={{ cursor: 'pointer', display: 'block' }}>
                <div style={{ fontSize: '32px', marginBottom: '10px' }}>📸</div>
                <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>Click to upload or drag and drop</div>
                <div style={{ fontSize: '12px', color: '#666' }}>PNG, JPG, WebP up to 5MB</div>
              </label>
              {formData.imageFile && (
                <div style={{ marginTop: '10px', color: '#0052FF', fontWeight: 'bold' }}>
                  ✅ {formData.imageFile.name}
                </div>
              )}
            </div>
            <small style={{ color: '#666', display: 'block', marginTop: '8px' }}>
              Take a screenshot or photo showing the Apple Card transaction confirmation.
            </small>
          </div>

          {/* Error Message */}
          {error && (
            <div style={{
              backgroundColor: '#ffe6e6',
              color: '#c00',
              padding: '12px',
              borderRadius: '6px',
              marginBottom: '20px',
              fontSize: '14px'
            }}>
              ⚠️ {error}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading || !formData.imageFile}
            style={{
              width: '100%',
              padding: '14px',
              backgroundColor: loading ? '#ccc' : '#000',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: loading ? 'not-allowed' : 'pointer'
            }}
          >
            {loading ? '⏳ Uploading...' : 'Submit Payment'}
          </button>

          {status && (
            <div style={{
              marginTop: '15px',
              padding: '12px',
              backgroundColor: status.includes('❌') ? '#ffe6e6' : '#e6f2ff',
              color: status.includes('❌') ? '#c00' : '#00c',
              borderRadius: '6px',
              textAlign: 'center',
              fontSize: '14px'
            }}>
              {status}
            </div>
          )}
        </form>
      )}

      {/* Submitted Step */}
      {step === 'submitted' && (
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '64px', marginBottom: '20px' }}>✅</div>
          <h3 style={{ color: '#28a745', marginBottom: '20px' }}>Payment Submitted!</h3>

          <div style={{
            backgroundColor: '#d4edda',
            border: '1px solid #c3e6cb',
            padding: '20px',
            borderRadius: '8px',
            marginBottom: '20px'
          }}>
            <p style={{ marginBottom: '10px' }}>
              <strong>Verification ID:</strong>
            </p>
            <code style={{
              display: 'block',
              padding: '10px',
              backgroundColor: 'white',
              borderRadius: '4px',
              marginBottom: '10px',
              wordBreak: 'break-all',
              fontFamily: 'monospace'
            }}>
              {verificationId}
            </code>
            <button
              onClick={() => navigator.clipboard.writeText(verificationId)}
              style={{
                padding: '8px 16px',
                backgroundColor: '#28a745',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '14px'
              }}
            >
              📋 Copy ID
            </button>
          </div>

          <div style={{
            backgroundColor: '#e7f3ff',
            border: '1px solid #b3d9ff',
            padding: '15px',
            borderRadius: '8px',
            marginBottom: '20px',
            fontSize: '14px'
          }}>
            <p><strong>What's next?</strong></p>
            <ul style={{ textAlign: 'left', margin: '10px 0' }}>
              <li>We'll review your payment image</li>
              <li>Verification usually takes 24-48 hours</li>
              <li>You'll receive an email once approved</li>
              <li>Your booking will be confirmed</li>
            </ul>
          </div>

          <button
            onClick={() => {
              setStep('upload');
              setFormData({ cardLast4: '', cardholderName: '', imageFile: null });
            }}
            style={{
              padding: '12px 24px',
              backgroundColor: '#0052FF',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: 'bold'
            }}
          >
            Make Another Payment
          </button>
        </div>
      )}
    </div>
  );
}
