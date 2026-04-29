'use client';

import React, { useReducer, useCallback, useRef } from 'react';
import { InvoiceState, InvoiceAction, Product } from '@/types/invoice';

const initialState: InvoiceState = {
  customer: '',
  items: [],
  status: 'idle',
  startTime: null,
  savedMs: null,
  hasInteracted: false,
  firstDropdownOpened: false,
};

import CustomerField from './CustomerField';

import ProductSearch from './ProductSearch';

function invoiceReducer(state: InvoiceState, action: InvoiceAction): InvoiceState {
  switch (action.type) {
    case 'SET_CUSTOMER':
      return {
        ...state,
        customer: action.payload.customer,
        hasInteracted: true,
        startTime: state.startTime || Date.now(),
        status: state.status === 'idle' ? 'active' : state.status,
      };
    case 'ADD_ITEM':
      return {
        ...state,
        items: [...state.items, { product: action.payload.product, qty: 1 }],
        hasInteracted: true,
      };
    case 'SET_FIRST_OPEN':
      return {
        ...state,
        firstDropdownOpened: true,
      };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
}

export default function DemoInvoice() {
  const [state, dispatch] = useReducer(invoiceReducer, initialState);
  const [focusedField, setFocusedField] = React.useState<string>('customer');
  const searchInputRef = useRef<HTMLInputElement>(null);

  const handleCustomerChange = (customer: string) => {
    dispatch({ type: 'SET_CUSTOMER', payload: { customer } });
  };

  const handleItemAdd = (product: Product) => {
    dispatch({ type: 'ADD_ITEM', payload: { product } });
  };

  const handleFirstOpen = () => {
    if (!state.firstDropdownOpened) {
      dispatch({ type: 'SET_FIRST_OPEN' });
    }
  };

  const handleCustomerConfirm = useCallback(() => {
    setFocusedField('search');
    // Ensure focus moves to search input
    setTimeout(() => {
      searchInputRef.current?.focus();
    }, 10);
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto bg-surface-card border border-surface-border rounded-xl shadow-2xl overflow-hidden font-sans">
      {/* Demo Header */}
      <div className="p-4 border-b border-surface-border-muted bg-surface-elevated/50 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20 text-amber-500 text-[10px] font-bold uppercase tracking-wider">
            Live Demo
          </div>
          <span className="text-zinc-500 text-xs font-medium uppercase tracking-widest">New Invoice #8843</span>
        </div>
        <div className="text-amber-500 font-mono text-sm font-bold">0.0s</div>
      </div>

      <div className="p-6 space-y-8">
        {/* Customer & Search Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          <CustomerField 
            value={state.customer}
            onChange={handleCustomerChange}
            onConfirm={handleCustomerConfirm}
            disabled={state.status === 'saved'}
            autoFocus={focusedField === 'customer'}
          />

          <ProductSearch 
            onItemAdd={handleItemAdd}
            disabled={state.status === 'saved'}
            focusRef={searchInputRef}
            onFirstDropdownOpen={handleFirstOpen}
            isFirstOpen={!state.firstDropdownOpened}
          />
        </div>

        {/* Invoice Table Placeholder */}
        <div className="border border-surface-border-muted rounded-lg overflow-hidden opacity-50 pointer-events-none">
          <div className="bg-surface-elevated p-3 border-b border-surface-border-muted flex justify-between text-[10px] uppercase font-bold text-zinc-500">
            <span>Item Description</span>
            <div className="flex gap-12">
              <span>Qty</span>
              <span>Price</span>
              <span>Total</span>
            </div>
          </div>
          <div className="p-8 text-center text-zinc-600 text-sm italic">
            Add items to start building your invoice
          </div>
        </div>
      </div>
      
      {/* Footer / Summary Placeholder */}
      <div className="p-6 border-t border-surface-border-muted bg-surface-elevated/30 flex justify-end">
        <div className="text-right space-y-1">
          <div className="text-[10px] text-zinc-500 uppercase font-bold">Grand Total</div>
          <div className="text-3xl font-bold text-zinc-700">₹0</div>
        </div>
      </div>
    </div>
  );
}
