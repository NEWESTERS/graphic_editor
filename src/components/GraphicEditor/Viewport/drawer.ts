import { IBlock } from '../types';

export const drawBlock = (ctx: CanvasRenderingContext2D, block: IBlock, isSelected: boolean = false, isDragging: boolean = false) => {
    ctx.beginPath();
    ctx.rect(
        block.x - block.width / 2,
        block.y - block.height / 2,
        block.width,
        block.height
    );
    ctx.fillStyle = block.color;

    if(isDragging) {
        ctx.globalAlpha = .5;
    };

    ctx.fill();
    ctx.closePath();
}

export const drawSelection = (ctx: CanvasRenderingContext2D, block: IBlock) => {
    ctx.beginPath();
    ctx.rect(
        block.x - block.width / 2,
        block.y - block.height / 2,
        block.width,
        block.height
    );
    ctx.setLineDash([10, 10]);
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.closePath();
}

