
export const Language = {
    CHN: "Chinese",
    ENG: "English",
    ALL: "All"
}

class Content {
    
}

class Node {
    constructor(language, image, alt, time, content) {
        this.language = language;
        this.image = image;
        this.alt = alt;
        this.time = time;
        this.content = content;
    }
};

const en1 = new Node(Language.ENG,'1', "click to reveal", "2011", "who is the most stupid dog in the world");
const en2 = new Node(Language.CHN,'2', "笨笨的狗", "2012", "谁是世界上最笨的狗");
const en3 = new Node(Language.ENG,'3', "the third story", "2013", "black coffee with sugar and cream");
const a4 = new Node(Language.ALL,'4', "all language", "2009", "dynamic programming");
const a5 = new Node(Language.ALL,'5', "all language", "2009", "dynamic programming");
const a6 = new Node(Language.ALL,'6', "all language", "2009", "dynamic programming");


const Nodes = [en1, en2, en3, a4, a5, a6,];

export default Nodes;