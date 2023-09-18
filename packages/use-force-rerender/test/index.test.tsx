import '@testing-library/jest-dom'

import React from 'react'
import { render } from '@testing-library/react'
import { renderHook, act } from '@testing-library/react-hooks'

import useForceRerender from '../src'

test('is a function', () => {
  expect(useForceRerender).toBeFunction()
})

test('basic usage', () => {
  const { result } = renderHook(() => useForceRerender())

  expect(result.current).toBeFunction()

  const forceRerender = result.current
  let renderCount = 0

  const Component = (): JSX.Element => {
    renderCount++
    return (
      <p>render count: {renderCount}</p>
    )
  }

  const _1stRender = render(<Component />)

  expect(_1stRender.container.querySelector('p')?.innerHTML).toBe('render count: 1')

  act(() => {
    forceRerender()
  })

  const _2ndRender = render(<Component />)

  expect(_2ndRender.container.querySelector('p')?.innerHTML).toBe('render count: 2')
})
