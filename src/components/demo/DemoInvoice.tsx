import React, { useReducer, useCallback, useRef, useEffect } from 'react';
import { InvoiceState, InvoiceAction, Product } from '@/types/invoice';
import CustomerField from './CustomerField';
import ProductSearch from './ProductSearch';
import InvoiceTable from './InvoiceTable';
import SummaryPanel from './SummaryPanel';
import InvoiceTimer from './InvoiceTimer';
import SuccessOverlay from './SuccessOverlay';
import { useInvoiceTimer } from '@/hooks/useInvoiceTimer';
import { calcGST } from '@/lib/gst';

const initialState: InvoiceState = {
  customer: '',
  items: [],
  status: 'idle',
  startTime: null,
  savedMs: null,
  hasInteracted: false,
  firstDropdownOpened: false,
};


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


interface DemoInvoiceProps {
  onSave?: (elapsedMs: number) => void;
  onReset?: () => void;
  onStateChange?: (status: 'idle' | 'active' | 'saved', hasInteracted: boolean) => void;
  benchmarkLabel?: string;
}

import { track } from '@/lib/analytics';

export interface DemoInvoiceRef {
  triggerAutoFocus: () => void;
}

const DemoInvoice = React.forwardRef<DemoInvoiceRef, DemoInvoiceProps>(({ 
  onSave, 
  onReset, 
  onStateChange,
  benchmarkLabel = 'Average: 9 sec'
}, ref) => {
  const [state, dispatch] = useReducer(invoiceReducer, initialState);
  const [focusedField, setFocusedField] = React.useState<string>('customer');
  const searchInputRef = useRef<HTMLInputElement>(null);
  const customerInputRef = useRef<HTMLInputElement>(null);

  React.useImperativeHandle(ref, () => ({
    triggerAutoFocus: () => {
      if (state.status === 'idle' && !state.hasInteracted) {
        setFocusedField('customer');
        const el = document.getElementById('customer-name-input');
        if (el) (el as HTMLInputElement).focus({ preventScroll: true });
      }
    }
  }));

  // Sync state to parent
  React.useEffect(() => {
    if (onStateChange) {
      onStateChange(state.status, state.hasInteracted);
    }
  }, [state.status, state.hasInteracted, onStateChange]);

  const { elapsedMs, justStarted } = useInvoiceTimer({ 
    status: state.status, 
    startTime: state.startTime 
  });

  // Derived Values - Computed in render, never stored in state
  const subtotal = state.items.reduce((sum, item) => sum + item.product.price * item.qty, 0);
  const gstTotal = state.items.reduce((sum, item) => sum + calcGST(item.product.price * item.qty, item.product.gst), 0);
  const total = subtotal + gstTotal;

  const handleSave = useCallback(() => {
    if (state.items.length > 0 && state.status !== 'saved') {
      const elapsed = state.startTime ? Date.now() - state.startTime : 0;
      dispatch({ type: 'SAVE' });
      
      track({
        event: 'demo_completed',
        elapsed_ms: elapsed,
        item_count: state.items.length,
        used_walk_in: state.customer === 'Walk-in Customer'
      });

      if (onSave) {
        onSave(elapsed);
      }
    }
  }, [state.items.length, state.status, state.startTime, state.customer, onSave]);

  const handleReset = useCallback(() => {
    track({
      event: 'demo_reset',
      previous_elapsed_ms: state.savedMs,
      reset_after_save: state.status === 'saved'
    });
    dispatch({ type: 'RESET' });
    setFocusedField('customer');
    if (onReset) onReset();
  }, [onReset, state.savedMs, state.status]);

  // Ctrl+S Shortcut listener
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        handleSave();
      }
    };
    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, [handleSave]);

  const handleCustomerChange = (customer: string) => {
    if (!state.hasInteracted) {
      track({ event: 'demo_started', trigger: 'customer_field' });
    }
    dispatch({ type: 'SET_CUSTOMER', payload: { customer } });
  };

  const handleItemAdd = (product: Product) => {
    if (!state.hasInteracted) {
      track({ event: 'demo_started', trigger: 'product_search' });
    }
    dispatch({ type: 'ADD_ITEM', payload: { product } });
    track({ 
      event: 'demo_item_added', 
      product_category: product.category,
      item_count: state.items.length + 1,
      elapsed_ms: state.startTime ? Date.now() - state.startTime : 0
    });
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
    <div className={`
      relative w-full max-w-4xl mx-auto bg-surface-card border rounded-xl shadow-2xl overflow-hidden font-sans transition-all
      ${state.status === 'saved' 
        ? 'border-green-500/40 shadow-[0_0_30px_rgba(34,197,94,0.08)] duration-400' 
        : 'border-surface-border duration-200'}
    `}>
      {/* Success Overlay */}
      {state.status === 'saved' && (
        <SuccessOverlay elapsedMs={state.savedMs || 0} onReset={handleReset} />
      )}

      {/* Demo Header */}
      <div className="p-4 border-b border-surface-border-muted bg-surface-elevated/50 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20 text-amber-500 text-[10px] font-bold uppercase tracking-wider">
            Live Demo
          </div>
          <span className="text-zinc-500 text-xs font-medium uppercase tracking-widest flex items-center gap-2">
            <span>New Invoice #{state.startTime ? (state.startTime % 10000).toString().padStart(4, '0') : '8843'}</span>
            <span className="w-1 h-1 rounded-full bg-zinc-800"></span>
            <span className="text-zinc-600 font-bold">{benchmarkLabel}</span>
          </span>
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

        {/* Footer Summary & Save */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-6">
          <div className="w-full md:w-auto">
            <button
              onClick={handleSave}
              disabled={state.items.length === 0 || state.status === 'saved'}
              className="h-11 px-8 bg-zinc-800 hover:bg-zinc-700 disabled:opacity-30 disabled:cursor-not-allowed text-white font-bold rounded-lg transition-all flex items-center gap-2 group"
            >
              <span>Save Invoice</span>
              <kbd className="text-[10px] bg-zinc-900 px-1.5 py-0.5 rounded text-zinc-500 group-hover:text-zinc-300 transition-colors">Ctrl+S</kbd>
            </button>
          </div>

          <SummaryPanel 
            subtotal={subtotal}
            gstTotal={gstTotal}
            total={total}
            isEmpty={state.items.length === 0}
          />
        </div>
      </div>
    </div>
  );
});

DemoInvoice.displayName = 'DemoInvoice';

export default DemoInvoice;
