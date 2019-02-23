import * as React from 'react';

import { IBlock } from '../types';
import { drawBlock, drawSelection } from './drawer';
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
    private dragContext: CanvasRenderingContext2D;

    contextsInit = (ref: HTMLCanvasElement) => {
        !this.mainContext && (this.mainContext = ref.getContext("2d")!);
        !this.dragContext && (this.dragContext = ref.getContext("2d")!);
    }

    public state = {
        isDragging: false
    } as IState;

    componentDidMount() {
        this.redraw()
    }

    componentDidUpdate() {
        const { isDragging } = this.state;

        if(isDragging) {
            this.drawDragging();
        } else {
            this.redraw();
        }
    }

    redraw = () => {
        const { blocks, width, height, selectedBlockId } = this.props;

        this.mainContext.clearRect(0, 0, width, height);
        blocks.map((block: IBlock, index: number) => {
            drawBlock(
                this.mainContext,
                block,
                block.id === selectedBlockId
            );
        });

        selectedBlockId !== undefined && drawSelection(
            this.mainContext,
            blocks.find(block => block.id === selectedBlockId)!,
        )
    }

    drawDragging = () => {
        const { blocks, width, height, selectedBlockId } = this.props;

        this.dragContext.clearRect(0, 0, width, height)
        drawBlock(
            this.dragContext,
            blocks.find(block => block.id === selectedBlockId)!,
            true,
            true
        );
    }

    handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
        if(this.props.selectedBlockId !== undefined) {
            this.setState({
                isDragging: true
            })
        }
    }

    handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
        const { blocks, selectedBlockId } = this.props;

        if(this.state.isDragging) {
            const movedBlock = { ...blocks.find(block => block.id === selectedBlockId)! }

            movedBlock.x = e.nativeEvent.layerX;
            movedBlock.y = e.nativeEvent.layerY;

            this.props.onMove(movedBlock);
        }
    }

    handleMouseUp = (e: React.MouseEvent<HTMLCanvasElement>) => {
        if(this.state.isDragging) {
            const { width, height } = this.props;
            this.dragContext.clearRect(0, 0, width, height);

            this.setState({
                isDragging: false
            })
        }
    }

    render() {
        const { width, height } = this.props;

        return(
            <div
                className={ `viewport${ this.props.selectedBlockId !== undefined ? " layer-selected" : "" }` }
                style={ { width: `${width}px`, height: `${height}px` } }
            >
                <canvas
                    className="main"
                    style={ { width: `${width}px`, height: `${height}px` } }
                    ref={ (ref: HTMLCanvasElement) => !this.mainContext && (this.mainContext = ref.getContext("2d")!) }
                    width={ width }
                    height={ height }
                    onMouseDown={ this.handleMouseDown }
                    onMouseMove={ this.handleMouseMove }
                    onMouseUp={ this.handleMouseUp }
                />

                <canvas
                    className="drag"
                    style={ { width: `${width}px`, height: `${height}px` } }
                    ref={ (ref: HTMLCanvasElement) => !this.dragContext && (this.dragContext = ref.getContext("2d")!) }
                    width={ width }
                    height={ height }
                    onMouseDown={ this.handleMouseDown }
                    onMouseMove={ this.handleMouseMove }
                    onMouseUp={ this.handleMouseUp }
                />
            </div>
        )
    }
}