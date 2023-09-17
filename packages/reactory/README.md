<h1 align="center">
  @reactory/class-name
</h1>

<br />

<!-- Badges - 1st row -->
<p align="center">
  <!-- NPM badge -->
  <a href="https://www.npmjs.com/package/@reactory/class-name"><img src="https://img.shields.io/npm/v/@reactory/class-name?color=brightgreen&logo=npm" alt="release-badge"></a>
  <!-- CI badge -->
  <a href="https://github.com/reactory/class-name/actions?query=workflow%3ACI"><img src="https://github.com/reactory/class-name/workflows/CI/badge.svg" alt="ci-badge"></a>
  <!-- Coverage badge -->
  <a href="https://codecov.io/gh/reactory/class-name"><img src="https://img.shields.io/codecov/c/github/reactory/class-name?logo=codecov&logoColor=white" alt="coverage-badge"></a>
  <!-- Dependency badge -->
  <a href="https://github.com/reactory/class-name/pulls?q=is%3Apr+is%3Aopen+label%3Asecurity"><img src="https://img.shields.io/badge/Dependabot-✔-brightgreen.svg?logo=dependabot" alt="dependency-badge"></a>
</p>

<!-- Badges - 2nd row -->
<p align="center">
  <!-- Code style badge -->
  <a href="https://www.npmjs.com/package/ts-standard"><img src="https://img.shields.io/badge/Code-TS--Standard-3178C6.svg?logo=typescript&logoColor=white" alt="code-style-badge"></a>
  <!-- Commit style badge -->
  <a href="https://github.com/semantic-release/semantic-release/blob/master/CONTRIBUTING.md#commit-message-guidelines"><img src="https://img.shields.io/badge/Commit-Conventional_Commits-EF7B4D.svg?logo=git&logoColor=white" alt="commit-style-badge"></a>
  <!-- Release workflow badge -->
  <a href="https://semantic-release.gitbook.io/semantic-release"><img src="https://img.shields.io/badge/Release-Semantic_Release-ED2B88.svg?logo=semanticweb&logoColor=white" alt="release-workflow-badge"></a>    
</p>

<!-- Badges - 3rd row -->
<p align="center">
  <!-- License badge -->
  <a href="https://github.com/reactory/class-name/blob/main/LICENSE"><img src="https://img.shields.io/badge/License-MIT-brightgreen.svg?logo=github" alt="license-badge"></a>
  <!-- Contribution badge -->
  <a href="https://github.com/reactory/class-name/blob/main/.github/CONTRIBUTING.md"><img src="https://img.shields.io/badge/PRs-Welcome!-brightgreen.svg?logo=git&logoColor=white" alt="contribution-badge"></a>
</p>

---

<h3 align="center">
  Manageable, conditional, flexible CSS classes in React.
</h3>

<p align="center">
  A simple, lightweight yet powerful JavaScript <b>utility function for React <br/> to easily manage CSS classes</b> via the <code>className</code> attribute.
</p>

---

## 🤔 Why?

- 1.: simplified and flexible CSS class management in React
- 2.: multiple, combinable, conditional, and fault tolerant class names from strings, objects, arrays, and functions
- 3.: handles deeply nested arrays, objects, and functions
- 4.: handles class names with leading dots (e.g.: `'.class-name'` => `'class-name'`)

## 📦 Installation

```
npm i @reactory/class-name
```

## ☕ Usage

```jsx
import React from 'react'
import className from '@reactory/class-name'

// Regular use cases
export function Container (props) {
  return (
    <div
      className={className(
        'container',                      // regular CSS class
        '.fluid',                         // CSS class with a leading dot
        props.active && 'active',         // conditional CSS class        
        { shrunken: !props.isStretched }, // conditional CSS class in an object
        [ props.isMarked && 'marked'   ], // conditional CSS class in an array
      )}
    >
      {props.children}
    </div>
  )
}

/**
 * Built-in deduplication
 * 
 * Classes will be excluded or included from the class list
 * based on their falsy or truthy values.
 */
export function Button (props) {
  return (
    <button
      className={className(
        // if true, btn-hover class will be added to the class list
        { 'btn-hover': props.isHover },
        
        // ...        
        
        // then later, btn-hover will be removed from the class list
        { 'btn-hover': !props.disabled },

        // ...

        // then again, later will be added again to the class list
        { 'btn-hover': props.isHoverEnforced },
      )}
    >
      {props.label}
    </button>
  )
}
```

---

## 💻 API

<!--- <% api --->
<!--- api %> --->

---

## ⭐ Related

- [@reactory on NPM](https://www.npmjs.com/org/reactory)

## 🍻 Contribution

**Any contribution is ***highly appreciated*****. To get going, check out the [**contribution guidelines**][url-contrib-doc].

***Thank you!***

## ©️ License

[MIT][url-license-doc] @ [Richard King](https://richrdkng.com)

<!--- References =============================================================================== -->

<!--- URLs -->
[url-license-doc]: https://github.com/reactory/class-name/blob/main/LICENSE
[url-contrib-doc]: https://github.com/reactory/class-name/blob/main/.github/CONTRIBUTING.md
