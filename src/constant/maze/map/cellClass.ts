import { Cell, CellType, Character } from '../../../models/maze_game.model';

export abstract class MapCell {
    static handle(character: Character, cellInfo: Cell): boolean {
        switch (cellInfo.property) {
            case CellType.Path:
                return true;

            case CellType.Wall:
                return false;

            case CellType.Lava:
                character.hp = 0;
                return true;

            case CellType.HpPortion:
                character.hp += cellInfo.hp;
                cellInfo.property = CellType.Path;
                return true;

            case CellType.StaminaPortion:
                character.stamina += cellInfo.stamina;
                cellInfo.property = CellType.Path;
                return true;

            case CellType.End:
                return true;

            case CellType.Armor:
                character.armor += cellInfo.armor;
                cellInfo.property = CellType.Path;
                return true;

            case CellType.Baron:
                character.hp -= cellInfo.attack;
                if (character.hp > 0) {
                    cellInfo.property = CellType.Path;
                    character.stamina += cellInfo.stamina;
                }
                return true;

            case CellType.Dragon:
                if (character.armor >= cellInfo.attack) {
                    character.armor -= cellInfo.attack;
                } else {
                    character.hp -= cellInfo.attack - character.armor;
                    character.armor = 0;
                }
                if (character.hp > 0) {
                    cellInfo.property = CellType.Path;
                    character.stamina += cellInfo.stamina;
                }
                return true;

            case CellType.Trap:
                if (character.armor >= 100) {
                    character.armor -= 100;
                } else {
                    character.hp -= 100 - character.armor;
                    character.armor = 0;
                }
                if (character.hp > 0) cellInfo.property = CellType.Path;
                return true;

            case CellType.Key:
                character.key += 1;
                return true;

            case CellType.LockGate:
                if (character.key > 0) {
                    character.key--;
                    cellInfo.property = CellType.Path;
                    return true;
                }
                return false;

            case CellType.Portal:
                character.position = cellInfo.to;
                return false;

            default:
                return false;
        }
    }
}
