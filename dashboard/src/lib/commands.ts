export type Command = {
  id:string;
  label:string;
  run:()=>void;
};

export const createCommands = (actions:{
  sync:()=>void;
  setView:(v:any)=>void;
  toggleTheme:()=>void;
}) : Command[] => [

  {
    id:"sync",
    label:"Run sync now",
    run: actions.sync
  },

  {
    id:"upcoming",
    label:"Go to upcoming contests",
    run:()=>actions.setView("upcoming")
  },

  {
    id:"calendar",
    label:"Open calendar view",
    run:()=>actions.setView("calendar")
  },

  {
    id:"table",
    label:"Open contests table",
    run:()=>actions.setView("table")
  },

  {
    id:"theme",
    label:"Toggle theme",
    run: actions.toggleTheme
  }
];