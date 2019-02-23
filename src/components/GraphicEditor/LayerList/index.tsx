import * as React from 'react';
import { Draggable, Droppable, DragDropContext, DropResult} from 'react-beautiful-dnd';

import { IBlock } from '../types';
import './index.css';

interface IProps {
    blocks: IBlock[],
    selectedBlockId?: number,
    onSelect: (id: number) => void,
    onAdd: () => void,
    onReorder: (blocks: IBlock[]) => void
}

export default class LayerList extends React.Component<IProps> {
    onDragEnd = (result: DropResult) => {
        let blocks = [ ...this.props.blocks ];
        const { source, destination } = result,
            block = blocks[source.index];

        if(!destination) {
            return
        }

        blocks.splice(source.index, 1);
        blocks = [
            ...blocks.slice(0, destination.index),
            block,
            ...blocks.slice(destination.index)
        ]

        this.props.onReorder(blocks);
    }

    render() {
        const { blocks, onSelect, selectedBlockId, onAdd } = this.props;

        return (
            <DragDropContext onDragEnd={ this.onDragEnd }>
                <Droppable droppableId="droppable">
                    { (provided, snapshot) => (
                        <div
                            ref={ provided.innerRef }
                            className="layer-list"
                        >
                        {
                            blocks.map((block, index) => (
                                <Draggable key={ block.id } draggableId={ `${block.id}` } index={ index }>
                                    { (provided, snapshot) => (
                                        <div
                                            ref={ provided.innerRef }
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            className={ `layer${selectedBlockId === block.id ? " selected" : ""}` }
                                            onClick={ () => { onSelect(block.id) } }
                                            style={ { ...provided.draggableProps.style } }
                                        >
                                            <div className="name">{ block.name }</div>
                                            <div className="color" style={ { backgroundColor: block.color } } />
                                        </div>
                                    ) }
                                </Draggable>
                            ))
                        }
                        {   provided.placeholder    }
                            <button className="add layer" onClick={ onAdd }>Добавить слой</button>
                        </div>
                    ) }
                </Droppable>
            </DragDropContext>
        )
    }
}