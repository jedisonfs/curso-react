import ItemCounter from "./shopping-car/ItemCounter";

export function FirstStepApp() {
    return (
        <>
            <h1>Carritos de Compras</h1>
            <ItemCounter nameConsole="Nintendo Switch" quantity={2}/>
            <ItemCounter nameConsole="Pro Controller" quantity={4}/>
            <ItemCounter nameConsole="Super Smash" quantity={3}/>
        </>
    );
}