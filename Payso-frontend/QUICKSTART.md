# ArcPay Dashboard - Quick Start Guide

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- npm, yarn, or pnpm package manager

### Installation

```bash
# Navigate to frontend directory
cd Payso-frontend

# Install dependencies (if not already done)
npm install
# or
pnpm install
```

### Run Development Server

```bash
npm run dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Access Dashboard

1. **From Landing Page:** Click the "Dashboard" button in the header
2. **Direct URL:** Navigate to [http://localhost:3000/dashboard](http://localhost:3000/dashboard)

## 📂 Project Structure

```
Payso-frontend/
├── app/
│   ├── dashboard/
│   │   └── page.tsx          # Dashboard page
│   ├── layout.tsx             # Root layout
│   └── page.tsx               # Landing page
├── components/
│   ├── dashboard/             # Dashboard-specific components
│   │   ├── dashboard-layout.tsx
│   │   ├── sidebar.tsx
│   │   ├── stats-cards.tsx
│   │   ├── payments-table.tsx
│   │   ├── activity-chart.tsx
│   │   └── quick-actions.tsx
│   ├── ui/                    # Reusable UI components
│   │   ├── badge.tsx
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── table.tsx
│   │   ├── tabs.tsx
│   │   └── dialog.tsx
│   └── header.tsx             # Landing page header
└── lib/
    ├── types.ts               # TypeScript types
    ├── format.ts              # Utility functions
    └── utils.ts               # General utilities
```

## 🎨 Key Features

### 1. Statistics Cards
- **Total Value Locked:** Aggregate escrow value
- **Total Payments:** Number of all payments
- **Pending Payments:** Awaiting release
- **Claimed Payments:** Successfully claimed

### 2. Payments Table
- View all payments with details
- Status indicators (Pending, Claimable, Claimed, Work Pending)
- Currency conversion display (USDC ↔ EURC)
- Countdown to release date

### 3. Activity Chart
- Visual representation of payment trends
- Interactive tooltips
- Volume tracking

### 4. Quick Actions
- Schedule new payments
- Batch transfers
- Work verification
- Settings configuration

### 5. Responsive Sidebar
- Navigation menu
- User profile
- Mobile-friendly

## 🔧 Customization

### Update Mock Data

Edit `app/dashboard/page.tsx`:

```typescript
const mockStats: DashboardStats = {
  totalPayments: 24,
  totalValue: '125,450.00',
  pendingPayments: 8,
  claimedPayments: 16,
  averagePayment: '5,227.08',
}
```

### Add New Navigation Items

Edit `components/dashboard/sidebar.tsx`:

```typescript
const navItems = [
  { icon: LayoutDashboard, label: 'Overview', href: '/dashboard' },
  { icon: Wallet, label: 'Payments', href: '/dashboard/payments' },
  // Add your items here
]
```

### Modify Color Scheme

Colors are defined in `app/globals.css`:

```css
--primary: oklch(0.62 0.24 264); /* Indigo */
--secondary: oklch(0.25 0.04 255); /* Dark blue-gray */
```

## 🔌 Integration with Smart Contracts

### Step 1: Install Web3 Libraries

```bash
npm install viem wagmi @tanstack/react-query
```

### Step 2: Create Contract Hook

```typescript
// lib/hooks/usePayments.ts
import { useContractRead } from 'wagmi'

export function usePayments(address: string) {
  const { data } = useContractRead({
    address: ESCROW_ADDRESS,
    abi: PayrollEscrowABI,
    functionName: 'getPaymentsByRecipient',
    args: [address],
  })
  return data
}
```

### Step 3: Replace Mock Data

```typescript
// app/dashboard/page.tsx
const payments = usePayments(userAddress)
```

## 📱 Responsive Design

The dashboard is fully responsive:

- **Mobile (< 768px):** Collapsible sidebar, stacked cards
- **Tablet (768px - 1024px):** 2-column grid
- **Desktop (> 1024px):** Full 3-column layout

## 🎯 Next Steps

1. **Connect Wallet:** Integrate Web3 wallet connection
2. **Fetch Real Data:** Replace mock data with blockchain data
3. **Add Transactions:** Implement payment creation and claiming
4. **Error Handling:** Add loading states and error messages
5. **Testing:** Write unit and integration tests

## 📚 Documentation

- **Full Documentation:** See `DASHBOARD.md`
- **Build Summary:** See `DASHBOARD_SUMMARY.md`
- **Component Docs:** JSDoc comments in each file

## 🐛 Troubleshooting

### Issue: Components not rendering
**Solution:** Ensure all dependencies are installed: `npm install`

### Issue: Styles not applying
**Solution:** Check Tailwind CSS configuration in `tailwind.config.js`

### Issue: TypeScript errors
**Solution:** Run `npm run build` to check for type errors

## 🤝 Contributing

When adding new features:

1. Follow existing file structure
2. Add TypeScript types in `lib/types.ts`
3. Document with JSDoc comments
4. Keep components small and focused
5. Use existing UI components from `components/ui/`

## 📞 Support

For issues or questions:
- Check documentation files
- Review component source code
- Inspect browser console for errors

---

**Happy Building! 🚀**

