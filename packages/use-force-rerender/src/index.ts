import { useState } from 'react'

export default function useForceRender (): () => void {
  let fn: () => void

  const [, setValue] = useState(() => {
    fn = () => setValue((value: any) => ++value)
    return 0
  })

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return fn!
}
