import { className } from '@/class-name'

describe('className', () => {
  test('basic', () => {
    expect(className()).toBe(undefined)

    expect(className('')).toBe(undefined)

    expect(className('a')).toBe('a')

    expect(className(['a', 'b'])).toBe('a b')

    expect(className(['a', true && 'b'])).toBe('a b')
    expect(className(['a', false && 'b'])).toBe('a')

    expect(className(() => 'a')).toBe('a')
  })
})
