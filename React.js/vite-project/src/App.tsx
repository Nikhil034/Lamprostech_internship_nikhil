import { useState } from "react";
import Aleart from "./components/Aleart";
import Button from "./components/Button";
import ListGroup from "./components/ListGroup";

function App() {
  let items = ["New York", "Paris", "LA", "USA"];
  const handleSelectItem = (item: string) => {
    console.log(item);
  };
  const [IsalertVisible, setAlertVisibility] = useState(false);
  return (
    <div>
      {/* <ListGroup
        items={items}
        heading="Cities"
        onSelectItem={handleSelectItem}
      /> */}

      {IsalertVisible && (
        <Aleart onclick={() => setAlertVisibility(false)}>
          <b>Hello World</b>
        </Aleart>
      )}
      <Button onClick={() => setAlertVisibility(true)}>Click Here!</Button>
    </div>
  );
}
export default App;
