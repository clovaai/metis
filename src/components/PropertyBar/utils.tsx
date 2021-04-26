import { ChangeEvent } from 'react';
import { PropertyValue } from 'store/types';

export function valueTransition(value: string): PropertyValue {
  if (value === 'True' || value === 'true') {
    return true;
  }
  if (value === 'False' || value === 'false') {
    return false;
  }
  if (value === '') {
    return value;
  }
  if (!Number.isNaN(+value)) {
    return +value;
  }
  return value;
}

export function preserveCaret(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
  const caret = event.target.selectionStart;
  const element = event.target;
  window.requestAnimationFrame(() => {
    element.selectionStart = caret;
    element.selectionEnd = caret;
  });
}

export function stopPropagationOnKeydown(event: any) {
  event.nativeEvent.stopImmediatePropagation();
}

