import { QueryClient } from "@tanstack/react-query";
import {
  persistQueryClient,
  type PersistedClient,
  type Persister,
} from "@tanstack/query-persist-client-core";

const PERSISTENCE_KEY = "pokemon-home:query-cache";
const PERSISTENCE_BUSTER = "pokemon-home-api-v1";
const PERSISTENCE_MAX_AGE = 1000 * 60 * 60 * 24 * 7;

function createLocalStoragePersister(storage: Storage): Persister {
  return {
    persistClient: async (client: PersistedClient) => {
      try {
        storage.setItem(PERSISTENCE_KEY, JSON.stringify(client));
      } catch {
        // A full or unavailable storage must never make a query fail.
      }
    },
    restoreClient: async () => {
      try {
        const value = storage.getItem(PERSISTENCE_KEY);
        return value ? (JSON.parse(value) as PersistedClient) : undefined;
      } catch {
        return undefined;
      }
    },
    removeClient: async () => {
      try {
        storage.removeItem(PERSISTENCE_KEY);
      } catch {
        // Ignore storage failures and let Query continue with its memory cache.
      }
    },
  };
}

function createQueryClient() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        gcTime: PERSISTENCE_MAX_AGE,
        refetchOnWindowFocus: false,
        retry: 2,
        staleTime: 1000 * 60 * 5,
      },
    },
  });

  if (typeof window === "undefined") {
    return { queryClient, queryCacheReady: Promise.resolve() };
  }

  const [, queryCacheReady] = persistQueryClient({
    buster: PERSISTENCE_BUSTER,
    dehydrateOptions: {
      shouldDehydrateQuery: (query) => query.queryKey[0] === "pokemon",
    },
    maxAge: PERSISTENCE_MAX_AGE,
    persister: createLocalStoragePersister(window.localStorage),
    queryClient,
  });

  return { queryClient, queryCacheReady };
}

export function getContext() {
  const { queryClient, queryCacheReady } = createQueryClient();

  return {
    queryClient,
    queryCacheReady,
  };
}
export default function TanstackQueryProvider() {}
