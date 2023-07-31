import { throttle } from 'throttle-debounce'
import { useState, useEffect, useCallback } from 'react'

const useThrottledState = <T>(initialValue: T, delay: number) => {
  const [value, setValue] = useState(initialValue)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const setThrottledValue = useCallback(
    throttle(delay, (value: T) => {
      setValue(value)
    }),
    [delay]
  )

  useEffect(() => {
    setThrottledValue(initialValue)
  }, [initialValue, setThrottledValue])

  return [value, setThrottledValue] as const
}

export default useThrottledState
