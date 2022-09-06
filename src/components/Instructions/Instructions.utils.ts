export enum KeyImages {
  ARROW_KEYS = "ARROW_KEYS",
  WASD_KEYS = "WASD_KEYS",
  SPACEBAR_KEY = "SPACEBAR_KEY",
}

export const instructions: string[] = [
  "1. Use the WASD or arrow keys to move player.",
  "2. You can encounter a monster to battle when you walk on grass patches!",
  "3. During battling, you can view the attack type when hovering over an attack.",
  "4. After your attack is completed, you may click on the dialog box or press the spacebar key to continue.",
  "5. Once your turn is over, it will be the enemy's turn and his attack will be randomized.",
  "6. Have fun exploring Rockquay Town!",
];

export const getArrowKeyClassName = (index: number): string => {
  switch (index) {
    case 0:
      return "rotate-90 mr-4";
    case 1:
      return "-rotate-90 mr-3";
    case 2:
      return "rotate-180 mr-2";
  }
  return "mr-3";
};
