
export const Language = {
    CHN: "Chinese",
    ENG: "English"
}

class Node {
    constructor(language, image, word) {
        this.language = language;
        this.image = image;
        this.word = word;
    }
};

const en1 = new Node(Language.ENG,'1', "this is a test node");
const en2 = new Node(Language.CHN,'2', "中文");
const en3 = new Node(Language.ENG,'3', "the third story");


const Nodes = [en1, en2, en3];

export default Nodes;