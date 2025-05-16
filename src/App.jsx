import { useState, useEffect } from 'react'
import "prismjs/themes/prism-tomorrow.css"
import prism from 'prismjs'
import Editior from 'react-simple-code-editor'
import Markdown from "react-markdown"
import "highlight.js/styles/github-dark.css"
import axios from 'axios'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [code, setCode] = useState(` funtion sum (){
              return 1+2}`)
  const [review, setReview] = useState('')
  useEffect(() =>{
    prism.highlightAll()
  }, [])
  async function reviewCode(){
    const response = await axios.post('https://gyanicodereviewer.onrender.com/ai/get-review', {

      code: code
    })
    setReview(response.data)
    console.log(response.data);
    
  }

  return (
   <>
    <main>
      <div className="left">
        <div className="code">
          <Editior
            value={code}
            onValueChange={code => setCode(code)}
            highlight={code => prism.highlight(code, prism.languages.js, 'js')}
            padding={10}
            style={{
              fontFamily: '"Fira code", "Fira Mono", monospace',
              fontSize: 16,
              backgroundColor: '#282c34',
              color: '#fff',
              borderRadius: '5px',
              h1eight: '100%',
              width: '100%',
            }}
          />
        </div>
        <div
        onClick={reviewCode}
         className="review-button">Review</div>
      </div>
      <div className="right">
       <Markdown 
       rehypePlugins={[rehypehighlight]}>
        {review}
       </Markdown>
      </div>
    </main>
   </>
  )
}

export default App
