import React, { useContext } from "react";
import Element from "../Element";
import Context from "../../context";

import "./List.sass";

const List = () => {
  const { state, actions } = useContext(Context);

  return (
    <nav id="List_main_container">
      {state.notes.map((value, key) => (
        <Element
          key={key}
          index={key}
          value={value.content}
          active={key === state.activeKey}
        />
      ))}
      <section id="List_add_element_button_container">
        <button id="List_add_element_button" onClick={() => actions.addNote()}>
          +
        </button>
      </section>
    </nav>
  );
};

export default List;
