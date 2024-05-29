const request = require('supertest');
const {isValid, getMaxDraws, app} = require('./app');

describe("checking validity of scores",()=>{
    describe("Should be in non decreasing order",()=>{

        test("6 6 5",()=>{
            const res =isValid(6,6,5);
            expect(res).toBe(false);
        });
        test("6 4 4",()=>{
            const res =isValid(6,4,4);
            expect(res).toBe(false);
        });
        test("6 6 6",()=>{
            const res =isValid(6,6,6);
            expect(res).toBe(true);
        });

    });

    describe("Should be between 0 and 30",()=>{

        test("-1 1 0",()=>{
            const res =isValid(-1,1,0);
            expect(res).toBe(false);
        });
        test("-1 -1 0",()=>{
            const res =isValid(-1,-1,0);
            expect(res).toBe(false);
        });
        test("-2 -1 -1",()=>{
            const res =isValid(-2,-1,-1);
            expect(res).toBe(false);
        });

        test("31 31 30",()=>{
            const res =isValid(31,31,30);
            expect(res).toBe(false);
        });
        test("1 31 32",()=>{
            const res =isValid(1,31,32);
            expect(res).toBe(false);
        });
        test("1 30 31",()=>{
            const res =isValid(1,30,31);
            expect(res).toBe(false);
        });

        test("0 1 1",()=>{
            const res =isValid(0,1,1);
            expect(res).toBe(true);
        });

    });

    describe("Should comply with a vlid game",()=>{
        test("1 1 1",()=>{
            const res =isValid(1,1,1);
            expect(res).toBe(false);
        });
        test("1 1 2",()=>{
            const res =isValid(1,1,2);
            expect(res).toBe(true);
        });
        test("1 2 2",()=>{
            const res =isValid(1,2,2);
            expect(res).toBe(false);
        });
        test("2 2 2",()=>{
            const res =isValid(2,2,2);
            expect(res).toBe(true);
        });
    });
});

describe("Calculating max draws possible",()=>{
    test("1 2 5", ()=>{
        const res= getMaxDraws(1,2,5);
        expect(res).toBe(3);
    });

    test("2 3 5", ()=>{
        const res= getMaxDraws(2,3,5);
        expect(res).toBe(5);
    });
    test("6 6 6", ()=>{
        const res= getMaxDraws(6,6,6);
        expect(res).toBe(9);
    });
});

describe("checking API output",()=>{
    test('wrong input - decreasing score',async ()=>{
        const res = await request(app).get('/maxDraws/3/2/5');
        expect(res.body.max_draws).toBeDefined();
        expect(res.body.max_draws).toBe(-1);
    });

    test('wrong input - score out of range',async ()=>{
        const res =await request(app).get('/maxDraws/2/3/31');
        expect(res.body.max_draws).toBeDefined();
        expect(res.body.max_draws).toBe(-1);
    });
    test('wrong input - score out of range',async ()=>{
        const res =await request(app).get('/maxDraws/-1/3/3');
        expect(res.body.max_draws).toBeDefined();
        expect(res.body.max_draws).toBe(-1);
    });

    test('wrong input - invalid game',async ()=>{
        const res =await request(app).get('/maxDraws/3/3/5');
        expect(res.body.max_draws).toBeDefined();
        expect(res.body.max_draws).toBe(-1);
    });
    test('wrong input - invalid game',async ()=>{
        const res =await request(app).get('/maxDraws/3/6/6');
        expect(res.body.max_draws).toBeDefined();
        expect(res.body.max_draws).toBe(-1);
    });

    test('Calculating max draws',async ()=>{
        const res =await request(app).get('/maxDraws/2/3/7');
        expect(res.body.max_draws).toBeDefined();
        expect(res.body.max_draws).toBe(5);
    });
    test('Calculating max draws',async ()=>{
        const res =await request(app).get('/maxDraws/2/3/5');
        expect(res.body.max_draws).toBeDefined();
        expect(res.body.max_draws).toBe(5);
    });
    test('Calculating max draws',async ()=>{
        const res =await request(app).get('/maxDraws/6/6/6');
        expect(res.body.max_draws).toBeDefined();
        expect(res.body.max_draws).toBe(9);
    });

});