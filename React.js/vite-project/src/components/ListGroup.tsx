import { useState } from "react";

interface Props {
  items: string[];
  heading: string;
  onSelectItem: (item: string) => void;
}

function ListGroup({ items, heading, onSelectItem }: Props) {
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const getMessage = () => {
    return items.length === 0 ? <p>No item found</p> : null;
    // items.length===0 && <p>No item found</p> true && 1 =>1 true && mosh =>mosh
  };

  return (
    <>
      <h1>{heading}</h1>
      {getMessage()}
      <ul className="list-decimal">
        {items.map((item, index) => (
          <li
            className={selectedIndex == index ? "bg-sky-500" : ""}
            key={item}
            onClick={() => {
              setSelectedIndex(index);
              onSelectItem(item);
            }}
          >
            {item}
          </li>
        ))}
      </ul>
    </>
  );
}

export default ListGroup;
