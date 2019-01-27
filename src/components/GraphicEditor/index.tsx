import * as React from 'react';

import { IBlock } from './types';
import Viewport from './Viewport';
import LayerList from './LayerList';
import Properties from './Properties';
import './index.css';

const VIEWPORT_WIDTH = 800,
    VIEWPORT_HEIGHT = 600,
    COLORS = [ "#77FF77", "#FF7777", "#7777FF", "#FFFF77", "#77FFFF", "#FF77FF" ],
    getRandomColor = () => COLORS[ Math.round(Math.random() * (COLORS.length - 1)) ]

interface IState {
    blocks: IBlock[];
    selectedBlockId?: number;
}

export default class GraphicEditor extends React.Component<{}, IState> {
    public state = {
        blocks: [
            {
                x: 100,
                y: 200,
                width: 50,
                height: 100,
                color: "#77FF77"
            },
            {
                x: 300,
                y: 250,
                width: 250,
                height: 75,
                color: "#FF7777"
            },
            {
                x: 550,
                y: 400,
                width: 150,
                height: 150,
                color: "#7777FF"
            }
        ]
    } as IState;

    handleBlockChange = (block: IBlock) => {
        const blocks = [ ...this.state.blocks ],
            { selectedBlockId } = this.state;

        blocks[selectedBlockId!] = block;

        this.setState({
            blocks: blocks
        })
    }

    handleBlockSelect = (index: number) => {
        this.setState({
            selectedBlockId: index
        })
    }

    handleAddLayerClick = () => {
        const { blocks } = this.state,
            block: IBlock = {
                x: VIEWPORT_WIDTH / 2,
                y: VIEWPORT_HEIGHT / 2,
                width: 100,
                height: 100,
                color: getRandomColor()
            }

        this.setState({
            blocks: [ ...blocks, block ],
            selectedBlockId: blocks.length
        })

        console.log("ADD")
    }

    handleDeleteLayerClick = () => {
        const blocks = [ ...this.state.blocks ];

        blocks.splice(this.state.selectedBlockId!, 1);

        this.setState({
            blocks: blocks,
            selectedBlockId: undefined
        })
    }

    handleKeyPress = (e: React.KeyboardEvent) => {
        const { selectedBlockId } = this.state;

        console.log("KEY");

        if(selectedBlockId === undefined) return;

        const blocks = [ ...this.state.blocks ],
            block = { ...blocks[selectedBlockId] };

        switch(e.key) {
            case "ArrowLeft":
                block.x--;
                break;

            case "ArrowRight":
                block.x++;
                break;

            case "ArrowUp":
                block.y--;
                break;

            case "ArrowDown":
                block.y++;
                break;

            default:
                return;
        };

        e.preventDefault();

        blocks[selectedBlockId] = block;

        this.setState({
            blocks: blocks
        })
    }

    render() {
        const { blocks, selectedBlockId } = this.state;

        return(
            <div className="graphic-editor"
                onKeyDown={ this.handleKeyPress }
                tabIndex={ 0 }
                style={ { minHeight: VIEWPORT_HEIGHT } }
            >
                <Viewport
                    width={ VIEWPORT_WIDTH }
                    height={ VIEWPORT_HEIGHT }
                    selectedBlockId={ selectedBlockId }
                    blocks={ blocks }
                    onMove={ this.handleBlockChange }
                />

                <div className="controls">
                    <LayerList
                        selectedBlockId={ selectedBlockId }
                        blocks={ blocks }
                        onSelect={ this.handleBlockSelect }
                        onAdd={ this.handleAddLayerClick }
                    />

                    <Properties
                        block={ selectedBlockId !== undefined ? blocks[selectedBlockId] : undefined }
                        onChange={ this.handleBlockChange }
                        onDelete={ this.handleDeleteLayerClick }
                    />
                </div>
            </div>
        )
    }
}