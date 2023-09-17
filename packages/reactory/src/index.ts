// TODO: implement deduplication
// TODO: handle leading dot (e.g.: ".class-name") - like traditional CSS classes
// TODO: configure - handle returning an empty string (or custom string???), instead of a undefined for no classes

/**
 * @internal
 */
const _hasOwnProperty = Object.hasOwnProperty

/**
 * @internal
 */
const _pattern = /\./g

/**
 * @internal
 */
const _parse = (value: any, classList: string[]): void => {
  // handle strings ------------------------------------------------------------
  if (typeof value === 'string') {
    classList.push(value)

  // handle objects ------------------------------------------------------------
  } else if (value !== null && typeof value === 'object') {
    // handle array-likes
    if (value.length > 0) {
      for (const entry of value) {
        _parse(entry, classList)
      }

    // handle plain objects
    } else {
      for (const key in value) {
        if (_hasOwnProperty.call(value, key)) {
          let v = value[key]

          if (typeof v === 'function') {
            v = v()
          }

          if (v === true) {
            classList.push(key)
          }
        }
      }
    }

  // handle functions ----------------------------------------------------------
  } else if (typeof value === 'function') {
    _parse(value(), classList)
  }
}

/**
 * A simple React utility function to easily manage CSS classes.
 *
 * @param [classes] - A CSS class name, an array, an object,
 *                    or a function of class names.
 *
 * @returns A string containing the processed class(es).
 *          Otherwise undefined, if all and every class is falsy.
 *
 * @example Parsing a basic JSON file
 * ```ts
 * const a: number = 1;
 * ```
 */
export default function className (...classes: any[]): string | undefined {
  if (classes.length === 0) {
    return
  }

  const classList: string[] = []

  _parse(classes, classList)

  if (classList.length === 0) {
    return
  }

  const trimmedList = classList
    .join(' ')
    .trim()
    .replace(_pattern, '')

  if (trimmedList.length > 0) {
    return trimmedList
  }
}
