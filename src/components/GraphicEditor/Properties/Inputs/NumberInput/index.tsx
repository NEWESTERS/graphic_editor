import * as React from 'react';

import './index.css';

interface IProps {
    value: number;
    onChange: (value: any) => void;
}

export class NumberInput extends React.Component<IProps> {
    handleInputChange = (e: React.FormEvent<HTMLInputElement>) => {
        if(e.currentTarget.value === "") {
            this.props.onChange(0);
        } else {
            const value = parseFloat(e.currentTarget.value)

            if(!isNaN(value)) {
                this.props.onChange(value);
            }
        }
    }

    handleButtonClick = (isIncrement: boolean) => {
        const { value, onChange } = this.props;

        if(isIncrement) {
            onChange(value + 1);
        } else {
            onChange(value - 1);
        }
    }

    render() {
        const { value } = this.props;

        return(
            <div className="number-input">
                <button
                    className="decrement"
                    onClick={ () => this.handleButtonClick(false) }
                />

                <input
                    className="property-input"
                    value={ value }
                    onChange={ this.handleInputChange }
                />

                <button
                    className="increment"
                    onClick={ () => this.handleButtonClick(true) }
                />
            </div>
        )
    }
}