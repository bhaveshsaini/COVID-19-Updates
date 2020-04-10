import React, {Component} from 'react';
import "./homepage.css";
import Axios from "axios";

class Homepage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            data: [],
            searchedCountry: {},
            searchValue: ''
        }

        Axios.get("https://coronavirus-19-api.herokuapp.com/countries")
            .then((res) => {
                this.setState({data: res.data})
            })
            .catch((e) => {
                console.log(e)
            })

    } // END CONSTRUCTOR

    searchBarHandle = (res) => {
        let searchValue = res.target.value

        let firstLetter = searchValue.charAt(0).toUpperCase()
        let capitalizeFirstLetter = firstLetter + searchValue.slice(1)

        if(searchValue !== '')
        {
            for(let i = 0; i < this.state.data.length; i++) {

                if (this.state.data[i].country === searchValue || this.state.data[i].country === searchValue.toUpperCase() || this.state.data[i].country === capitalizeFirstLetter) {
                    this.setState({
                        searchedCountry: this.state.data[i],
                    })


                    document.getElementById('first').style.display = 'none'
                    document.getElementById('second').style.display = 'block'
                    document.getElementById('third').style.display = 'none'
                    break
                }

                else {
                    document.getElementById('first').style.display = 'none'
                    document.getElementById('second').style.display = 'none'
                    document.getElementById('third').style.display = 'block'
                }
            }
        }

        if(searchValue === '')
        {
            document.getElementById('first').style.display = 'block'
            document.getElementById('second').style.display = 'none'
            document.getElementById('third').style.display = 'none'
        }

    }

    render() {
            return (
                <div>
                    <link rel="stylesheet"
                          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>
                    <div className="topnav">
                        <div className="search-container">
                            <input
                                onChange={this.searchBarHandle}
                                type="text" placeholder="Search..." name="search"/>
                        </div>
                    </div>

                    <div id={'first'}>
                        <table>
                            <thead>
                            <tr>
                                <th></th>
                                <th>Cases</th>
                                <th>Deaths</th>
                                <th>Recovered</th>
                            </tr>
                            </thead>
                            <tbody>
                            {this.state.data.map((info) =>
                                <tr>
                                    <th>{info.country}</th>
                                    <td>{info.cases}</td>
                                    <td>{info.deaths}</td>
                                    <td>{info.recovered}</td>
                                </tr>
                            )}
                            </tbody>
                        </table>
                    </div>

                    <div id={'second'}>
                        <table>
                            <thead>
                            <tr>
                                <th></th>
                                <th>Cases</th>
                                <th>Deaths</th>
                                <th>Recovered</th>
                            </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th>{this.state.searchedCountry.country}</th>
                                    <td>{this.state.searchedCountry.cases}</td>
                                    <td>{this.state.searchedCountry.deaths}</td>
                                    <td>{this.state.searchedCountry.recovered}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div id={'third'}>
                        <h2>
                            No Results
                        </h2>
                    </div>
                </div>
            )
    }
}

export default Homepage;