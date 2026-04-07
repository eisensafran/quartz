import { QuartzComponentConstructor, QuartzComponentProps } from "./types"


function Description({ displayClass }: QuartzComponentProps) {

  
    return <div class="description"><p></p></div>
  



  
}
Description.css = `
description.p {
  margin: 0;
  padding: 0;



}
`

export default (() => Description) satisfies QuartzComponentConstructor
