import { QuartzComponentConstructor, QuartzComponentProps } from "./types"


function Description({ displayClass }: QuartzComponentProps) {

  
    return <div class="description"><p>Das Core Curriculum ist ein Projekt des Rhine Ruhr Center for Science Communication Research.</p></div>
  



  
}
Description.css = `
description.p {
  margin: 0;
  padding: 0;



}
`

export default (() => Description) satisfies QuartzComponentConstructor
