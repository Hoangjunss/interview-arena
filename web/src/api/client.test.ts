import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { apiClient, ApiError } from './client'

describe('apiClient', () => {
  beforeEach(() => {
    localStorage.clear()
    vi.stubGlobal('fetch', vi.fn())
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('attaches Authorization header when token is present', async () => {
    localStorage.setItem('token', 'abc123')
    ;(fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ status: 'UP' }),
    })

    await apiClient.get('/api/health')

    expect(fetch).toHaveBeenCalledWith(
      '/api/health',
      expect.objectContaining({
        headers: expect.objectContaining({ Authorization: 'Bearer abc123' }),
      })
    )
  })

  it('throws ApiError with status on non-2xx response', async () => {
    ;(fetch as any).mockResolvedValueOnce({
      ok: false,
      status: 401,
      json: async () => ({ message: 'Unauthorized' }),
    })

    await expect(apiClient.get('/api/health')).rejects.toBeInstanceOf(ApiError)
  })
})
