import { Key } from "../../Constants";

export const keys: string[] = [
  Key.W.toUpperCase(),
  Key.A.toUpperCase(),
  Key.S.toUpperCase(),
  Key.D.toUpperCase(),
];

export const instructions: string[] = [
  "You may encounter a monster to battle when you walk on green grass patches!",
  "During battling, you can view the attack type when hovering over an attack.",
  "After your attack is completed, please click on the dialog box or press space to continue.",
  "Once your turn is over, it will be the enemy's turn and his attack will be randomized.",
  "Have fun exploring Rockquay Town!",
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
