'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Product } from '@/types/invoice';
import { searchProducts, DEMO_PRODUCTS } from '@/lib/demoProducts';
import ProductSearchDropdown from './ProductSearchDropdown';

interface ProductSearchProps {
  onItemAdd: (product: Product) => void;
  disabled: boolean;
  focusRef?: React.RefObject<HTMLInputElement | null>;
  onFirstDropdownOpen: () => void;
  isFirstOpen: boolean;
}

/**
 * ProductSearch
 * The core interaction component for adding items.
 * Implements synchronous search, 100ms debounce, and full keyboard navigation.
 */
export default function ProductSearch({
  onItemAdd,
  disabled,
  focusRef,
  onFirstDropdownOpen,
  isFirstOpen
}: ProductSearchProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Product[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const debounceTimer = useRef<NodeJS.Timeout | null>(null);

  const performSearch = useCallback((q: string) => {
    const searchResults = searchProducts(q);
    setResults(searchResults);
    setHighlightedIndex(0);
    
    if (searchResults.length > 0) {
      setIsOpen(true);
      if (isFirstOpen) {
        onFirstDropdownOpen();
      }
    } else {
      setIsOpen(false);
    }
  }, [isFirstOpen, onFirstDropdownOpen]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setIsOpen(false);
      return;
    }

    // Strict 100ms debounce as per performance budget
    if (debounceTimer.current) clearTimeout(debounceTimer.current);
    debounceTimer.current = setTimeout(() => {
      performSearch(query);
    }, 100);

    return () => {
      if (debounceTimer.current) clearTimeout(debounceTimer.current);
    };
  }, [query, performSearch]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      // Logic for showing all products when empty and arrow down pressed
      if (!isOpen && !query) {
        setResults(DEMO_PRODUCTS.slice(0, 10));
        setHighlightedIndex(0);
        setIsOpen(true);
        if (isFirstOpen) onFirstDropdownOpen();
        return;
      }
      if (results.length > 0) {
        setHighlightedIndex((prev) => (prev + 1) % results.length);
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (results.length > 0) {
        setHighlightedIndex((prev) => (prev - 1 + results.length) % results.length);
      }
    } else if (e.key === 'Enter' || e.key === 'Tab') {
      if (isOpen && results[highlightedIndex]) {
        e.preventDefault();
        onItemAdd(results[highlightedIndex]);
        setQuery('');
        setIsOpen(false);
      }
    } else if (e.key === 'Escape') {
      setIsOpen(false);
      setQuery('');
    }
  };

  const handleBlur = () => {
    // 150ms delay to allow clicks to register before closing
    setTimeout(() => setIsOpen(false), 150);
  };

  return (
    <div className="relative w-full">
      <label className="text-[10px] text-zinc-500 uppercase font-bold tracking-wider">
        Add Product
      </label>
      <div className="relative mt-1">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input
          ref={focusRef}
          type="text"
          disabled={disabled}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
          onFocus={() => {
            if (query.trim()) {
              setResults(searchProducts(query));
              setIsOpen(true);
            }
          }}
          placeholder="Type product name, model, or category..."
          className="w-full h-11 bg-surface border border-surface-border focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/20 rounded-lg pl-10 pr-4 text-sm text-white outline-none transition-all placeholder:text-zinc-600 font-sans"
          autoComplete="off"
          spellCheck={false}
        />
      </div>

      {isOpen && (
        <ProductSearchDropdown
          results={results}
          highlightedIndex={highlightedIndex}
          onSelect={(product) => {
            onItemAdd(product);
            setQuery('');
            setIsOpen(false);
          }}
          isFirstOpen={isFirstOpen}
        />
      )}
    </div>
  );
}
