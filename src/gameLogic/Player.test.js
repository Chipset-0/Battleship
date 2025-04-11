import {Player} from "./Player"

//Test creating player
test("Player will be created without a specified gameboard size",
    () => {
        let p =  new Player();
        expect(p.getOwnGameboard().length).toBe(0);
    }
);
//Test receive attack

//Test place ship

//Test Getters