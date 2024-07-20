import { QueryClient } from '@tanstack/react-query'

const queryClient = new QueryClient()

queryClient.resumePausedMutations

export async function invalidateManyQueries(queries: string[]) {
  for (const queryKey of queries) {
    await queryClient.invalidateQueries({ queryKey: [queryKey] })
  }
}

export default queryClient
