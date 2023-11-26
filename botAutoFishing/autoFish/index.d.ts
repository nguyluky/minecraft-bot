
declare const autofishPlugin: (bot: Bot) => void;

interface autofish {
    star: () => null,
    stop: () => null,
}

declare module "mineflayer" {
    interface Bot {
        autofish: autofish
    }
}

export = autofishPlugin