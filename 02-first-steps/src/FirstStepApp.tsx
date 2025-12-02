import ItemCounter from "./shopping-car/ItemCounter";

interface ItemInCar {
    productName: string;
    quantity: number;
}

const itemsInCart: ItemInCar[] = [
    { productName: 'Nintendo Switch', quantity: 2 },
    { productName: 'Pro Controller', quantity: 3 },
    { productName: 'Nintendo Switch Oled', quantity: 2 }
];

export function FirstStepApp() {
    return (
        <>
            <h1>Carritos de Compras</h1>

            {
                itemsInCart.map(({ productName, quantity }) => ( // los parentesis () son para revolver directamente el componente
                    <ItemCounter key={productName} nameConsole={productName} quantity={quantity} />
                ))
            }

            {/* <ItemCounter nameConsole="Nintendo Switch" quantity={2} />
            <ItemCounter nameConsole="Pro Controller" quantity={4} /> */}
            {/* <ItemCounter nameConsole="Super Smash" quantity={3} /> */}
        </>
    );
}