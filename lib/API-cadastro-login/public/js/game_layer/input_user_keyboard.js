export default function create_keyboard_listener(document) {
    const state = {
        observers: [],
    };

    // Registrando um Observer em um Subject
    function subscribe(observerFunction) {
        state.observers.push(observerFunction);
    }

    // Notificando os Observers
    function notifyAll(command) {
        console.log(
            `KeyboardListener -> Notifying ${state.observers.length} observers`
        );

        // "for of" é muito utilizado para Percorrer os indices de um Array
        for (const observerFunction of state.observers) {
            observerFunction(command);
        }
    }

    document.addEventListener("keyup", input_key_down);

    function input_key_down(event) {
        const keyPressed = event.key;

        //Most Important Object of System
        const command = {
            playerId: "player1",
            keyPressed,
        };

        notifyAll(command);
    }
    return {
        subscribe,
    };
}
