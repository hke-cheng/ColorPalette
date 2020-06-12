import React from "react";
import DraggableColorBox from "./DraggableColorBox";
import { SortableContainer } from "react-sortable-hoc";



const DraggableColorList = SortableContainer(({ colors, deleteColor }) => {
  return (
    <div style={{ height: "100%" }}>

      {colors.map((c, i) => <DraggableColorBox
        key={c.name}
        color={c.color}
        name={c.name}
        handleClick={() => deleteColor(c.name)}

        index={i}
      />)}

    </div>
  );
})

export default DraggableColorList;