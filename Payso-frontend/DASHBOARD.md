# ArcPay Dashboard Documentation

## Overview
The ArcPay Dashboard is a comprehensive interface for managing payroll escrow payments on the Arc blockchain. It provides real-time insights, payment management, and analytics.

## File Structure

```
Payso-frontend/
├── app/
│   └── dashboard/
│       └── page.tsx              # Main dashboard page
├── components/
│   ├── dashboard/
│   │   ├── dashboard-layout.tsx  # Layout wrapper with sidebar
│   │   ├── sidebar.tsx           # Navigation sidebar
│   │   ├── stats-cards.tsx       # Statistics overview cards
│   │   ├── payments-table.tsx    # Payments data table
│   │   ├── activity-chart.tsx    # Payment activity chart
│   │   └── quick-actions.tsx     # Quick action buttons
│   └── ui/
│       ├── badge.tsx             # Status badge component
│       ├── table.tsx             # Table components
│       └── tabs.tsx              # Tab navigation
└── lib/
    ├── types.ts                  # TypeScript type definitions
    └── format.ts                 # Data formatting utilities
```

## Features

### 1. **Statistics Overview**
- Total Value Locked (TVL)
- Total Payments Count
- Pending Payments
- Claimed Payments

### 2. **Payment Management**
- View all payments with status
- Filter by status (Pending, Claimable, Claimed, Work Pending)
- Currency conversion indicators (USDC ↔ EURC)
- Release date tracking

### 3. **Activity Analytics**
- Visual chart showing payment trends
- Volume tracking over time
- Interactive tooltips

### 4. **Quick Actions**
- Schedule new payments
- Batch transfers
- Work verification
- Contract configuration

### 5. **Responsive Design**
- Mobile-friendly sidebar
- Adaptive grid layouts
- Touch-optimized interactions

## Components

### StatsCards
Displays key metrics in card format with gradient backgrounds and icons.

**Props:**
- `stats: DashboardStats` - Statistics data object

### PaymentsTable
Renders payment data in a sortable, filterable table.

**Props:**
- `payments: PaymentWithStatus[]` - Array of enhanced payment objects

### ActivityChart
Area chart visualization using Recharts library.

**Props:**
- `data: ActivityData[]` - Time-series payment data

### Sidebar
Responsive navigation with mobile overlay support.

**Features:**
- Collapsible on mobile
- Active route highlighting
- User profile section

## Type Definitions

### Payment Status
```typescript
enum PaymentStatus {
  PENDING = 'pending',
  CLAIMABLE = 'claimable',
  CLAIMED = 'claimed',
  WORK_PENDING = 'work_pending',
}
```

### Payment Interface
```typescript
interface Payment {
  id: number
  recipient: string
  amount: bigint
  releaseAt: number
  claimed: boolean
  requiresWorkEvent: boolean
  stablecoin: string
  preferredPayout: string
}
```

## Utility Functions

### formatAmount(amount: bigint, decimals?: number)
Converts wei amounts to human-readable format.

### formatDate(timestamp: number)
Formats Unix timestamps to readable dates.

### daysUntilRelease(releaseAt: number)
Calculates remaining days until payment release.

### truncateAddress(address: string)
Shortens Ethereum addresses for display.

## Integration with Smart Contracts

The dashboard is designed to integrate with the PayrollEscrow contract:

1. **Read Operations:**
   - `getPayment(paymentId)` - Fetch payment details
   - `getPaymentsByRecipient(address)` - Get user payments
   - `isClaimable(paymentId)` - Check claimability

2. **Write Operations:**
   - `depositAndSchedule()` - Create new payment
   - `claimPayment()` - Claim available payment
   - `verifyWork()` - Approve work completion

## Styling

- **Theme:** Dark mode with indigo/purple gradients
- **Colors:** Consistent with landing page
- **Effects:** Glassmorphism, blur effects, smooth transitions
- **Icons:** Lucide React icon library

## Future Enhancements

- [ ] Real-time blockchain data integration
- [ ] Wallet connection (MetaMask, WalletConnect)
- [ ] Transaction history
- [ ] Export to CSV/PDF
- [ ] Email notifications
- [ ] Multi-language support
- [ ] Advanced filtering and search
- [ ] Payment scheduling calendar view

## Development

```bash
# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Access the dashboard at: `http://localhost:3000/dashboard`

