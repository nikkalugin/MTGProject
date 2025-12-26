import axios from 'axios';
import { expect } from "chai";

describe('Scryfall Cards API tests', () => {
    const BASE_URL = 'https://api.scryfall.com';

    it('Verify finding card with necessary search', async () => {
        const response = await axios.get(`${BASE_URL}/cards/named`, {
            params: {
                fuzzy: 'aust com'
            }
        });

        expect(response.status).to.equal(200);
        expect(response.headers['content-type']).to.include('application/json');
        expect(response.data.object).to.equal('card');
    });

    it('Verify handling of different fuzzy search variations', async () => {
        const testCases = [
            'aust com',
            'austere command',
            'Austere  Com'
        ];

        for (const query of testCases) {
            const response = await axios.get(`${BASE_URL}/cards/named`, {
                params: { 
                    fuzzy: query 
                }
            });

            expect(response.status).to.equal(200);
            expect(response.data.name).to.include('Austere Command');
        }
    });

    it('Verify handling of different error response formats', async () => {
        try {
            await axios.get(`${BASE_URL}/cards/named`, {
                params: { 
                    fuzzy: 'nonexistent random card name' 
                }
            });
        } catch (error) {
            expect(error.response.status).to.be.oneOf([404, 400]);
        }
    });

    it('Verify supporting of different response formats', async () => {
        const formats = ['json', 'text', 'image'];

        for (const format of formats) {
            const response = await axios.get(`${BASE_URL}/cards/named`, {
                params: { 
                    fuzzy: 'aust com',
                    format: format 
                }
            });

            expect(response.status).to.equal(200);
        }
    });

    it('Verify returning correct card structure', async () => {
        const response = await axios.get(`${BASE_URL}/cards/named`, {
            params: { 
                fuzzy: 'aust com',
                pretty: true 
            }
        });

        expect(response.status).to.equal(200);
        expect(response.data).to.have.property('name');
        expect(response.data).to.have.property('type_line');
        expect(response.data).to.have.property('mana_cost');
        expect(response.data.name).to.include('Austere Command');
    });

    it('Verify handling unique parameter correctly', async () => {
        const uniqueModes = ['cards', 'art', 'prints'];

        for (const uniqueMode of uniqueModes) {
            const response = await axios.get(`${BASE_URL}/cards/search`, {
                params: {
                    q: 'Pacifism',
                    unique: uniqueMode
                }
            });

            expect(response.status).to.equal(200);
            
            const names = response.data.data.map(card => card.name);
            const uniqueNames = [...new Set(names)];
            
            if (uniqueMode === 'cards') {
                expect(names.length).to.equal(uniqueNames.length);
            }
        }
    });

    it('Verify supporting different sorting operations', async () => {
        const sortOptions = [
            { order: 'name', dir: 'asc' },
            { order: 'released', dir: 'desc' },
            { order: 'cmc', dir: 'asc' },
            { order: 'power', dir: 'desc' }
        ];

        for (const option of sortOptions) {
            const response = await axios.get(`${BASE_URL}/cards/search`, {
                params: {
                    q: "type:creature",
                    order: option.order,
                    dir: option.dir
                }
            });

            expect(response.status).to.eq(200);
            expect(response.data.data.length).to.be.greaterThan(0);
        }
    });

    it('Verify handling additional search parameters', async () => {
        const response = await axios.get(`${BASE_URL}/cards/search`, {
            params: {
                q: 'set:mid',
                include_extras: true,
                include_multilingual: true,
                page: 1,
                format: 'json',
                pretty: true
            }
        });

        expect(response.status).to.equal(200);
        expect(response.data.object).to.equal('list');
        expect(response.data.total_cards).to.be.a('number');
    });

    it('Verify handling long search queries', async () => {
        const longQuery = 'a'.repeat(1000);
        
        try {
            await axios.get(`${BASE_URL}/cards/search`, {
                params: {  
                    q: longQuery 
                }
            });
        } catch (error) {
            expect(error.response.status).to.be.oneOf([400, 404, 414]);
        }
    });

    it('Verify handling empty search results', async () => {
        try {
            const response = await axios.get(`${BASE_URL}/cards/search`, {
                params: { 
                    q: 'nonexistentcardname123456' 
                }
            });
            expect(response.status).to.equal(200);
            expect(response.data.data.length).to.equal(0);
        } catch (error) {
            expect(error.response.status).to.equal(404);
            expect(error.response.data.data).to.be.undefined;
        }
    });

    it('Verify supporting different output formats', async () => {
        const formats = ['json', 'csv'];
        for (const format of formats) {
            try {
                const response = await axios.get(`${BASE_URL}/cards/search`, {
                    params: {
                        q: 'type:land',
                        format: format
                    }
                });

                expect(response.status).to.equal(200);
                
                if (format === 'json') {
                    expect(response.data.object).to.equal('list');
                } else if (format === 'csv') {
                    expect(response.headers['content-type']).to.include('text/csv');
                }
            } catch (error) {
                throw new Error(`Format ${format} failed: ${error.message}`);
            }
        }
    });

    it('Verify returning autocomplete suggestions for valid input', async () => {
        const response = await axios.get(`${BASE_URL}/cards/autocomplete`, {
            params: { 
                q: 'thal'
            }
        });

        expect(response.status).to.equal(200);
        expect(response.data.object).to.equal('catalog');
        expect(response.data.total_values).to.be.a('number');
        expect(response.data.data).to.be.an('array');
        expect(response.data.data.length).to.be.greaterThan(0);
        
        response.data.data.forEach(suggestion => {
            expect(suggestion.toLowerCase()).to.include('thal');
        });
    });

    it('Verify returning empty result for short input', async () => {
        const response = await axios.get(`${BASE_URL}/cards/autocomplete`, {
            params: {
                q: 'a'
            }
        });

        expect(response.status).to.equal(200);
        expect(response.data.object).to.equal('catalog');
        expect(response.data.total_values).to.equal(0);
    });

    it('Verify supporting pretty formatting', async () => {
        const response = await axios.get(`${BASE_URL}/cards/autocomplete`, {
            params: { 
                q: 'thal',
                pretty: true 
            }
        });

        expect(response.status).to.equal(200);
        expect(response.data.object).to.equal('catalog');
    });

    it('Verify ignoring spaces and punctuation', async () => {
        const responses = [
            await axios.get(`${BASE_URL}/cards/autocomplete`, { 
                params: { 
                    q: 'thal' 
                } 
            }),
            await axios.get(`${BASE_URL}/cards/autocomplete`, { 
                params: { 
                    q: 'thal ' 
                } 
            }),
            await axios.get(`${BASE_URL}/cards/autocomplete`, { 
                params: { 
                    q: ' thal' 
                } 
            })
        ];

        responses.reduce((prev, curr) => {
            expect(prev.data.data).to.deep.equal(curr.data.data);
            return curr;
        });
    });
});