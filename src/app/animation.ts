import {
    animate,
    query,
    sequence,
    stagger,
    style,
    transition,
    trigger
  } from "@angular/animations";
  
  export const DropDownAnimation = trigger("dropDownMenu", [
    transition(":enter", [
      style({ height: 0, overflow: "hidden" }),
      query(".navbar-nav", [
        style({ opacity: 0, transform: "translateY(-50px)" })
      ]),
      sequence([
        animate("200ms", style({ height: "*" })),
        query(".navbar-nav", [
          stagger(-50, [
            animate("400ms ease", style({ opacity: 1, transform: "none" }))
          ])
        ])
      ])
    ]),
  
    transition(":leave", [
      style({ height: "*", overflow: "hidden" }),
      query(".navbar-nav", [style({ opacity: 1, transform: "none" })]),
      sequence([
        query(".navbar-nav", [
          stagger(50, [
            animate(
              "400ms ease",
              style({ opacity: 0, transform: "translateY(-50px)" })
            )
          ])
        ]),
        animate("200ms", style({ height: 0 }))
      ])
    ])
  ]);
  