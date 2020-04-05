import React from "react";
import ChartWrapper from "./ChartWrapper";
import { SelectDropdown } from "./SelectDropdown";

export enum Gender {
  MEN = "men",
  WOMEN = "women"
}

class App extends React.Component {
  state = {
    gender: Gender.MEN
  };

  genderSelected = (gender: Gender) => {
    console.log(gender);
    this.setState({ gender });
  };

  render() {
    return (
      <div className="App">
        <SelectDropdown genderSelected={this.genderSelected} />
        <ChartWrapper gender={this.state.gender} />
      </div>
    );
  }
}

export default App;
