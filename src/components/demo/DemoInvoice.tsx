'use client';

import React, { useReducer, useCallback, useRef } from 'react';
import { InvoiceState, InvoiceAction, Product } from '@/types/invoice';
import CustomerField from './CustomerField';
import ProductSearch from './ProductSearch';
import InvoiceTable from './InvoiceTable';

const initialState: InvoiceState = {
  customer: '',
  items: [],
  status: 'idle',
  startTime: null,
  savedMs: null,
  hasInteracted: false,
  firstDropdownOpened: false,
};

import InvoiceTimer from './InvoiceTimer';
import { useInvoiceTimer } from '@/hooks/useInvoiceTimer';

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

    case 'ADD_ITEM': {
      const existingItemIndex = state.items.findIndex(item => item.product.id === action.payload.product.id);
      let newItems;

      if (existingItemIndex > -1) {
        newItems = state.items.map((item, idx) => 
          idx === existingItemIndex ? { ...item, qty: item.qty + 1 } : item
        );
      } else {
        newItems = [...state.items, { product: action.payload.product, qty: 1, imei: '' }];
      }

      return {
        ...state,
        items: newItems,
        hasInteracted: true,
        startTime: state.startTime || Date.now(), // Capture start time on first add
        status: state.status === 'idle' ? 'active' : state.status,
        firstDropdownOpened: true,
      };
    }

    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter((_, idx) => idx !== action.payload.index),
      };

    case 'UPDATE_QTY': {
      const { index, qty } = action.payload;
      if (qty <= 0) {
        return {
          ...state,
          items: state.items.filter((_, idx) => idx !== index),
        };
      }
      return {
        ...state,
        items: state.items.map((item, idx) => 
          idx === index ? { ...item, qty } : item
        ),
      };
    }

    case 'UPDATE_IMEI':
      return {
        ...state,
        items: state.items.map((item, idx) => 
          idx === action.payload.index ? { ...item, imei: action.payload.imei } : item
        ),
      };

    case 'SET_FIRST_OPEN':
      return {
        ...state,
        firstDropdownOpened: true,
      };

    case 'SAVE':
      return {
        ...state,
        status: 'saved',
        savedMs: state.startTime ? Date.now() - state.startTime : 0,
      };

    case 'RESET':
      return initialState;

    default:
      return state;
  }
}

import SummaryPanel from './SummaryPanel';
import { calcGST } from '@/lib/gst';

export default function DemoInvoice() {
  const [state, dispatch] = useReducer(invoiceReducer, initialState);
  const [focusedField, setFocusedField] = React.useState<string>('customer');
  const searchInputRef = useRef<HTMLInputElement>(null);

  const { elapsedMs, justStarted } = useInvoiceTimer({ 
    status: state.status, 
    startTime: state.startTime 
  });

  // Derived Values - Computed in render, never stored in state
  const subtotal = state.items.reduce((sum, item) => sum + item.product.price * item.qty, 0);
  const gstTotal = state.items.reduce((sum, item) => sum + calcGST(item.product.price * item.qty, item.product.gst), 0);
  const total = subtotal + gstTotal;

  const handleCustomerChange = (customer: string) => {
    dispatch({ type: 'SET_CUSTOMER', payload: { customer } });
  };

  const handleItemAdd = (product: Product) => {
    dispatch({ type: 'ADD_ITEM', payload: { product } });
  };

  const handleQtyChange = (index: number, qty: number) => {
    dispatch({ type: 'UPDATE_QTY', payload: { index, qty } });
  };

  const handleImeiChange = (index: number, imei: string) => {
    dispatch({ type: 'UPDATE_IMEI', payload: { index, imei } });
  };

  const handleItemRemove = (index: number) => {
    dispatch({ type: 'REMOVE_ITEM', payload: { index } });
  };

  const handleFirstOpen = () => {
    if (!state.firstDropdownOpened) {
      dispatch({ type: 'SET_FIRST_OPEN' });
    }
  };

  const handleCustomerConfirm = useCallback(() => {
    setFocusedField('search');
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
        <InvoiceTimer 
          elapsedMs={elapsedMs} 
          status={state.status} 
          justStarted={justStarted} 
        />
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

        {/* Invoice Table */}
        <InvoiceTable 
          items={state.items}
          onQtyChange={handleQtyChange}
          onImeiChange={handleImeiChange}
          onRemove={handleItemRemove}
          disabled={state.status === 'saved'}
        />

        {/* Summary Panel */}
        <SummaryPanel 
          subtotal={subtotal}
          gstTotal={gstTotal}
          total={total}
          isEmpty={state.items.length === 0}
        />
      </div>
    </div>
  );
}
