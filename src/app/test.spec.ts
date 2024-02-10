import {Calculator} from './testService';

describe('testService', ()=>{

    it('Should add 2 numbers',()=>{
        const service=new Calculator();
        expect(service.add(2,2)).toBe(4);
    });
    it('Should subtract 2 numbers',()=>{
        const service=new Calculator();
        expect(service.subtract(2,2)).toBe(0);
    });
    it('Should multiply 2 numbers',()=>{
        const service=new Calculator();
        expect(service.multiply(2,2)).toBe(4);
    });

});