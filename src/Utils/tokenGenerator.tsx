
const animals = [
    "🐶", "🐱", "🐰", "🐻", "🐼", "🦊", "🐨", "🐯", "🦁", "🐮",
    "🐷", "🐸", "🐵", "🐔", "🐧", "🦉", "🦄", "🦒", "🐘", "🦘",
    "🦖", "🦕", "🐙", "🐬", "🐟", "🐳", "🐋", "🐊", "🐆", "🐅",
    "🐃", "🐂", "🐄", "🐎", "🐫", "🐑", "🐐", "🐏", "🐀", "🐁",
    "🐓", "🐍", "🐊", "🐢", "🐛", "🦋", "🐌", "🐞", "🐜", "🐝",
];

const tokens = new Map<string, number>();

export default function generateToken(): string {
    const availableAnimals = animals.filter((animal) =>
        !tokens.has(animal) || tokens.get(animal)! <= Date.now()
    );

    if (availableAnimals.length === 0) {
        let randomNumber;
        do {
            randomNumber = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
        } while (tokens.has(randomNumber));

        const expirationTime = Date.now() + 1000 * 60 * 60 * 12;
        tokens.set(randomNumber, expirationTime);
        return `#${randomNumber}`;
    }

    const randomIndex = Math.floor(Math.random() * availableAnimals.length);
    const selectedAnimal = availableAnimals[randomIndex];
    const expirationTime = Date.now() + 1000 * 60 * 60 * 12;
    tokens.set(selectedAnimal, expirationTime);

    return selectedAnimal;
}