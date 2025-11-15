import { useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { Address, formatUnits, parseUnits } from 'viem'
import PayrollEscrowABI from '../abis/PayrollEscrow.json'
import { CONTRACT_ADDRESSES, TOKEN_DECIMALS } from '../config'

export interface Payment {
  id: bigint
  recipient: Address
  amount: bigint
  releaseAt: bigint
  claimed: boolean
  requiresWorkEvent: boolean
  stablecoin: Address
  preferredPayout: Address
}

export function usePayrollEscrow() {
  const { writeContract, data: hash, error, isPending } = useWriteContract()
  
  const { data: receipt, isLoading: isConfirming } = useWaitForTransactionReceipt({
    hash,
  })

  const depositAndSchedule = async (
    recipient: Address,
    amount: string,
    releaseAt: number,
    requiresWorkEvent: boolean,
    stablecoin: Address,
    preferredPayout: Address
  ) => {
    const amountInWei = parseUnits(amount, TOKEN_DECIMALS)
    
    writeContract({
      address: CONTRACT_ADDRESSES.PayrollEscrow,
      abi: PayrollEscrowABI,
      functionName: 'depositAndSchedule',
      args: [
        recipient,
        amountInWei,
        BigInt(releaseAt),
        requiresWorkEvent,
        stablecoin,
        preferredPayout,
      ],
    })
  }

  const claimPayment = async (paymentId: bigint) => {
    writeContract({
      address: CONTRACT_ADDRESSES.PayrollEscrow,
      abi: PayrollEscrowABI,
      functionName: 'claimPayment',
      args: [paymentId],
    })
  }

  const verifyWork = async (paymentId: bigint, signature: `0x${string}`) => {
    writeContract({
      address: CONTRACT_ADDRESSES.PayrollEscrow,
      abi: PayrollEscrowABI,
      functionName: 'verifyWork',
      args: [paymentId, signature],
    })
  }

  return {
    depositAndSchedule,
    claimPayment,
    verifyWork,
    hash,
    receipt,
    error,
    isPending,
    isConfirming,
  }
}

export function useGetPayment(paymentId: bigint) {
  return useReadContract({
    address: CONTRACT_ADDRESSES.PayrollEscrow,
    abi: PayrollEscrowABI,
    functionName: 'getPayment',
    args: [paymentId],
  })
}

export function useGetPaymentsByRecipient(recipient: Address) {
  return useReadContract({
    address: CONTRACT_ADDRESSES.PayrollEscrow,
    abi: PayrollEscrowABI,
    functionName: 'getPaymentsByRecipient',
    args: [recipient],
  })
}

export function useIsClaimable(paymentId: bigint) {
  return useReadContract({
    address: CONTRACT_ADDRESSES.PayrollEscrow,
    abi: PayrollEscrowABI,
    functionName: 'isClaimable',
    args: [paymentId],
  })
}

export function useWorkVerified(paymentId: bigint) {
  return useReadContract({
    address: CONTRACT_ADDRESSES.PayrollEscrow,
    abi: PayrollEscrowABI,
    functionName: 'workVerified',
    args: [paymentId],
  })
}

export function usePaymentCounter() {
  return useReadContract({
    address: CONTRACT_ADDRESSES.PayrollEscrow,
    abi: PayrollEscrowABI,
    functionName: 'paymentCounter',
  })
}

export function useEmployer() {
  return useReadContract({
    address: CONTRACT_ADDRESSES.PayrollEscrow,
    abi: PayrollEscrowABI,
    functionName: 'employer',
  })
}