import { injectable } from 'inversify';
import MazeGameChapter, {
    MazeGameChapterDocument,
} from '../models/maze_game_chapter.model';

@injectable()
export class MazeChapterService {
    async createNewChapter(
        level: number,
        helpCount: number,
        roundLevels: number[],
    ): Promise<MazeGameChapterDocument> {
        // const roundLevels: number[] = [1, 2, 3, 4, 5];
        // const helpCount = 3;

        const newChapter = new MazeGameChapter({
            chapterLevel: level,
            helpCount: helpCount,
            roundLevels: roundLevels,
        });

        await newChapter.save();

        return newChapter;
    }
}
