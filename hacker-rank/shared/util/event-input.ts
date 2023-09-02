export function eventInput(element: HTMLInputElement, value: any): void {
  const event = new Event('input', { bubbles: true });
  element.value = value;
  element.dispatchEvent(event);
}
