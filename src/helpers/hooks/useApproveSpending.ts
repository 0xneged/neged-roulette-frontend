import { useWriteContract } from 'wagmi'

export default function () {
  const { writeContract } = useWriteContract()

  //   return () =>
  //     writeContract({
  //       abi: '',
  //       address: '0x6b175474e89094c44da98b954eedeac495271d0f',
  //       functionName: 'transferFrom',
  //       args: [
  //         '0xd2135CfB216b74109775236E36d4b433F1DF507B',
  //         '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
  //         123n,
  //       ],
  //     })
  return writeContract
}
