import { useState } from "react";

interface Props {
  nameConsole: string;
  quantity: number
};

const ItemCounter = ({ nameConsole, quantity = 1 }: Props) => {

  // UseState lo que hace es que cada vez que se hace unacion
  // useState siempre debe ir de primeras en la funciion
  // useState utiliza la funcion del segundo parametro setCount, para modificar el valor de la variable a su lado
  //Cuando se quiere cambiar el valor de variable count, se utiliza la funcion de al lado en este caso setCondito
  const [count, setCount] = useState(quantity); // useState se inicializa solo una vez asi re renderise el estado
  // useState se activa cada vez que detecta que se modifico la variable o cambio su estado


  const handleAdd = () => {
    setCount(count + 1);
  }

  const handleSubtract = () => {
    if (count === 0) return
    setCount(count - 1); // setCOunt es el nombre de la vairbale que se destructuro del userState
  }


  const handleClick = () => {
    console.log({ nameConsole });
  }

  return (
    <section style={{
      display: 'flex',
      alignItems: 'center',
      gap: 10
    }}
    >
      <span
        style={{
          width: 150
        }}>{nameConsole}</span>
      <button
        onClick={handleAdd}
      >+1</button>
      <span>{count}</span>
      <button onClick={handleSubtract}>-1</button>
    </section>
  );
};

export default ItemCounter

