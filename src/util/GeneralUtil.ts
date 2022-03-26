function removeAccentuation(word: string): string {
  return word.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

export { removeAccentuation };
