import React from "react"
// import{Cards,Chart,CountryPicker} from './components';
// import styles from './App.module.css';
import "./App.css";
import axios from "axios";

class App extends React.Component{
  constructor(){
    super();
    this.getCountryData=this.getCountryData.bind(this);
  }
  state={
    confirmed:0,
    recovered:0,
    deaths:0,
    countries:[]
  };
  componentDidMount(){
    this.getData()
  }
  async getData(){
    const resApi=await axios.get("https://covid19.mathdro.id/api");
    const CountriesApi=await axios.get("https://covid19.mathdro.id/api/countries")
    const countries=[];
    for(var i=0;i<CountriesApi.data.countries.length;i++){
      countries.push(CountriesApi.data.countries[i].name);
    }
    this.setState({
      confirmed:resApi.data.confirmed.value,
      recovered:resApi.data.recovered.value,
      deaths:resApi.data.deaths.value,
      countries
      
});
  }
  async getCountryData(e){
    if(e.target.value === "Worldwide") {
        return this.getData();     
    }
    
    try{
    const res = await axios.get(`https://covid19.mathdro.id/api/countries/${e.target.value}`);
    this.setState({
        confirmed:res.data.confirmed.value,
        recovered:res.data.recovered.value,
        deaths:res.data.deaths.value
    });
}
catch(err){
    if(err.response.status===404)
    this.setState({
        confirmed:"No data available..",
        recovered:"No data available..",
        deaths:"No data available.."
    });
}
}
renderCountryOptions(){
  return this.state.countries.map((country,index)=>{
    return <option key={index}>{country}</option>
  })
}
  render(){
    return(
      <div className="flex">
      <div className="container">
        <h1 className="co-update">Covid-19 Update</h1>
        <br/>
        <br/>
        
        <select className="dropdown" onChange={this.getCountryData}>
                {this.renderCountryOptions()}
            </select>
            
        <div style={{
          disply:'flex',
          justifyContent :'center'
        }}>  

        <div className="box-confirmed" >
        
          <h3>confirmed cases</h3>
          <h4>{this.state.confirmed}</h4>
        </div>
        <div className="box-recovered">
          <h3>Recovered Cases</h3>
          <h4>{this.state.recovered}</h4>
        </div>
        <div className="box-death">
          <h3>Deaths</h3>
          <h4>{this.state.deaths}</h4>
        </div>
       </div>
       </div>
       </div>
    )
  }
}
export default App;
