import React, { useState } from 'react';
import Icon from '../../../components/Appicon';

const QuickFAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "What\'s the typical response time for inquiries?",
      answer: "For urgent consultation requests, we respond within 2-4 hours during business hours (9 AM - 6 PM EST). General inquiries receive responses within 24 hours. Emergency consultations can be scheduled via WhatsApp for same-day availability."
    },
    {
      question: "Do you offer consultations for both crypto and real estate?",
      answer: "Yes! We specialize in both cryptocurrency trading and real estate investment. You can book separate consultations for each expertise area or schedule a comprehensive diversification strategy session that covers both domains."
    },
    {
      question: "What information should I prepare for my first consultation?",
      answer: "For crypto consultations: your current portfolio, risk tolerance, and investment goals. For real estate: your budget, preferred locations, and investment timeline. For diversification strategies: your complete financial overview and long-term wealth objectives."
    },
    {
      question: "Are consultations available for international clients?",
      answer: "Absolutely! We work with clients across multiple time zones and offer flexible scheduling. Our expertise covers international crypto markets and global real estate opportunities. Video consultations are available via Zoom, Google Meet, or your preferred platform."
    },
    {
      question: "What\'s included in a consultation session?",
      answer: "Each 60-minute session includes: personalized portfolio analysis, market trend insights, actionable investment strategies, risk assessment, and a follow-up action plan. You'll also receive exclusive market reports and ongoing email support for 30 days post-consultation."
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-secondary to-primary flex items-center justify-center">
          <Icon name="HelpCircle" size={20} color="white" strokeWidth={2.5} />
        </div>
        <h2 className="text-2xl font-bold text-foreground">Quick Answers</h2>
      </div>
      <div className="space-y-3">
        {faqs?.map((faq, index) => (
          <div key={index} className="border border-border rounded-lg overflow-hidden">
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full flex items-center justify-between p-4 text-left hover:bg-muted transition-colors duration-300"
            >
              <span className="font-medium text-foreground pr-4">{faq?.question}</span>
              <Icon
                name={openIndex === index ? 'ChevronUp' : 'ChevronDown'}
                size={20}
                className="flex-shrink-0 text-muted-foreground"
              />
            </button>
            {openIndex === index && (
              <div className="px-4 pb-4 pt-2 bg-muted/30">
                <p className="text-sm text-muted-foreground leading-relaxed">{faq?.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuickFAQ;