export default function render_screen(screen, game, requestAnimationFrame) {
    const context = screen.getContext("2d");

    context.clearRect(0, 0, screen.width, screen.height);

    // "for in" é muito utilizado para Percorrer Propriedades/Indices de objetos
    for (const playerId in game.state.players) {
        const player = game.state.players[playerId];
        context.fillStyle = "#42e9f4";
        context.fillRect(player.x, player.y, 1, 1);
    }
    for (const alienId in game.state.aliens) {
        const alien = game.state.aliens[alienId];
        context.fillStyle = "#62de6d";
        context.fillRect(alien.x, alien.y, 1, 1);
    }
    for (const playerBulletId in game.state.playerBullets) {
        const playerBullet = game.state.playerBullets[playerBulletId];
        context.fillStyle = "#5353f1";
        context.fillRect(playerBullet.x, playerBullet.y, 1, 1);
    }
    for (const alienBulletId in game.state.alienBullets) {
        const alienBullet = game.state.alienBullets[alienBulletId];
        context.fillStyle = "#ebdf64";
        context.fillRect(alienBullet.x, alienBullet.y, 1, 1);
    }

    requestAnimationFrame(() => {
        render_screen(screen, game, requestAnimationFrame);
    });
}
