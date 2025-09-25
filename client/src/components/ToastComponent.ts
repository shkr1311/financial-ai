import React from 'react';
import { toast } from 'sonner';

export const showSuccessToast = ({ message }: { message: string }) => {
  toast.success(message, {
    style: {
      background: 'var(--financial-charcoal)', // dark background
      backdropFilter: 'blur(12px)',
      color: '#f8fafc', // light text (almost white)
      border: '1px solid var(--financial-teal)',
      borderRadius: '12px',
      boxShadow: '0 0 15px rgba(20, 184, 166, 0.5)',
      padding: '12px 16px',
      fontWeight: 500,
    },
    className: 'glow-hover',
  });
};

export const showErrorToast = ({
  message,
  description,
}: {
  message: string;
  description: string;
}) => {
  toast.error(message, {
    style: {
      background: 'var(--financial-navy)', // deep navy for contrast
      backdropFilter: 'blur(12px)',
      color: '#f8fafc', // light text
      border: '1px solid var(--financial-red)',
      borderRadius: '12px',
      boxShadow: '0 0 15px rgba(239, 68, 68, 0.5)',
      padding: '12px 16px',
      fontWeight: 500,
    },
    description,
    className: 'glow-hover',
  });
};
