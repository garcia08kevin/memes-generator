import React,{useEffect, useState} from 'react';
import './App.css';
import { Meme } from './component/Meme';

const objectToQueryParam = (obj) => {
  const params = Object.entries(obj).map(([key, value]) => `${key}=${value}`)
  return '?' + params.join('&') 
}

function App() {

  const [templates,setTemplates] = useState([]);
  const [template,setTemplate] = useState(null);
  const [topText,setTopText] = useState("");
  const [buttonText,setButtonText] = useState("");
  const [meme,setMeme] = useState(null);
  
  useEffect(() => {
    fetch("https://api.imgflip.com/get_memes").then(x => 
      x.json().then(response => setTemplates(response.data.memes))
      );
  }, []);

  if(meme){
    return(
      <div style={{ textAlign: "center"}}>
      <img style={{widht: 200}}
       src={meme} alt="Tu meme"/>
      </div>  
    )      
  }
    

  return (
    <div style={{textAlign: "center"}}>
      {template && (<>
        <form onSubmit={async e => {
          e.preventDefault();
          const params = {
            template_id: template.id,
            text0: topText,
            text1: buttonText,
            username: 'garciakevin0084',
            password: 'garciakevin08'
          }
          const response = await fetch(
            `https://api.imgflip.com/caption_image${objectToQueryParam(
              params
            )}`
          );
          const json = await response.json()          
          setMeme(json.data.url)
        }}>
          <Meme template={template}/>
          <input placeholder='top text' value={topText} 
          onChange={e=> setTopText(e.target.value)}/>
          <input placeholder='button text' value={buttonText} 
          onChange={e=> setButtonText(e.target.value)}/>
          <button type='submit'>create meme</button>
        </form>
      </>) }

      {!template && (
      <>
      <h1>Escoge la plantilla</h1>
      {
      templates.map(template =>{
      return (
        <Meme 
        template={template}        
        onClick={() => {
          setTemplate(template)
        }}
        />
      );
    })}</>)}
    </div>
  );
}

export default App;
