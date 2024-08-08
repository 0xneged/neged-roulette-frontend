import { QueryClient } from '@tanstack/react-query'

const queryClient = new QueryClient()

export async function invalidateManyQueries(queries: string[]) {
  for (const queryKey of queries) {
    await queryClient.invalidateQueries({ queryKey: [queryKey] })
  }
}

export const setHatsQueryData = (address: string, num: number) =>
  queryClient.setQueryData([`hatsCounter${address}`], num)

export default queryClient
