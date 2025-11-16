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

export function useGetPaymentsByRecipient(recipient?: Address) {
  return useReadContract({
    address: CONTRACT_ADDRESSES.PayrollEscrow,
    abi: PayrollEscrowABI,
    functionName: 'getPaymentsByRecipient',
    args: recipient ? [recipient] : undefined,
    // Use query options for conditional execution
    query: {
      enabled: Boolean(recipient), // Only enable if recipient is provided
    },
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

export function useIsAuthorizedEmployer(address?: Address) {
  return useReadContract({
    address: CONTRACT_ADDRESSES.PayrollEscrow,
    abi: PayrollEscrowABI,
    functionName: 'isAuthorizedEmployer',
    args: address ? [address] : undefined,
    // Use query options for conditional execution
    query: {
      enabled: Boolean(address), // Only enable if address is provided
      retry: 2,
      retryDelay: 1000,
    },
  })
}

export function useAddAuthorizedEmployer() {
  const { writeContract, data: hash, error, isPending } = useWriteContract()
  
  const { data: receipt, isLoading: isConfirming } = useWaitForTransactionReceipt({
    hash,
  })

  const addAuthorizedEmployer = async (newEmployer: Address) => {
    writeContract({
      address: CONTRACT_ADDRESSES.PayrollEscrow,
      abi: PayrollEscrowABI,
      functionName: 'addAuthorizedEmployer',
      args: [newEmployer],
    })
  }

  return {
    addAuthorizedEmployer,
    hash,
    receipt,
    error,
    isPending,
    isConfirming,
  }
}

export function useRemoveAuthorizedEmployer() {
  const { writeContract, data: hash, error, isPending } = useWriteContract()
  
  const { data: receipt, isLoading: isConfirming } = useWaitForTransactionReceipt({
    hash,
  })

  const removeAuthorizedEmployer = async (employerToRemove: Address) => {
    writeContract({
      address: CONTRACT_ADDRESSES.PayrollEscrow,
      abi: PayrollEscrowABI,
      functionName: 'removeAuthorizedEmployer',
      args: [employerToRemove],
    })
  }

  return {
    removeAuthorizedEmployer,
    hash,
    receipt,
    error,
    isPending,
    isConfirming,
  }
}