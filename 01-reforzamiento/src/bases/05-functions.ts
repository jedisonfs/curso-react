function getUser(){
    return {
        url: 'ABC',
        username: 'EL_papi23'
    };
}


const user2 = () => {
    return {
        url: 'ABC',
        username:'PAPI23'
        }
    };

const user3 = {
    url: 'ABCD',
    username: 'EdisonFeria'
}

const userArrow = () => user3;

const user = getUser();
console.log(user);  



interface User {
    udi: string, 
    username: string
}

const user4: User = {
    udi: '123',
    username: 'Jedisonfs'
}


const functionArrown = () => ({
    udi: '123',
    username: 'Fabian'
})