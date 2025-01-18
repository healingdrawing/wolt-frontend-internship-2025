export const is_focusable = (element: HTMLElement): boolean => {
  const focusable_elements = ['INPUT', 'SELECT', 'TEXTAREA', 'BUTTON','A']
  return focusable_elements.includes(element.tagName) || 
    (element.hasAttribute('tabindex') && element.tabIndex >= 0)
};

export const find_next_focusable_element = (current_element: HTMLElement): HTMLElement | null => {
  const focusable_elements = Array.from(document.querySelectorAll<HTMLElement>(
      'input, select, textarea, button, [tabindex]:not([tabindex="-1"])'
  ))

  const current_index = focusable_elements.indexOf(current_element)

  return current_index !== -1 && current_index + 1 < focusable_elements.length
      ? focusable_elements[current_index + 1]
      : null
}

/** move focus to next focusable HTMLElement if found. not looped */
export const simulate_tab_event = (current_element: HTMLElement) => {
  find_next_focusable_element(current_element)?.focus()
}
