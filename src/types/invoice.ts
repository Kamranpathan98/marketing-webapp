// Full types will be implemented in P1-T4
// Stubs defined here so imports don't break during setup

export interface Product {
  id: number
  name: string
  model: string
  category: string
  price: number
  gst: number
  stock: number
}

export interface InvoiceItem {
  product: Product
  qty: number
  imei?: string
}

export type InvoiceStatus = 'idle' | 'active' | 'saved'

export type FocusField = 'customer' | 'search' | `qty-${number}` | `imei-${number}`

export interface InvoiceState {
  customer: string
  items: InvoiceItem[]
  status: InvoiceStatus
  startTime: number | null
  savedMs: number | null
  hasInteracted: boolean
  firstDropdownOpened: boolean
}

export type InvoiceAction =
  | { type: 'SET_CUSTOMER'; payload: { customer: string } }
  | { type: 'ADD_ITEM'; payload: { product: Product } }
  | { type: 'REMOVE_ITEM'; payload: { index: number } }
  | { type: 'UPDATE_QTY'; payload: { index: number; qty: number } }
  | { type: 'UPDATE_IMEI'; payload: { index: number; imei: string } }
  | { type: 'SET_FIRST_OPEN' }
  | { type: 'SAVE' }
  | { type: 'RESET' }
