import React from 'react';
import {
  Button
} from "@blueprintjs/core";
import '../style/SearchFeature.css';
import PageNavbar from './PageNavbar';
import GoogleMap from './GoogleMap';
import {
  InputGroup,
  HTMLSelect,
  Label,
  Slider,
  NumericInput,
  Card,
  Navbar,
  Popover,
  Menu,
  Position,
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
      abuseIcon: "",
      rating: "",
      covidAdmission: 0,
      confirmedCases: 0,
      distance: 0,
      freeBeds: 0,
      latitude: 39.9526,
      longitude: -75.1652,
      errorMessage: "",
      submittedData: "",
      passedQA: "",
      searchResults: []
    }
  }

  componentDidMount() {
    window.navigator.geolocation.getCurrentPosition((position) => this.setState({
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    }), (err) => this.setState({
      errorMessage: err.message
    }))
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
    console.log(this.state.abuseIcon)
    console.log(this.state.submittedData)
    console.log(this.state.passedQA)
    console.log(this.state.rating)
    console.log(this.state.avgResidents)
    console.log(this.state.covidAdmission)
    console.log(this.state.confirmedCases)
    console.log(this.state.freeBeds)
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

  onAbuseChange = (event) => {
    this.setState({
      abuseIcon: event.target.value
    })
  }

  onSubmittedChange = (event) => {
    this.setState({
      submittedData: event.target.value
    })
  }

  onQAChange = (event) => {
    this.setState({
      passedQA: event.target.value
    })
  }

  onRatingChange = (event) => {
    this.setState({
      rating: event.target.value
    })
  }

  resetFilter = () => {
    this.setState({
      id: "",
      name: "",
      state: "",
      provider: "",
      ownership: "",
      avgResidents: 0,
      abuseIcon: "",
      rating: "",
      covidAdmission: 0,
      confirmedCases: 0,
      distance: 0,
      freeBeds: 0,
      latitude: 39.9526,
      longitude: -75.1652,
      errorMessage: "",
      submittedData: "",
      passedQA: ""
    })
  }


  render() {
    return (
      <div className="SearchFeature">

        <PageNavbar/>
        <Navbar className="search-navbar" style={{height:"100px"}} >
          <Label className="bp3-label mainSearch" htmlFor="radius">Within distance (km):
            <NumericInput id="radius"  max={500} min={0} value={this.state.distance} onValueChange={this.onDistanceChange}/>
          </Label>
          <Popover className='providerInfo-popdown' content={
            <Menu>
              <Label className="bp3-label" htmlFor="nameInput">Name:
                <InputGroup style={{width: "200px"}} value={this.state.name} onChange={this.onNameChange}></InputGroup>
              </Label>
              <Label className="bp3-label" htmlFor="idInput">ID:
                <InputGroup style={{
                  width: "200px"
                }} value={this.state.id} onChange={this.onIDChange}></InputGroup>
              </Label>
              <div style={{
                width: "200px"
              }}>
                <Label className="bp3-label" htmlFor="stateDropdown">State:
                  <HTMLSelect id="stateDropdown" fill={false} onChange={this.onStateChange} value={this.state.state}>
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
                <HTMLSelect id="providerDropdown" onChange={this.onProviderChange} value={this.state.provider}>
                  <option value="">-</option>
                  <option>Medicaid</option>
                  <option>Medicare</option>
                  <option>Medicare and Medicaid</option>
                </HTMLSelect>
              </Label>
            </Menu>
          } position={Position.BOTTO}>
            <Button text="Nursing Home Information" />
          </Popover>
          <Popover className='additionalFilter-popdown' content={
            <Menu>
              <Label className="bp3-label" htmlFor="ownershipDropdown">Ownership Type:
                <HTMLSelect id="ownershipDropdown" onChange={this.onOwnershipChange} value={this.state.ownership}>
                  <option value="">-</option>
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
                  <option value="Non profit - Other">Non profit - Other
                  </option>
                </HTMLSelect>
              </Label>
              <Label className="bp3-label" htmlFor="abuseDropdown">Abuse Icon:
                <HTMLSelect id="abuseDropdown" onChange={this.onAbuseChange} value={this.state.abuseIcon}>
                  <option value="">-</option>
                  <option value="True">Yes</option>
                  <option value="False">No</option>
                </HTMLSelect>
              </Label>
              <Label className="bp3-label" htmlFor="submittedCovidDropdown">Submitted Covid Data:
                <HTMLSelect id="submittedCovidDropdown" onChange={this.onSubmittedChange} value={this.state.submittedData}>
                  <option value="">-</option>
                  <option value="True">Yes</option>
                  <option value="True">No</option>
                </HTMLSelect>
              </Label>
              <Label className="bp3-label" htmlFor="qaDropdown">Passed QA Check:
                <HTMLSelect id="qaDropdown" onChange={this.onQAChange} value={this.state.passedQA}>
                  <option value="">-</option>
                  <option>Yes</option>
                  <option>No</option>
                </HTMLSelect>
              </Label>
              <Label className="bp3-label" htmlFor="ratingDropdown">Overall Rating:
                <HTMLSelect id="ratingDropdown" onChange={this.onRatingChange} value={this.state.rating}>
                  <option value="">-</option>
                  <option>0</option>
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                </HTMLSelect>
              </Label>
            </Menu>
          } position={Position.BOTTOM}>
            <Button text="Additional Filters" />
          </Popover>
          <Popover className='stats-popdown' content={
            <Menu style={{width:"400px"}}>
              <Label>
                Average Number Of Residents
                <Slider min={0} max={800} stepSize={1} labelStepSize={100} value={this.state.avgResidents} onChange={this.getChangeHandler("avgResidents")}/>
              </Label>
              <Label>
                Total Covid Admissions
                <Slider min={0} max={400} stepSize={1} labelStepSize={100} value={this.state.covidAdmission} onChange={this.getChangeHandler("covidAdmission")}/>
              </Label>
              <Label>
                Total Confirmed Covid Cases
                <Slider min={0} max={45000} stepSize={1} labelStepSize={10000} value={this.state.confirmedCases} onChange={this.getChangeHandler("confirmedCases")}/>
              </Label>
              <Label>
                Number of Free Beds
                <Slider min={0} max={400} stepSize={1} labelStepSize={50} value={this.state.freeBeds} onChange={this.getChangeHandler("freeBeds")}/>
              </Label>
            </Menu>
          } position={Position.BOTTOM}>
            <Button text="COVID-19 & Other Filters" />
          </Popover>
          <Button id='button' icon="refresh" intent="danger" text="Reset Filters" onClick={this.resetFilter}/>
          <Button id='button' icon="arrow-right" intent="success" text="Search" onClick={this.onFormSubmit}/>
          <Navbar.Group className="search-text">
            {this.state.searchResults.length} results match your search.
          </Navbar.Group>
        </Navbar>
        <div className='search-container-block'>
          <Card className='search-results-container'>Search results here...</Card>
          {/* <GoogleMap
            className='google-map-container'
            latitude={this.state.latitude ? this.state.latitude : 39.9526}
            longitude={this.state.longitude ? this.state.longitude : -75.1652}
          /> */}
        </div>
      </div>
    )
  }
}