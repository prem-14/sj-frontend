import { useState, useCallback } from 'react'
import { useDispatch } from 'react-redux'

export function useThunk(thunk) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const dispatch = useDispatch()

  const runThunk = useCallback(
    (arg) => {
      setIsLoading(true)
      const promise = dispatch(thunk(arg))

      promise
        .unwrap()
        .catch((err) => err.name !== 'AbortError' && setError(err))
        .finally(() => setIsLoading(false))

      return promise
    },
    [dispatch, thunk]
  )

  return [runThunk, isLoading, error]
}
