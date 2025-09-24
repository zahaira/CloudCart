export type Checkout = {
  id: string;
  name: string;
  coverUrl: string;
  stock: number;
  price: number;
  quantity: number;
  subtotal?: number;
};

export type CheckoutDeliveryOption = {
  value: number;
  label: string;
  description: string;
};

export type CheckoutPaymentOption = {
  value: string;
  label: string;
  description: string;
};

export type CheckoutCardOption = {
  value: string;
  label: string;
};

export type CheckoutState = {
  total: number;
  subtotal: number;
  discount: number;
  shipping: number;
  totalItems: number;
  items: Checkout[];
};

export type CheckoutContextValue = CheckoutState & {
  canReset: boolean;
  onReset: () => void;
  onUpdate: (updateValue: Partial<CheckoutState>) => void;
  onUpdateField: (
    name: keyof CheckoutState,
    updateValue: CheckoutState[keyof CheckoutState]
  ) => void;
  //
  completed: boolean;
  //
  onAddToCart: (newItem: Checkout) => void;
  onDeleteCart: (itemId: string) => void;
  //
  onIncreaseQuantity: (itemId: string) => void;
  onDecreaseQuantity: (itemId: string) => void;
  //
  activeStep: number;
  initialStep: () => void;
  onBackStep: () => void;
  onNextStep: () => void;
  onGotoStep: (step: number) => void;
};
