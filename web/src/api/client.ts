export class ApiError extends Error {
  status: number
  constructor(status: number, message: string) {
    super(message)
    this.status = status
  }
}

function buildHeaders(): Record<string, string> {
  const headers: Record<string, string> = { 'Content-Type': 'application/json' }
  const token = localStorage.getItem('token')
  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }
  return headers
}

async function handle<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const body = await response.json().catch(() => ({ message: response.statusText }))
    throw new ApiError(response.status, body.message ?? 'Request failed')
  }
  if (response.status === 204) return undefined as unknown as T
  return response.json() as Promise<T>
}

export const apiClient = {
  get: async <T>(path: string): Promise<T> => {
    const response = await fetch(path, { headers: buildHeaders() })
    return handle<T>(response)
  },
  post: async <T>(path: string, body: unknown): Promise<T> => {
    const response = await fetch(path, {
      method: 'POST',
      headers: buildHeaders(),
      body: JSON.stringify(body),
    })
    return handle<T>(response)
  },
  put: async <T>(path: string, body: unknown): Promise<T> => {
    const response = await fetch(path, {
      method: 'PUT',
      headers: buildHeaders(),
      body: JSON.stringify(body),
    })
    return handle<T>(response)
  },
}

