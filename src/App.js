import './App.css';
import React, {useState, useEffect} from 'react'


function App() {
  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);

  const [diff1, setDiff1] = useState([]);
  const [diff2, setDiff2] = useState([]);

  const [file1, setFile1] = useState()
  const [file2, setFile2] = useState()


  useEffect(()=>{
    if (file1) {
      console.log("file 1 is:", file1)
    }
    if (file2) {
      console.log("file 2 is:", file2)
    }
  },[file1, file2])


  // HANDLE FILE UPLOAD AND READ /////////////////////////////////

  const handleFile1Change = e => {
    let rawFile1 = e.target.files[0]
    const fileReader = new FileReader();
    fileReader.readAsText(e.target.files[0], "UTF-8");
    fileReader.onload = e => {
      console.log("e.target.result: ", e.target.result);
      let jsonParsed1 = JSON.parse(e.target.result)
      setFile1(rawFile1)
      setData1(jsonParsed1.templates.map(item=> item.name));
    };
  };

  const handleFile2Change = e => {
    let rawFile2 = e.target.files[0]
    const fileReader = new FileReader();
    fileReader.readAsText(e.target.files[0], "UTF-8");
    fileReader.onload = e => {
      console.log("e.target.result: ", e.target.result);
      let jsonParsed2 = JSON.parse(e.target.result)
      setFile2(rawFile2)
      setData2(jsonParsed2.templates.map(item=> item.name));
    };
  };


  // FIND AND SHOW THE DIFF ///////////////////////////////////////////////
  const findDiffJson1 = () => {
    let diffArray1 = [];
    const findDiff = (item) => {
      if (!data2.includes(item)) {
        diffArray1.push(item)
      }
    }
    data1.forEach(findDiff)
    console.log("diffArayy1 is", diffArray1)
    setDiff1(diffArray1)
  }

  const findDiffJson2 = () => {
    let diffArray2 = [];
    const findDiff = (item) => {
      if (!data1.includes(item)) {
        diffArray2.push(item)
      }
    }
    data2.forEach(findDiff)
    console.log("diffArayy2 is", diffArray2)
    setDiff2(diffArray2)
  }

  const showDiff = () => {
    if(data1 && data1.length > 1) {
      findDiffJson1()
    } else {
      window.alert("Please upload file 1 first")
    }
    if(data2 && data2.length > 1) {
      findDiffJson2()
    } else {
      window.alert("Please upload file 1 first")
    }
    
  }

 


  return (
    <div className="App">
      <h1>Berxi Json Differ V1</h1>
     

      <button className='button' onClick={()=> showDiff()}>Show Diff</button>

      <div className='data-container'>
        <div className='data-column'>
          <form>
          <h2>File 1 Upload</h2>
          <input type="file" onChange={handleFile1Change}/>
          </form>
        </div>
        <div className='data-column'>
          <form>
          <h2>File 2 Upload</h2>
          <input type="file" onChange={handleFile2Change}/>
          </form>
        </div>
      </div>

      <div className='data-container'>
        <div className='data-column red'>
          <h3>DIFF Between File 1 and 2</h3>
          {
            diff1.map((name, index)=>(
              <div key={index}>{name}</div>
            ))
          }
        </div>
        <div className='data-column red'>
        <h3>DIFF Between File 2 and 1</h3>
          {
            diff2.map((name, index)=>(
              <div key={index}>{name}</div>
            ))
          }
        </div>
      </div>

      <div className='data-container'>
        <div className='data-column'>
        <h3>JSON 1</h3>
        <h4>{file1?.name}</h4>
          {
            data1?.map((name, index)=>(
              <div key={index}>{name}</div>
            ))
          }
        </div>
        <div className='data-column'>
        <h3>JSON 2</h3>
        <h4>{file2?.name}</h4>
          {
            data2?.map((name, index)=>(
              <div key={index}>{name}</div>
            ))
          }
        </div>
      </div>
     
    </div>
  );
}

export default App;

