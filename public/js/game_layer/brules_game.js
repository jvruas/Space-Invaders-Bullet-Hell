export default function create_game(command) {
    // TODO: Implementar os Objetos: playerBullet, alienBullet e meteorites;
    const state = {
        screen: {
            width: 34,
            height: 17,
        },
        players: {},
        playerBullets: {},
        aliens: {},
        alienBullets: {},
    };

    console.log(screen);

    function add_player(command) {
        const playerId = command.playerId;
        const playerX = command.playerX;
        const playerY = command.playerY;

        state.players[playerId] = {
            x: playerX,
            y: playerY,
        };
    }

    function remove_player(command) {
        const playerId = command.playerId;

        // "delete" serve para deletar uma propriedade e suas referencias dentro de um objeto
        delete state.players[playerId];
    }

    function add_alien(command) {
        const alienId = command.alienId;
        const alienX = command.alienX;
        const alienY = command.alienY;

        state.aliens[alienId] = {
            x: alienX,
            y: alienY,
        };
    }

    function remove_alien(command) {
        const alienId = command.alienId;

        delete state.aliens[alienId];
    }

    function add_player_bullet(command) {
        const playerBulletId = command.playerBulletId;
        const playerBulletX = command.playerBulletX;
        const playerBulletY = command.playerBulletY;

        state.playerBullets[playerBulletId] = {
            x: playerBulletX,
            y: playerBulletY,
        };
    }

    function remove_player_bullet(command) {
        const playerBulletId = command.playerBulletId;

        delete state.playerBullets[playerBulletId];
    }

    function add_alien_bullet(command) {
        const alienBulletId = command.alienBulletId;
        const alienBulletX = command.alienBulletX;
        const alienBulletY = command.alienBulletY;

        state.alienBullets[alienBulletId] = {
            x: alienBulletX,
            y: alienBulletY,
        };
    }

    function remove_alien_bullet(command) {
        const alienBulletId = command.alienBulletId;

        delete state.alienBullets[alienBulletId];
    }

    function player_bullet_state() {
        for (const playerBulletId in state.playerBullets) {
            const playerBullet = state.playerBullets[playerBulletId];

            if (playerBullet) {
                for (const alienId in state.aliens) {
                    const alien = state.aliens[alienId];

                    if (alien) {
                        if (playerBullet.y <= 0) {
                            remove_player_bullet({
                                playerBulletId: playerBulletId,
                            });
                        } else if (
                            playerBullet.x === alien.x &&
                            playerBullet.y === alien.y
                        ) {
                            console.log("> Bala Acertou o Alien");

                            remove_alien({ alienId: alienId });
                            remove_player_bullet({
                                playerBulletId: playerBulletId,
                            });
                        }
                    }
                }
                --playerBullet.y;
            }
        }
    }

    function alien_bullet_state(playerId) {
        const player = state.players[playerId];

        if (player) {
            for (const alienBulletId in state.alienBullets) {
                const alienBullet = state.alienBullets[alienBulletId];

                if (alienBullet) {
                    console.log("Conferindo Colisão");

                    if (alienBullet.y >= state.screen.height) {
                        remove_alien_bullet({
                            alienBulletId: alienBulletId,
                        });
                    }
                    if (
                        player.x === alienBullet.x &&
                        player.y === alienBullet.y
                    ) {
                        game_over(playerId);
                        // remove_player({ playerId: playerId });
                        // remove_alien_bullet({
                        //     alienBulletId: alienBulletId,
                        // });
                    }
                }
                ++alienBullet.y;
            }
        }
    }

    function alien_attack_condition(playerId) {
        const player = state.players[playerId];

        if (player) {
            console.log("> Confirm Collision");

            for (const alienId in state.aliens) {
                const alien = state.aliens[alienId];

                if (alien) {
                    if (
                        player.x === alien.x - 3 ||
                        player.x === alien.x + 3 ||
                        player.x === alien.x
                    ) {
                        console.log("Entrou no If");

                        const generatedAlienBulletId = (
                            Math.random() * 2
                        ).toFixed(3);
                        add_alien_bullet({
                            alienBulletId: generatedAlienBulletId,
                            alienBulletX: alien.x,
                            alienBulletY: 1 + alien.y,
                        });
                    }
                }
            }
        }
    }

    function game_over(playerId) {
        delete state.players[playerId];
        delete state.aliens;
        delete state.playerBullets;
        delete state.alienBullets;
    }

    function move_alien() {
        for (const alienId in state.aliens) {
            const alien = state.aliens[alienId];
            if (++alien.x < state.screen.width) {
                ++alien.x;
            } else {
                alien.x = 1;
                ++alien.y;
            }
            if (alien.y === 14) {
                game_over();
            }
        }
    }

    function player_accepted_moves(command) {
        const playerId = command.playerId;
        const keyPressed = command.keyPressed;
        const player = state.players[playerId];

        const acceptedMoves = {
            ArrowLeft: function (player) {
                console.log("Player to Left");

                if (player.x - 1 >= 0) {
                    --player.x;
                    return;
                }
            },
            ArrowRight: (player) => {
                console.log("Player to Right");

                if (player.x + 1 < state.screen.width) {
                    ++player.x;
                    return;
                }
            },
            z(player) {
                console.log("Player Atack");

                const generatedBulletId = (Math.random() * 2).toFixed(3);
                let playerY = player.y;
                const spawnPlayerBullet = --playerY;

                add_player_bullet({
                    playerBulletId: generatedBulletId,
                    playerBulletX: player.x,
                    playerBulletY: spawnPlayerBullet,
                });
                // player_bullet_state();
            },
        };
        const moveFunction = acceptedMoves[keyPressed];

        if (player && moveFunction) {
            moveFunction(player);
        }
    }

    setInterval(() => {
        alien_bullet_state("player1");
        player_bullet_state();
    }, 100);
    setInterval(() => {
        alien_attack_condition("player1");
    }, 200);
    setInterval(() => {
        move_alien();
    }, 2000);

    return {
        state,
        add_player,
        add_alien,
        add_player_bullet,
        add_alien_bullet,
        remove_player,
        remove_alien,
        remove_player_bullet,
        remove_alien_bullet,
        player_accepted_moves,
    };
}
