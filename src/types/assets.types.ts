export enum AssetTypes {
    STOCK = "stock",
    CRYPTO = "crypto"
}

export interface IAssets {
    name: string;
    symbol: string;
    types: AssetTypes;
    price: number;
    change: number;
    createdAt: Date;
}
