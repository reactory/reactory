import switchMap from '../src'

test('is a function', () => {
  expect(switchMap).toBeFunction()
})

test('general usage', () => {
  type Value = 'a' | 'b' | 'c'

  expect(switchMap('a' as Value, { a: 1, b: 2, c: 3 })).toBe(1)
  expect(switchMap('b' as Value, { a: 1, b: 2, c: 3 })).toBe(2)
  expect(switchMap('c' as Value, { a: 1, b: 2, c: 3 })).toBe(3)

  expect(switchMap('a' as Value, { a: '1', b: 2, c: false })).toBe('1')
  expect(switchMap('b' as Value, { a: '1', b: 2, c: false })).toBe(2)
  expect(switchMap('c' as Value, { a: '1', b: 2, c: false })).toBe(false)
})

test('default case', () => {
  expect(switchMap('a', { default: false })).toBe(false)
  expect(switchMap('a', { b: 1, default: null })).toBe(null)
})

test('fallback', () => {
  expect(switchMap('a', { b: 1 }, { fallback: null })).toBe(null)
  expect(switchMap('a', {}, { fallback: false })).toBe(false)
})

describe('errors', () => {
  test('cases object is empty without a fallback', () => {
    // @ts-expect-error
    expect(() => switchMap('a')).toThrowWithMessage(
      TypeError,
      'Cases must be an object, got: undefined (typeof === "undefined").'
    )
  })

  test('cases object is empty without a fallback', () => {
    expect(() => switchMap('a', {})).toThrowWithMessage(
      Error,
      'At least a default case or a fallback must be provided.'
    )
  })
})
