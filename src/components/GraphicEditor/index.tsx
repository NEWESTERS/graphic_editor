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
                id: (new Date()).getMilliseconds(),
                name: "Слой 1",
                x: 100,
                y: 200,
                width: 50,
                height: 100,
                color: "#77FF77"
            },
            {   
                id: (new Date()).getMilliseconds() + 1,
                name: "Слой 2",
                x: 300,
                y: 250,
                width: 250,
                height: 75,
                color: "#FF7777"
            },
            {   
                id: (new Date()).getMilliseconds() + 2,
                name: "Слой 3",
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

        blocks[blocks.findIndex(block => block.id === selectedBlockId)!] = block;

        this.setState({
            blocks: blocks
        })
    }

    handleBlockSelect = (id: number) => {
        this.setState((prevState: IState) => ({
            selectedBlockId: prevState.selectedBlockId !== id ? id : undefined
        }))
    }

    handleAddLayerClick = () => {
        const { blocks } = this.state,
            block: IBlock = {
                id: (new Date()).getMilliseconds(),
                name: `Слой ${ blocks.length + 1 }`,
                x: VIEWPORT_WIDTH / 2,
                y: VIEWPORT_HEIGHT / 2,
                width: 100,
                height: 100,
                color: getRandomColor()
            }

        this.setState({
            blocks: [ ...blocks, block ],
            selectedBlockId: block.id
        })
    }

    handleDeleteLayerClick = () => {
        const blocks = [ ...this.state.blocks ],
            selectectedBlockIndex = blocks.findIndex(block => block.id === this.state.selectedBlockId);

        blocks.splice(selectectedBlockIndex, 1);

        this.setState({
            blocks: blocks,
            selectedBlockId: undefined
        })
    }

    handleKeyPress = (e: React.KeyboardEvent) => {
        const { selectedBlockId } = this.state;

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
                        onReorder={ (blocks) => this.setState({ blocks: blocks }) }
                    />

                    <Properties
                        block={ blocks.find(block => block.id === selectedBlockId) }
                        onChange={ this.handleBlockChange }
                        onDelete={ this.handleDeleteLayerClick }
                    />
                </div>
            </div>
        )
    }
}