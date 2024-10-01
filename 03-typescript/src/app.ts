import { findHeroById } from "./services/hero.service";

console.log(findHeroById(1)?.name ?? "Hero no found");