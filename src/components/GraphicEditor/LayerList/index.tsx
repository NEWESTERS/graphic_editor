import * as React from 'react';

import { IBlock } from '../types';
import './index.css';

interface IProps {
    blocks: IBlock[],
    selectedBlockId?: number,
    onSelect: (index: number) => void,
    onAdd: () => void
}

export default class LayerList extends React.Component<IProps> {
    render() {
        const { blocks, onSelect, selectedBlockId, onAdd } = this.props;

        return (
            <div className="layer-list">
            {
                blocks.map((block, index) => (
                    <div
                        className={ `layer${selectedBlockId === index ? " selected" : ""}` }
                        onClick={ () => { onSelect(index) } }
                        key={ index }
                    >
                        <div className="name">Слой { index }</div>
                        <div className="color" style={ { backgroundColor: block.color } } />
                    </div>
                ))
            }
                <button className="add layer" onClick={ onAdd }>Добавить слой</button>
            </div>
        )
    }
}