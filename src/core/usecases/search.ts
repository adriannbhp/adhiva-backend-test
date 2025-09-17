import axios from 'axios';
import {env} from "../../config/env";

export type SearchRow = {
    NIM: string;
    YMD: string;
    NAMA: string;
};

async function fetchAndParseData(): Promise<SearchRow[]> {
    const url = env.EXTERNAL_API_URL;
    if (!url) {
        throw new Error('EXTERNAL_API_URL is not defined in environment variables');
    }

    const response = await axios.get(url);
    const rawData = response.data.DATA;

    const [headerLine, ...rows] = rawData.split('\n');
    const headers = headerLine.split('|');

    return rows.map((line: string) => {
        const values = line.split('|');
        return {
            [headers[0]]: values[0],
            [headers[1]]: values[1],
            [headers[2]]: values[2],
        } as SearchRow;
    });
}

export class SearchUsecase {
    async byName(value: string) {
        const data = await fetchAndParseData();
        return data.find(row => row.NAMA.toLowerCase() === value.toLowerCase());
    }

    async byNim(value: string) {
        const data = await fetchAndParseData();
        return data.find(row => row.NIM === value);
    }

    async byYmd(value: string) {
        const data = await fetchAndParseData();
        return data.filter(row => row.YMD === value);
    }
}
