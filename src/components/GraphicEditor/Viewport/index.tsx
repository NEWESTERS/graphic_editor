import * as React from 'react';

import { IBlock } from '../types';
import './index.css';

interface IProps {
    width: number;
    height: number;
    blocks: IBlock[];
    selectedBlockId?: number;
    onMove: (block: IBlock) => void;
}

interface IState {
    isDragging: boolean;
}

export default class Viewport extends React.Component<IProps, IState> {
    private mainContext: CanvasRenderingContext2D;

    public state = {
        isDragging: false
    } as IState;

    componentDidMount() {
        this.redraw()
    }

    componentDidUpdate() {
        this.redraw();
    }

    redraw = () => {
        const { blocks, width, height } = this.props;

        this.mainContext.clearRect(0, 0, width, height)
        blocks.map((block: IBlock) => {
            this.mainContext.beginPath()
            this.mainContext.rect(
                block.x - block.width / 2,
                block.y - block.height / 2,
                block.width,
                block.height
            );
            this.mainContext.fillStyle = block.color;
            this.mainContext.fill();
            this.mainContext.closePath();
        });
    }

    handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
        if(this.props.selectedBlockId !== undefined) {
            this.setState({
                isDragging: true
            })
        }
    }

    handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
        if(this.state.isDragging) {
            const movedBlock = { ...this.props.blocks[this.props.selectedBlockId!] }

            movedBlock.x += e.movementX;
            movedBlock.y += e.movementY;

            this.props.onMove(movedBlock);
        }
    }

    handleMouseUp = (e: React.MouseEvent<HTMLCanvasElement>) => {
        if(this.state.isDragging) {
            this.setState({
                isDragging: false
            })
        }
    }

    render() {
        const { width, height } = this.props;

        return(
            <canvas
                className={ `viewport${ this.props.selectedBlockId !== undefined ? " layer-selected" : "" }` }
                style={ { width: `${width}px`, height: `${height}px` } }
                ref={ (ref: HTMLCanvasElement) => !this.mainContext && (this.mainContext = ref.getContext("2d")!) }
                width={ width }
                height={ height }
                onMouseDown={ this.handleMouseDown }
                onMouseMove={ this.handleMouseMove }
                onMouseUp={ this.handleMouseUp }
            />
        )
    }
}