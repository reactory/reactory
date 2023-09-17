import className from '../src'

describe('basics', () => {
  test('is a function', () => {
    expect(className).toEqual(expect.any(Function))
  })

  test('called without arguments', () => {
    expect(className()).toBeUndefined()
  })
})

describe('strings', () => {
  test('called with zero length strings', () => {
    expect(className('')).toBeUndefined()
    expect(className('', '')).toBeUndefined()
    expect(className('', '', '')).toBeUndefined()

    expect(className(' ')).toBeUndefined()
    expect(className(' ', ' ')).toBeUndefined()
    expect(className(' ', ' ', ' ')).toBeUndefined()
  })

  test('called with regular strings', () => {
    expect(className('a')).toBe('a')
    expect(className('a', 'b')).toBe('a b')
    expect(className('a', 'b', 'c')).toBe('a b c')
  })

  test('called conditionally with regular strings', () => {
    expect(className(true && 'a')).toBe('a')
    expect(className(false && 'a')).toBeUndefined()
  })
})

describe('arrays', () => {
  test('called with zero length strings', () => {
    expect(className([''])).toBeUndefined()
    expect(className([''], [''])).toBeUndefined()
    expect(className([''], [''], [''])).toBeUndefined()
  })

  test('called with empty strings', () => {
    expect(className([' '])).toBeUndefined()
    expect(className([' '], ['  '])).toBeUndefined()
    expect(className([' '], ['   '], ['     '])).toBeUndefined()
  })

  test('called with regular arrays', () => {
    expect(className(['a'])).toBe('a')
    expect(className(['a'], ['b'])).toBe('a b')
    expect(className(['a'], ['b'], ['c'])).toBe('a b c')

    expect(className(['a'])).toBe('a')
    expect(className(['a', 'b'])).toBe('a b')
    expect(className(['a', 'b', 'c'])).toBe('a b c')
  })

  test('called conditionally with regular arrays', () => {
    expect(className([true && 'a'])).toBe('a')
    expect(className([false && 'a'])).toBeUndefined()

    expect(className([true && 'a', false && 'b', true && 'c'])).toBe('a c')
  })

  describe('deep arrays', () => {
    test('simple deep array', () => {
      expect(className(
        [
          [
            ['a']
          ]
        ]
      )).toBe('a')
    })

    test('deep array with more levels', () => {
      expect(className(
        [
          [
            'a',
            [
              [
                'b'
              ],
              [
                [
                  [
                    [
                      'c'
                    ]
                  ]
                ]
              ]
            ]
          ],
          'd'
        ]
      )).toBe('a b c d')
    })
  })
})

describe('objects', () => {
  test('called conditionally with plain objects', () => {
    expect(className({ a: true })).toBe('a')
    expect(className({ a: false })).toBeUndefined()
  })

  test('called conditionally with a function - true', () => {
    expect(className({ a: () => true })).toBe('a')
  })

  test('called conditionally with a function - false', () => {
    expect(className({ a: () => false })).toBeUndefined()
  })
})

describe('functions', () => {
  describe('basics', () => {
    test('one function', () => {
      expect(className(() => 'a')).toBe('a')
    })

    test('multiple functions', () => {
      expect(className(() => 'a', () => 'b', () => 'c')).toBe('a b c')
    })

    test('multiple functions with a conditional', () => {
      expect(className(() => 'a', () => false && 'b', () => 'c')).toBe('a c')
    })
  })

  describe('functions within an array', () => {
    test('one function within an array', () => {
      expect(className([() => 'a'])).toBe('a')
    })

    test('multiple functions within an array', () => {
      expect(className([() => 'a', () => 'b', () => 'c'])).toBe('a b c')
    })

    test('multiple functions with a conditional within an array', () => {
      expect(className([() => 'a', () => false && 'b', () => 'c'])).toBe('a c')
    })
  })

  describe('functions within a deep array', () => {
    test('a function within a deep array returning a string', () => {
      expect(className(
        [
          [
            [
              () => 'a'
            ]
          ]
        ]
      )).toBe('a')
    })

    test('a function within a deep array returning an array of a string', () => {
      expect(className(
        [
          [
            [
              () => ['a']
            ]
          ]
        ]
      )).toBe('a')
    })

    test('a function within a deep array returning an array of multiple strings', () => {
      expect(className(
        [
          [
            [
              () => ['a', 'b', 'c']
            ]
          ]
        ]
      )).toBe('a b c')
    })
  })
})

describe('misc', () => {
  test('functions within functions returning mixed values', () => {
    expect(className(
      [
        [
          [
            () => [
              () => 'a',
              () => ({ b: true }),
              'c',
              () => [
                'd',
                () => ({
                  e: true
                })
              ]
            ]
          ]
        ]
      ]
    )).toBe('a b c d e')
  })

  test('various level of deep arrays returning mixed values', () => {
    expect(className(
      [
        [
          'a', ['b']
        ],
        'c',
        [
          [
            {
              d: true
            }
          ]
        ],
        [
          [
            [
              [
                [
                  'e',
                  { f: () => true },
                  [
                    'g',
                    [
                      [
                        [
                          'h'
                        ]
                      ]
                    ]
                  ]
                ]
              ]
            ]
          ]
        ]
      ]
    )).toBe('a b c d e f g h')
  })
})

describe('handle leading dots', () => {
  test('simple .class-name', () => {
    expect(className('.class-name')).toBe('class-name')
  })

  test('multiple class names with leading dots', () => {
    expect(className('.a', '.b', '.c')).toBe('a b c')
  })

  test('multiple nested class names with leading dots', () => {
    expect(className(
      [
        '.a',
        [
          '.b'
        ],
        [
          [
            '.c'
          ]
        ]
      ]
    )).toBe('a b c')
  })
})
