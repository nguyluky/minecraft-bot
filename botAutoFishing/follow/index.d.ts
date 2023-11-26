import { Entity } from "minecraft-data";
import { Bot } from "mineflayer";

declare const followPlugin: (bot: Bot) => void;

interface follow {
    followPlayer: (player: Entity , range: number) => void,
    cancel: () => void
}

declare module "mineflayer" {
    interface Bot {
      follow: follow
    }
  }

export = followPlugin;