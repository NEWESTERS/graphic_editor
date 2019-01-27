import * as React from 'react';

import './index.css';

interface IProps {
    value: string;
    onChange: (value: any) => void;
}

interface IState {
    localValue: string;
}

export class ColorInput extends React.Component<IProps, IState> {
    public state = {
        localValue: this.props.value.slice(1)
    } as IState;

    componentDidUpdate(prevProps: IProps) {
        const { value } = this.props;

        if(prevProps.value !== value) {
            this.setState({
                localValue: value.slice(1)
            })
        }
    }

    handleInputChange = (e: React.FormEvent<HTMLInputElement>) => {
        const value = e.currentTarget.value;

        this.setState({
            localValue: value
        })

        !e.currentTarget.validity.patternMismatch &&
            this.props.onChange(`#${value}`)
    }

    render() {
        const { localValue } = this.state;

        return(
            <div className="color-input">
                <input
                    className="property-input"
                    value={ localValue }
                    onChange={ this.handleInputChange }
                    pattern="[0-9A-F]{6}"
                />
            </div>
        )
    }
}