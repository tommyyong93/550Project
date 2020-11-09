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
      name: "",
      id: null,
      state: "",
      zip: null,
      provider: "",
      ownership: "",
      avgResidents: null,
      abuseIcon: null,
      rating: null,
      covidAdmission: 0,
      confirmedCases: 0,
      freeBeds: 0,
      latitude: null,
      longitude: null,
      errorMessage: null,
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


  render() {
    return (
      <div className="Poster">

        <PageNavbar active="posters" />


        <br></br>
        <div className='container'>
          <div className="jumbotron">
            <div className="h5">Find a nursing home that fits your needs</div>
            <p>You are at latitude {this.state.latitude} and longitude {this.state.longitude}</p>
            <p>{this.state.covidAdmission}</p>
            <div className='form-container'>
              <Card style={{width:"250px",margin:"20px"}}>
                <FormGroup>
                  <Label class="bp3-label" htmlFor="nameInput">Name:
                    <InputGroup style={{width:"200px"}}></InputGroup>
                  </Label>
                  <Label class="bp3-label" htmlFor="idInput">ID:
                    <InputGroup style={{width:"200px"}}></InputGroup>
                  </Label>
                  <div style={{width:"200px"}}>
                    <Label class="bp3-label" htmlFor="stateDropdown">State:
                      <HTMLSelect id="stateDropdown" fill={false}>
                        <option>-</option>
                        <option>AL</option>
                        <option>AK</option>
                        <option>AZ</option>
                        <option>AR</option>
                        <option>CA</option>
                      </HTMLSelect>
                    </Label>
                  </div>
                  <Label class="bp3-label" htmlFor="radius">Within distance from me (miles):
                    <NumericInput id="radius"
                      max={100}
                      min={0}
                    >
                    </NumericInput>
                  </Label>
                </FormGroup>
              </Card>
              <Card style={{width:"250px",margin:"20px"}}>
                <FormGroup>
                  <div style={{width:"200px"}}>
                    <Label class="bp3-label" htmlFor="providerDropdown">Provider Type:
                      <HTMLSelect id = "providerDropdown">
                        <option>-</option>
                        <option>Medicaid</option>
                        <option>Medicare</option>
                        <option>Medicare and Medicaid</option>
                      </HTMLSelect>
                    </Label>
                  </div>
                  <div style={{width:"200px"}}>
                    <Label class="bp3-label" htmlFor="ownershipDropdown">Ownership Type:
                      <HTMLSelect id = "ownershipDropdown">
                        <option>-</option>
                        <option>For profit - Corporation</option>
                        <option>For profit - Individual</option>
                        <option>For profit - Limited Liability company</option>
                        <option>For profit - Partnership</option>
                        <option>Government - City</option>
                        <option>Government - City/County</option>
                        <option>Government - County</option>
                        <option>Government - Hospital district</option>
                        <option>Government - State</option>
                        <option>Non profit - Church Related</option>
                        <option>Non profit - Corporation</option>
                        <option>Non profit - Other </option>
                      </HTMLSelect>
                    </Label>
                  </div>
                  <div style={{width:"200px"}}>
                    <Label class="bp3-label" htmlFor="ownershipDropdown">Abuse Icon:
                      <HTMLSelect id = "ownershipDropdown">
                        <option>-</option>
                        <option>For profit - Corporation</option>
                        <option>For profit - Individual</option>
                        <option>For profit - Limited Liability company</option>
                        <option>For profit - Partnership</option>
                        <option>Government - City</option>
                        <option>Government - City/County</option>
                        <option>Government - County</option>
                        <option>Government - Hospital district</option>
                        <option>Government - State</option>
                        <option>Non profit - Church Related</option>
                        <option>Non profit - Corporation</option>
                        <option>Non profit - Other </option>
                      </HTMLSelect>
                    </Label>
                  </div>
                  <div style={{width:"200px"}}>
                    <Label class="bp3-label" htmlFor="ownershipDropdown">Overall Rating:
                      <HTMLSelect id = "ownershipDropdown">
                        <option>-</option>
                        <option>For profit - Corporation</option>
                        <option>For profit - Individual</option>
                        <option>For profit - Limited Liability company</option>
                        <option>For profit - Partnership</option>
                        <option>Government - City</option>
                        <option>Government - City/County</option>
                        <option>Government - County</option>
                        <option>Government - Hospital district</option>
                        <option>Government - State</option>
                        <option>Non profit - Church Related</option>
                        <option>Non profit - Corporation</option>
                        <option>Non profit - Other </option>
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
                      value={this.state.covidAdmission}
                      onChange={this.getChangeHandler("covidAdmission")}
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
                      value={this.state.covidAdmission}
                      onChange={this.getChangeHandler("covidAdmission")}
                    />
                  </Label>
                  <Label>
                    Number of Free Beds
                    <Slider
                      min={0}
                      max={200}
                      stepSize={1}
                      labelStepSize={50}
                      style={{width:"150px"}}
                      value={this.state.covidAdmission}
                      onChange={this.getChangeHandler("covidAdmission")}
                    />
                  </Label>
                </FormGroup>
              </Card>
            </div>
            <div class='buttons-container'>
              <Button id='button' icon="refresh" intent="danger" text="Reset Filters" />
              <Button id='button' icon="arrow-right" intent="success" text="Search" />
            </div>
          </div>
          <div class='search-container'>
            <Card>Search results here...</Card>
          </div>
        </div>
      </div>
    )
  }
}