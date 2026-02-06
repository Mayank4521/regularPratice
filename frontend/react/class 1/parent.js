import h1 from "./app.js"
import h2 from "./test.js"

let parent =()=> React.createElement("div",null,[h1(),h2()])

export default parent