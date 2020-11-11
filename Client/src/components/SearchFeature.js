import React from 'react';
import {
  Button
} from "@blueprintjs/core";
import '../style/SearchFeature.css';
import PageNavbar from './PageNavbar';
import {
  FormGroup,
  InputGroup,
  HTMLSelect,
  Label,
  Slider,
  NumericInput,
  Card
} from "@blueprintjs/core";

export default class SearchFeature extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      id: "",
      name: "",
      state: "",
      provider: "",
      ownership: "",
      avgResidents: 0,
      abuseIcon: null,
      rating: null,
      covidAdmission: 0,
      confirmedCases: 0,
      distance: 0,
      freeBeds: 0,
      latitude: null,
      longitude: null,
      errorMessage: null,
      submittedData: null,
      passedQA: null
    }
  }

  componentDidMount() {
    window.navigator.geolocation.getCurrentPosition(
      (position) => this.setState({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      }),
      (err) => this.setState({
        errorMessage: err.message
      })
    )
  }

  getChangeHandler = (key: string) => {
    return (value: number) => this.setState({
      [key]: value
    });
  }

  onFormSubmit = (event) => {
    event.preventDefault();
    console.log(this.state.name)
    console.log(this.state.id)
    console.log(this.state.state)
    console.log(this.state.provider)
    console.log(this.state.distance)
    console.log(this.state.ownership)
  }

  onNameChange = (event) => {
    this.setState({
      name: event.target.value
    })
  }

  onIDChange = (event) => {
    this.setState({
      id: event.target.value
    })
  }

  onStateChange = (event) => {
    this.setState({
      state: event.target.value
    })
  }

  onProviderChange = (event) => {
    this.setState({
      provider: event.target.value
    })
  }

  onDistanceChange = (value) => {
    this.setState({
      distance: value
    })
  }

  onOwnershipChange = (event) => {
    this.setState({
      ownership: event.target.value
    })
  }


  render() {
    return (
      <div className="SearchFeature">

        <PageNavbar />


        <br></br>
        <div className='container'>
          <div className="jumbotron">
            <div className="h5 title">Find a nursing home that fits your needs</div>
            <p>You are at latitude {this.state.latitude} and longitude {this.state.longitude}</p>
            <p>{this.state.covidAdmission}</p>
            <form className='form' onSubmit={this.onFormSubmit}>
              <div className='form-container'>
                <Card style={{width:"250px",margin:"20px"}}>
                  <FormGroup>
                    <Label className="bp3-label" htmlFor="nameInput">Name:
                      <InputGroup style={{width:"200px"}} value={this.state.name} onChange={this.onNameChange}></InputGroup>
                    </Label>
                    <Label className="bp3-label" htmlFor="idInput">ID:
                      <InputGroup style={{width:"200px"}} value={this.state.id} onChange={this.onIDChange}></InputGroup>
                    </Label>
                    <div style={{width:"200px"}}>
                      <Label className="bp3-label" htmlFor="stateDropdown">State:
                        <HTMLSelect id="stateDropdown" fill={false} onChange={this.onStateChange}>
                          <option value="">-</option>
                          <option>AL</option>
                          <option>AK</option>
                          <option>AZ</option>
                          <option>AR</option>
                          <option>CA</option>
                        </HTMLSelect>
                      </Label>
                    </div>
                    <Label className="bp3-label" htmlFor="providerDropdown">Provider Type:
                      <HTMLSelect id = "providerDropdown" onChange={this.onProviderChange}>
                        <option>-</option>
                        <option>Medicaid</option>
                        <option>Medicare</option>
                        <option>Medicare and Medicaid</option>
                      </HTMLSelect>
                    </Label>
                    <Label className="bp3-label" htmlFor="radius">Within distance from me (km):
                      <NumericInput id="radius"
                        max={100}
                        min={0}
                        value={this.state.distance}
                        onValueChange={this.onDistanceChange}
                      >
                      </NumericInput>
                    </Label>
                  </FormGroup>
                </Card>
                <Card style={{width:"250px",margin:"20px"}}>
                  <FormGroup>
                    <div style={{width:"200px"}}>
                      <Label className="bp3-label" htmlFor="ownershipDropdown">Ownership Type:
                        <HTMLSelect id = "ownershipDropdown" onChange={this.onOwnershipChange}>
                          <option>-</option>
                          <option value="For profit - Corporation">For profit - Corporation</option>
                          <option value="For profit - Individual">For profit - Individual</option>
                          <option value="For profit - Limited Liability company">For profit - Limited Liability company</option>
                          <option value="For profit - Partnership">For profit - Partnership</option>
                          <option value="Government - City">Government - City</option>
                          <option value="Government - City/County">Government - City/County</option>
                          <option value="Government - County">Government - County</option>
                          <option value="Government - Federal">Government - Federal</option>
                          <option value="Government - Hospital district">Government - Hospital district</option>
                          <option value="Government - State">Government - State</option>
                          <option value="Non profit - Church Related">Non profit - Church Related</option>
                          <option value="Non profit - Corporation">Non profit - Corporation</option>
                          <option value="Non profit - Other">Non profit - Other </option>
                        </HTMLSelect>
                      </Label>
                    </div>
                    <div style={{width:"200px"}}>
                      <Label className="bp3-label" htmlFor="abuseDropdown">Abuse Icon:
                        <HTMLSelect id = "abuseDropdown">
                          <option>-</option>
                          <option value="True">Yes</option>
                          <option value="False">No</option>
                        </HTMLSelect>
                      </Label>
                      <Label className="bp3-label" htmlFor="submittedCovidDropdown">Submitted Covid Data:
                        <HTMLSelect id = "submittedCovidDropdown">
                          <option>-</option>
                          <option>Yes</option>
                          <option>No</option>
                        </HTMLSelect>
                      </Label>
                      <Label className="bp3-label" htmlFor="qaDropdown">Passed QA Check:
                        <HTMLSelect id = "qaDropdown">
                          <option>-</option>
                          <option>Yes</option>
                          <option>No</option>
                        </HTMLSelect>
                      </Label>
                    </div>
                    <div style={{width:"200px"}}>
                      <Label className="bp3-label" htmlFor="ratingDropdown">Overall Rating:
                        <HTMLSelect id = "ratingDropdown">
                          <option>-</option>
                          <option>For profit - Corporation</option>
                          <option>For profit - Individual</option>
                          <option>For profit - Limited Liability company</option>
                          <option>For profit - Partnership</option>
                        </HTMLSelect>
                      </Label>
                    </div>
                  </FormGroup>
                </Card>
                <Card style={{width:"350px",margin:"20px"}}>
                  <FormGroup>
                    <Label>
                      Average Number Of Residents
                      <Slider
                        min={0}
                        max={400}
                        stepSize={1}
                        labelStepSize={100}
                        style={{width:"150px"}}
                        value={this.state.avgResidents}
                        onChange={this.getChangeHandler("avgResidents")}
                      />
                    </Label>
                    <Label>
                      Total Covid Admissions
                      <Slider
                        min={0}
                        max={100}
                        stepSize={1}
                        labelStepSize={25}
                        style={{width:"150px"}}
                        value={this.state.covidAdmission}
                        onChange={this.getChangeHandler("covidAdmission")}
                      />
                    </Label>
                    <Label>
                      Total Confirmed Covid Cases
                      <Slider
                        min={0}
                        max={400}
                        stepSize={1}
                        labelStepSize={100}
                        style={{width:"150px"}}
                        value={this.state.confirmedCases}
                        onChange={this.getChangeHandler("confirmedCases")}
                      />
                    </Label>
                    <Label>
                      Number of Free Beds
                      <Slider
                        min={0}
                        max={400}
                        stepSize={1}
                        labelStepSize={50}
                        style={{width:"150px"}}
                        value={this.state.freeBeds}
                        onChange={this.getChangeHandler("freeBeds")}
                      />
                    </Label>
                  </FormGroup>
                </Card>
              </div>
              <div className='buttons-container'>
                <Button id='button' icon="refresh" intent="danger" text="Reset Filters" />
                <Button id='button' icon="arrow-right" intent="success" text="Search" onClick={this.onFormSubmit}/>
              </div>
            </form>
          </div>
          <div className='search-container'>
            <Card>Search results here...</Card>
          </div>
        </div>
      </div>
    )
  }
}