type KeyBoardDictionary = { [key in KeyBoardKey]?: () => void };

enum KeyBoardKey {
  Enter = 'Enter',
  Esc = 'Escape',
  Backspace = 'Backspace',
}

export { KeyBoardDictionary, KeyBoardKey };
