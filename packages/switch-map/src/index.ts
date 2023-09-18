// TODO: implement createSwitchMap(...) to create switchMap with e.g.: the default fallback

function switchMap <T extends string | number | symbol, U = any> (
  expression: T,
  cases: Partial<Record<T, U>> & Partial<Record<'default', U>> & Record<string, U>
): U

function switchMap <T extends string | number | symbol, U = any, V = any> (
  expression: T,
  cases: Partial<Record<T, U>> & Partial<Record<'default', U>> & Record<string, U>,
  options?: {
    fallback?: U | V
  }
): U | V

function switchMap (expression: any, cases: any, options?: any): any {
  if (typeof cases !== 'object' || cases === null) {
    throw new TypeError(
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      `Cases must be an object, got: ${cases} (typeof === "${typeof cases}").`
    )
  }

  if (expression in cases) {
    return cases[expression]
  }

  if ('default' in cases) {
    return cases.default
  }

  let hasFallback = false
  let fallback: any

  if (typeof options === 'object' && options !== null) {
    if ('fallback' in options) {
      hasFallback = true
      fallback = options.fallback
    }
  }

  if (Object.keys(cases).length === 0 && !hasFallback) {
    throw new Error('At least a default case or a fallback must be provided.')
  }

  return fallback
}

export default switchMap
