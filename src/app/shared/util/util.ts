
export function noSpaceValidator(control: import('@angular/forms').AbstractControl) {
  const hasSpace = typeof control.value === 'string' && /\s/.test(control.value);
  return hasSpace ? { noSpace: 'Spaces are not allowed.' } : null;
}
