import { useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { Address, formatUnits, parseUnits } from 'viem'
import ERC20ABI from '../abis/ERC20.json'
import { CONTRACT_ADDRESSES, TOKEN_DECIMALS } from '../config'

export function useTokenBalance(tokenAddress: Address, account: Address | undefined) {
  return useReadContract({
    address: tokenAddress,
    abi: ERC20ABI,
    functionName: 'balanceOf',
    args: account ? [account] : undefined,
    enabled: !!account,
  })
}

export function useTokenAllowance(
  tokenAddress: Address,
  owner: Address | undefined,
  spender: Address
) {
  return useReadContract({
    address: tokenAddress,
    abi: ERC20ABI,
    functionName: 'allowance',
    args: owner ? [owner, spender] : undefined,
    enabled: !!owner,
  })
}

export function useApproveToken() {
  const { writeContract, data: hash, error, isPending } = useWriteContract()
  
  const { data: receipt, isLoading: isConfirming } = useWaitForTransactionReceipt({
    hash,
  })

  const approve = async (
    tokenAddress: Address,
    spender: Address,
    amount: string
  ) => {
    const amountInWei = parseUnits(amount, TOKEN_DECIMALS)
    
    writeContract({
      address: tokenAddress,
      abi: ERC20ABI,
      functionName: 'approve',
      args: [spender, amountInWei],
    })
  }

  return {
    approve,
    hash,
    receipt,
    error,
    isPending,
    isConfirming,
  }
}

export function useTokenInfo(tokenAddress: Address) {
  const name = useReadContract({
    address: tokenAddress,
    abi: ERC20ABI,
    functionName: 'name',
  })

  const symbol = useReadContract({
    address: tokenAddress,
    abi: ERC20ABI,
    functionName: 'symbol',
  })

  const decimals = useReadContract({
    address: tokenAddress,
    abi: ERC20ABI,
    functionName: 'decimals',
  })

  return {
    name: name.data,
    symbol: symbol.data,
    decimals: decimals.data,
    isLoading: name.isLoading || symbol.isLoading || decimals.isLoading,
  }
}