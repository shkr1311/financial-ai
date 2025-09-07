'use client';

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { X, Check, Plus, Loader2 } from 'lucide-react';
import useAuthStore from '@/store/useAuthStore';

export default function FloatingTickerInput() {
  const [open, setOpen] = useState(false);
  const [tickers, setTickers] = useState<string[]>([]);
  const [input, setInput] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const { checkAuth, authUser, updateTicker } = useAuthStore();

  const boxRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        boxRef.current &&
        !boxRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [open]);

  useEffect(() => {
    checkAuth()
  }, [])

  const handleAddTicker = () => {
    if (input.trim() && !tickers.includes(input.toUpperCase())) {
      setTickers([...tickers, input.toUpperCase()]);
      setInput('');
    }
  };

  const handleRemoveTicker = (ticker: string) => {
    setTickers(tickers.filter((t) => t !== ticker));
  };

  const handleSubmit = async () => {
    if (tickers.length === 0) return;

    setLoading(true);

    try {
      // ✅ call store function to update tickers in backend
      await updateTicker(tickers);

      setSubmitted(true);
      setTickers([]);
      setInput('');

      setTimeout(() => {
        setSubmitted(false);
        setOpen(false);
      }, 1000); // tick shows for 1s
    } catch (error) {
      console.error('Error submitting tickers:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating Add Button */}
      <Button
        ref={buttonRef}
        size='lg'
        onClick={() => setOpen(!open)}
        disabled={loading}
        className='fixed bottom-6 right-6 w-16 h-16 rounded-2xl shadow-xl 
                   bg-gradient-to-br from-financial-teal to-emerald-500 
                   hover:scale-110 hover:shadow-2xl active:scale-95 
                   transition-all duration-300 ease-out text-white flex 
                   items-center justify-center z-50'
      >
        {loading ? (
          <Loader2 className='w-6 h-6 animate-spin' />
        ) : submitted ? (
          <Check className='w-8 h-8' />
        ) : (
          <Plus className='w-8 h-8' />
        )}
      </Button>

      {/* Expandable Input Box */}
      {open && !submitted && !loading && (
        <div
          ref={boxRef}
          className='fixed bottom-28 right-6 w-96 bg-background border border-border rounded-xl shadow-2xl p-4 z-40 animate-in fade-in slide-in-from-bottom-5 duration-300'
        >
          <h3 className='font-semibold text-lg mb-3 text-foreground'>
            Add Tickers
          </h3>

          {/* Input field with add button */}
          <div className='flex space-x-2'>
            <input
              type='text'
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAddTicker()}
              placeholder='Enter ticker symbol (e.g., AAPL)'
              className='flex-1 rounded-md border border-border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-financial-teal'
            />
            <Button
              variant='secondary'
              onClick={handleAddTicker}
              className='shrink-0'
            >
              Select
            </Button>
          </div>

          {/* Selected tickers */}
          <div className='flex flex-wrap gap-2 mt-3'>
            {tickers.map((ticker) => (
              <div
                key={ticker}
                className='flex items-center bg-financial-teal/20 text-financial-teal px-3 py-1 rounded-full text-sm'
              >
                {ticker}
                <X
                  className='w-4 h-4 ml-2 cursor-pointer hover:text-financial-coral'
                  onClick={() => handleRemoveTicker(ticker)}
                />
              </div>
            ))}
          </div>

          {/* Submit button */}
          <Button
            className='mt-4 w-full bg-financial-teal hover:bg-financial-teal/90'
            onClick={handleSubmit}
            disabled={tickers.length === 0}
          >
            Submit
          </Button>
        </div>
      )}
    </>
  );
}
