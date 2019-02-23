import * as React from 'react';

import { IBlock, IProperty } from '../types';
import { NumberInput, ColorInput } from './Inputs';
import './index.css';

const AVAILABLE_PROPETIES: IProperty[] = [
    {
        title: "Ширина",
        name: "width",
        type: "number"
    },
    {
        title: "Высота",
        name: "height",
        type: "number"
    },
    {
        title: "Абсциса",
        name: "x",
        type: "number"
    },
    {
        title: "Ордината",
        name: "y",
        type: "number"
    },
    {
        title: "Цвет",
        name: "color",
        type: "color"
    }
]

interface IProps {
    block?: IBlock;
    onChange: (block: IBlock) => void;
    onDelete: () => void;
}

export default class Properties extends React.Component<IProps> {
    handleBlockChange = (property: string, value: any) => {
        const { block } = this.props;

        if(block === undefined) {
            return;
        }
       
        const editedBlock = { ...block };

        editedBlock[property] = value;

        this.props.onChange(editedBlock);
    }

    renderInput = (block: IBlock, prop: IProperty) => {
        switch(prop.type) {
            case "number":
                return(
                    <NumberInput
                        value={ block[prop.name] }
                        onChange={ (value) => this.handleBlockChange(prop.name, value) }
                    />
                );

            case "color":
                return(
                    <ColorInput
                        value={ block[prop.name] }
                        onChange={ (value) => this.handleBlockChange(prop.name, value) }
                    />
                )

            default:
                return;
        }
    }

    render() {
        const { block, onDelete } = this.props;

        return(
            <div className="properties-list">
            {               
                block &&
                <React.Fragment>
                {
                    AVAILABLE_PROPETIES.map((prop) => (
                        <div className="property" key={ prop.name }>
                            <label>{ prop.title }</label>
                            { this.renderInput(block, prop) }
                        </div>
                    ))
                }
                    <button className="delete" onClick={ onDelete }>Удалить слой</button>
                </React.Fragment> ||
                <h4>Выберите слой</h4>
            }
            </div>
        )
    }
}