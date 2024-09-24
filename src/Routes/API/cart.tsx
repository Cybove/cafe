import { Elysia } from 'elysia';
import * as elements from 'typed-html';
import { Minus } from 'lucide-static';

const animals = [
    '🐶',
    '🐱',
    '🐰',
    '🐻',
    '🐼',
    '🦊',
    '🐨',
    '🐯',
    '🦁',
    '🐮',
    '🐷',
    '🐸',
    '🐵',
    '🐔',
    '🐧',
    '🦉',
    '🦄',
    '🦒',
    '🐘',
    '🦘'
];

const tokens = new Map<string, number>();

function getUniqueAnimal(): string | null {
    const availableAnimals = animals.filter(animal => !tokens.has(animal) || tokens.get(animal)! <= Date.now());

    if (availableAnimals.length === 0) {
        return null;
    }

    const randomIndex = Math.floor(Math.random() * availableAnimals.length);
    const selectedAnimal = availableAnimals[randomIndex];
    // Set the expiration time for the token to 1 minute from now
    const expirationTime = Date.now() + 60000;
    tokens.set(selectedAnimal, expirationTime);

    return selectedAnimal;
}


export const cart = (app: Elysia) => {
    app.get('/api/cart/content', () => (
        <div class="flex flex-col max-w-2xl mx-auto">
            <div id="cart-items" class="space-y-2 overflow-x-visible"></div>
            <div class="text-xl font-bold mt-1">Total: <span id="cart-total">0</span> TL</div>
        </div>
    ));

    app.get('/api/cart/identity', () => {
        const animalToken = getUniqueAnimal();
        if (animalToken === null) {
            console.log('No available ids.');
            return new Response(null, { status: 204 });
        }
        return (
            <span class="text-2xl">{animalToken}</span>
        );
    });

    return app;
};
