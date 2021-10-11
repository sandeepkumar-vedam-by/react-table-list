export interface ISalesSuggestion {
    id?: string | number;
    title: string;
    text: string[];
}

export interface ISalesResponse {
    status: number;
    uiConfig: string;
    suggestions: Array<ISalesSuggestion>
}