import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
// import tempfunctions = ('./functions.js')
const date = Date()

class App extends Component {
  state = {}

  componentDidMount (){
    axios.get('http://localhost:5000/weatherData')
    .then(res => {
      console.log(res.data.forecastSummary)
        this.setState({
        cForecast: res.data
      
      })
    })
    
    .catch(function (error) {
      console.log(error);
    });
  }
// This is the logic used to apply the colours to each pollutant based on levels, without having to repeat the code. Thus keeping it cleaner.
  generateClassname() {
    const { cForecast } = this.state
    const { nO2Band, o3Band, pM10Band, pM25Band, sO2Band } = cForecast
    const bandArr = [nO2Band, o3Band, pM10Band, pM25Band, sO2Band]
    const colorResults = []
    let className
    bandArr.forEach((band) => {
      // Here I'm using a switch as opposed to an if statement. Again to make it cleaner.
      switch(band) {
        case "Low":
          className = " low"
          colorResults.push(className)
          break;
        case "Medium":
          className = " medium"
          colorResults.push(className)
          break;
        case "High":
          className = " high"
          colorResults.push(className)
          break;
        default:
          className = " levels"
          colorResults.push(className)
        }
        console.log(colorResults)
    })
    return colorResults
  }  
  render() {
    const cForecast = this.state.cForecast
    console.log(date)
    if (cForecast) {
      const textBackground = this.generateClassname()
      console.log(textBackground)
      console.log(cForecast.pM10Band)
      return (
        <>
        <div className="background"></div>
        <div className="heading"> London Air Quality for {date}</div>
        <div className="container">
        <div className="my-card">
          <div className="title">
            <h2>
            {cForecast.forecastSummary}
            </h2>
            </div>
            </div>
        <div className="my-card">
        <div className="title">
        <h2>{cForecast.forecastText.replace(/&lt;br|&gt;|&#39;/g, "").replace(/\/\//g, " ")}
        </h2>
        <div className="levels">
        <p className={textBackground[1]}>
        Ozone (O3): {cForecast.o3Band}
        </p>
        <p className={textBackground[0]}>
        Nitrogen Dioxide (NO2): {cForecast.nO2Band}
        </p>
        <p className={textBackground[2]}>
        Particulate Matter(PM10): {cForecast.pM10Band}
        </p>
        <p className={textBackground[3]}>
        Particulates in Air(PM25): {cForecast.pM25Band}
        </p>
        </div>
        </div>
        </div>
        </div>
        </>
      );
    }
    else {
      return (
        <>
        <div className="loading">
          <p>Requesting API data...</p>
          </div>
        </>
      )
    }
  }
}

export default App;
