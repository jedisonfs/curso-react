interface Props {
    nameConsole: string;
    quantity?: number
};

const ItemCounter = ({ nameConsole, quantity }: Props) => {
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
        <button>+1</button> 
        <span>{quantity}</span>
        <button>-1</button>
    </section>
  );
};

export default ItemCounter

