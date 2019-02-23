export interface IBlock {
    id: number,
    name: string,
    x: number;
    y: number;
    width: number;
    height: number;
    color: string;
}

export interface IProperty {
    name: string;
    title: string;
    type: string;
}