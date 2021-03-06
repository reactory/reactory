const toString = Object.prototype.toString
const hasOwnProperty = Object.hasOwnProperty

// TODO: implement empty string handling
// TODO: handle deep arrays and objects (e.g.: [['string-1', ['string-2']], 'string-3'])
// TODO: handle deep functions

const parseArrayIntoClassList = (array: any[], classList: string[]) => {
  for (const entry of array) {
    if (typeof entry === 'string') {
      classList.push(entry)
    } else if (entry && typeof entry === 'object' && entry.length > 0) {
      parseArrayIntoClassList(entry, classList)
    }
  }
}

/**
 * A simple React utility function to easily manage CSS classes.
 *
 * @function className
 *
 * @param [classes] - A CSS class name, or an array, an object,
 *                    or a function of class names.
 *
 * @returns A string containing the processed class(es).
 *          Otherwise undefined, if all and every class is falsy.
 */
export const className = (...classes: any[]): string | undefined => {
  if (classes.length === 0) {
    return
  }

  const classList: string[] = []

  for (const entry of classes) {
    // handle strings ----------------------------------------------------------
    if (typeof entry === 'string') {
      classList.push(entry)

    // handle arrays -----------------------------------------------------------
    } else if (toString.call(entry) === '[object Array]' && entry.length > 0) {
      // for (const subentry of entry) {
      //   if (typeof subentry === 'string') {
      //     classList.push(subentry)
      //   }
      // }
      parseArrayIntoClassList(entry, classList)

    // handle plain objects ----------------------------------------------------
    } else if (entry && typeof entry === 'object') {
      for (const key in entry) {
        if (hasOwnProperty.call(entry, key) && entry[key]) {
          classList.push(key)
        }
      }

    // handle functions --------------------------------------------------------
    } else if (typeof entry === 'function') {
      const result = entry()

      if (typeof result === 'string') {
        classList.push(result)
      }
    }
  }

  if (classList.length === 0) {
    return
  }

  const trimmedList = classList.join(' ').trim()

  if (trimmedList.length > 0) {
    return trimmedList
  }
}
