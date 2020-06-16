class Test {
    greeting: string;
    constructor(message: string) {
        this.greeting = message;
    }
    greet(): String {
        return "Hello, " + this.greeting;
    }
}

const test = new Test('Hi Welt');

export default test;
