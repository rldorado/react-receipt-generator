interface Concept {
    name: string;
    amount: number;
}


interface Receipt {
    id: number;
    num: string;
    loc: string;
    amount: number;
    date: Date;
    expiration: Date;
    home: string;
    concepts: Concept[];
    payer: string;
    collector: string;
    notes: string;
}

export default Receipt